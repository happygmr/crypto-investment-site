<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Trader;
use App\Models\CopyGroup;
use App\Models\GroupMember;
use App\Models\Trade;
use App\Models\CopiedTrade;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Admin;
use App\Models\SiteSetting;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 users
        $users = User::factory(5)->create();
        foreach ($users as $user) {
            UserProfile::create([
                'user_id' => $user->id,
                'phone' => fake()->phoneNumber(),
                'address' => fake()->address(),
                'kyc_status' => 'approved',
                'date_of_birth' => fake()->date(),
                'country' => fake()->country(),
                'avatar' => null,
            ]);
            Wallet::create([
                'user_id' => $user->id,
                'currency' => 'USDT',
                'balance' => rand(100, 10000),
            ]);
        }

        // Make the first user an admin
        Admin::create(['user_id' => $users[0]->id, 'permissions' => null, 'last_login' => now()]);

        // Make the next two users traders
        foreach ($users->slice(1, 2) as $user) {
            $trader = Trader::create([
                'user_id' => $user->id,
                'bio' => 'Demo trader',
                'performance_stats' => json_encode(['roi' => rand(10, 100)]),
                'is_public' => true,
                'subscription_fee' => rand(10, 100),
                'profit_share_percent' => rand(5, 20),
                'status' => 'active',
            ]);
            // Create a copy group for each trader
            $group = CopyGroup::create([
                'trader_id' => $trader->id,
                'name' => $user->name . "'s Group",
                'description' => 'Demo copy trading group',
                'is_public' => true,
            ]);
            // Add other users as group members
            foreach ($users as $member) {
                if ($member->id !== $user->id) {
                    GroupMember::create([
                        'group_id' => $group->id,
                        'user_id' => $member->id,
                        'status' => 'active',
                        'joined_at' => now(),
                    ]);
                }
            }
            // Create trades for the trader
            for ($i = 0; $i < 3; $i++) {
                $trade = Trade::create([
                    'trader_id' => $trader->id,
                    'symbol' => 'BTCUSDT',
                    'type' => ['buy', 'sell'][rand(0, 1)],
                    'amount' => rand(1, 10),
                    'price' => rand(20000, 60000),
                    'trade_time' => now()->subDays(rand(1, 30)),
                    'status' => 'closed',
                ]);
                // Each member copies the trade
                foreach ($group->members as $member) {
                    CopiedTrade::create([
                        'trade_id' => $trade->id,
                        'copier_id' => $member->user_id,
                        'amount' => rand(1, 5),
                        'price' => $trade->price,
                        'status' => 'closed',
                        'copied_at' => now(),
                    ]);
                }
            }
        }

        // Site settings
        SiteSetting::updateOrCreate(['key' => 'site_name'], ['value' => 'Demo Crypto Investment Platform']);
        SiteSetting::updateOrCreate(['key' => 'support_email'], ['value' => 'support@example.com']);
    }
}
