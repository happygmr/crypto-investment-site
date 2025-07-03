<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\CopyGroup;
use Laravel\Sanctum\Sanctum;

class CopyTradingTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_follow_a_copy_group()
    {
        $user = User::factory()->create();
        $group = CopyGroup::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->postJson('/api/copy/follow', ['group_id' => $group->id]);
        $response->assertStatus(200)
            ->assertJsonFragment(['group_id' => $group->id]);
    }
}
