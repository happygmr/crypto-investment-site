<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Admin;
use Laravel\Sanctum\Sanctum;

class AdminUserListTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function admin_can_list_all_users()
    {
        $adminUser = User::factory()->create();
        Admin::create(['user_id' => $adminUser->id]);
        Sanctum::actingAs($adminUser);
        $response = $this->getJson('/api/admin/users');
        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'name', 'email', 'status', 'profile', 'trader']
            ]);
    }
}
