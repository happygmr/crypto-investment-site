<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trader;

class TraderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function become(Request $request)
    {
        $validated = $request->validate([
            'bio' => 'nullable|string',
            'is_public' => 'boolean',
            'subscription_fee' => 'nullable|numeric',
            'profit_share_percent' => 'nullable|numeric',
        ]);
        $trader = Trader::updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'bio' => $validated['bio'] ?? '',
                'is_public' => $validated['is_public'] ?? true,
                'subscription_fee' => $validated['subscription_fee'] ?? 0,
                'profit_share_percent' => $validated['profit_share_percent'] ?? 0,
                'status' => 'active',
            ]
        );
        return response()->json(['message' => 'You are now a trader', 'trader' => $trader]);
    }

    public function stats(Request $request)
    {
        $trader = Trader::where('user_id', $request->user()->id)->with('trades')->first();
        if (!$trader) {
            return response()->json(['error' => 'Not a trader'], 404);
        }
        return response()->json($trader);
    }
}
