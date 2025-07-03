<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\UserProfile;
use App\Models\KycRequest;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user()->load('profile');
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'country' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);
        $profile = $user->profile;
        if (!$profile) {
            $profile = new UserProfile(['user_id' => $user->id]);
        }
        if ($profile->user_id !== $user->id) {
            abort(403, 'Unauthorized: Can only update your own profile');
        }
        $profile->fill($validated);
        $profile->save();
        return response()->json(['message' => 'Profile updated', 'profile' => $profile]);
    }

    public function submitKyc(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'document_type' => 'required|string',
            'document_url' => 'required|string',
        ]);
        $kyc = new KycRequest([
            'user_id' => $user->id,
            'document_type' => $validated['document_type'],
            'document_url' => $validated['document_url'],
            'status' => 'pending',
        ]);
        $kyc->save();
        return response()->json(['message' => 'KYC submitted', 'kyc' => $kyc]);
    }
}
