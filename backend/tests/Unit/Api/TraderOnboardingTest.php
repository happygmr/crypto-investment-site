<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class TraderOnboardingTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_become_a_trader()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $payload = [
            'bio' => 'Experienced trader',
            'is_public' => true,
            'subscription_fee' => 10.5,
            'profit_share_percent' => 15.0,
        ];
        $response = $this->postJson('/api/trader/become', $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['bio' => 'Experienced trader']);
    }
}
