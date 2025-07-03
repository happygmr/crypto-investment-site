<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GroupMember;
use App\Models\CopyGroup;
use App\Models\Trade;
use App\Models\CopiedTrade;

class CopyTradeController extends Controller
{
    public function follow(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'group_id' => 'required|exists:copy_groups,id',
        ]);
        $member = GroupMember::firstOrCreate([
            'group_id' => $validated['group_id'],
            'user_id' => $user->id,
        ], [
            'status' => 'active',
            'joined_at' => now(),
        ]);
        if ($member->user_id !== $user->id) {
            abort(403, 'Unauthorized: Can only follow as yourself');
        }
        return response()->json(['message' => 'Now following group', 'member' => $member]);
    }

    public function unfollow(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'group_id' => 'required|exists:copy_groups,id',
        ]);
        $member = GroupMember::where([
            'group_id' => $validated['group_id'],
            'user_id' => $user->id,
        ])->first();
        if ($member && $member->user_id !== $user->id) {
            abort(403, 'Unauthorized: Can only unfollow as yourself');
        }
        if ($member) {
            $member->status = 'inactive';
            $member->save();
        }
        return response()->json(['message' => 'Unfollowed group']);
    }

    public function copyTrade(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'trade_id' => 'required|exists:trades,id',
            'amount' => 'required|numeric|min:0.0001',
        ]);
        $trade = Trade::find($validated['trade_id']);
        $copied = CopiedTrade::create([
            'trade_id' => $trade->id,
            'copier_id' => $user->id,
            'amount' => $validated['amount'],
            'price' => $trade->price,
            'status' => 'open',
            'copied_at' => now(),
        ]);
        if ($copied->copier_id !== $user->id) {
            abort(403, 'Unauthorized: Can only copy trades as yourself');
        }
        return response()->json(['message' => 'Trade copied', 'copied_trade' => $copied]);
    }
}
