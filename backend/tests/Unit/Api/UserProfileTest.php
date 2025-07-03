<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class UserProfileTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_get_their_profile()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->getJson('/api/profile');
        $response->assertStatus(200)
            ->assertJsonFragment(['email' => $user->email]);
    }
}
