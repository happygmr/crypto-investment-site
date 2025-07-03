use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

// Authentication routes (Fortify handles logic, Sanctum for tokens)

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Example protected route
dd
Route::middleware('auth:sanctum')->get('/protected', function () {
    return response()->json(['message' => 'You are authenticated!']);
});

// User routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [\App\Http\Controllers\Api\UserController::class, 'profile']);
    Route::put('/profile', [\App\Http\Controllers\Api\UserController::class, 'update']);
    Route::post('/kyc', [\App\Http\Controllers\Api\UserController::class, 'submitKyc']);
});

// Trader routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/trader/become', [\App\Http\Controllers\Api\TraderController::class, 'become']);
    Route::get('/trader/stats', [\App\Http\Controllers\Api\TraderController::class, 'stats']);
});

// Copy trading routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/copy/follow', [\App\Http\Controllers\Api\CopyTradeController::class, 'follow']);
    Route::post('/copy/unfollow', [\App\Http\Controllers\Api\CopyTradeController::class, 'unfollow']);
    Route::post('/copy/trade', [\App\Http\Controllers\Api\CopyTradeController::class, 'copyTrade']);
});

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [\App\Http\Controllers\Api\AdminController::class, 'users']);
    Route::put('/user/{id}/status', [\App\Http\Controllers\Api\AdminController::class, 'updateUserStatus']);
    Route::get('/kyc/requests', [\App\Http\Controllers\Api\AdminController::class, 'kycRequests']);
    Route::put('/kyc/{id}/review', [\App\Http\Controllers\Api\AdminController::class, 'reviewKyc']);
    Route::get('/site/settings', [\App\Http\Controllers\Api\AdminController::class, 'siteSettings']);
    Route::put('/site/settings', [\App\Http\Controllers\Api\AdminController::class, 'updateSiteSettings']);
}); 