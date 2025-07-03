<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class KycSubmissionTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_submit_kyc()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $payload = [
            'document_type' => 'passport',
            'document_url' => 'http://example.com/passport.jpg',
        ];
        $response = $this->postJson('/api/kyc', $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['document_type' => 'passport']);
    }
}
