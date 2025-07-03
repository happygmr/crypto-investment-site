<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\KycRequest;
use App\Models\SiteSetting;
use App\Notifications\KycStatusChanged;

class AdminController extends Controller
{
    protected function authorizeAdmin($request)
    {
        if (!$request->user()->admin) {
            abort(403, 'Unauthorized: Admins only');
        }
    }

    public function users(Request $request)
    {
        $this->authorizeAdmin($request);
        $users = User::with('profile', 'trader')->get();
        return response()->json($users);
    }

    public function updateUserStatus(Request $request, $id)
    {
        $this->authorizeAdmin($request);
        $validated = $request->validate([
            'status' => 'required|in:active,inactive,banned',
        ]);
        $user = User::findOrFail($id);
        $user->status = $validated['status'];
        $user->save();
        return response()->json(['message' => 'User status updated', 'user' => $user]);
    }

    public function kycRequests(Request $request)
    {
        $this->authorizeAdmin($request);
        $kycs = KycRequest::with('user')->get();
        return response()->json($kycs);
    }

    public function reviewKyc(Request $request, $id)
    {
        $this->authorizeAdmin($request);
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);
        $kyc = KycRequest::findOrFail($id);
        $kyc->status = $validated['status'];
        $kyc->reviewed_by = $request->user()->id;
        $kyc->reviewed_at = now();
        $kyc->save();
        $kyc->user->notify(new KycStatusChanged($kyc->status));
        return response()->json(['message' => 'KYC reviewed', 'kyc' => $kyc]);
    }

    public function siteSettings(Request $request)
    {
        $this->authorizeAdmin($request);
        $settings = SiteSetting::all();
        return response()->json($settings);
    }

    public function updateSiteSettings(Request $request)
    {
        $this->authorizeAdmin($request);
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);
        foreach ($validated['settings'] as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        return response()->json(['message' => 'Settings updated']);
    }
}
