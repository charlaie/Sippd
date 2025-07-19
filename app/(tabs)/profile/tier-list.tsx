import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Target, Gift, TrendingUp } from 'lucide-react-native';

interface TierCardProps {
  tier: string;
  emoji: string;
  color: string;
  bgColor: string;
  current?: boolean;
  shopsRequired: number;
  shopsVisited: number;
  benefits: string[];
}

function TierCard({
  tier,
  emoji,
  color,
  bgColor,
  current = false,
  shopsRequired,
  shopsVisited,
  benefits,
}: TierCardProps) {
  const progress = (shopsVisited / shopsRequired) * 100;

  return (
    <View
      className={`mb-4 rounded-2xl p-6 ${current ? 'border-2 border-secondary-primary' : ''}`}
      style={{ backgroundColor: bgColor }}>
      {current && (
        <View className="absolute right-4 top-4 rounded-full bg-secondary-primary px-3 py-1">
          <Text className="text-xs font-bold text-white">CURRENT</Text>
        </View>
      )}

      <View className="mb-4 flex-row items-center">
        <View
          className="mr-4 h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}>
          <Text className="text-3xl">{emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xl font-bold text-primary-text">{tier} Tier</Text>
          <Text className="text-sm text-accent-text">
            {shopsVisited}/{shopsRequired} shops visited
          </Text>
        </View>
      </View>

      {current && (
        <View className="mb-4">
          <View className="mb-2 h-2 rounded-full bg-white">
            <View
              className="h-2 rounded-full bg-secondary-primary"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </View>
          <Text className="text-xs text-accent-text">
            {shopsRequired - shopsVisited > 0
              ? `${shopsRequired - shopsVisited} more shops to next tier`
              : 'Tier completed!'}
          </Text>
        </View>
      )}

      <View>
        <Text className="mb-2 text-sm font-semibold text-primary-text">Benefits:</Text>
        {benefits.map((benefit, index) => (
          <Text key={index} className="mb-1 text-sm text-accent-text">
            • {benefit}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function TierListPage() {
  const tiers = [
    {
      tier: 'Bronze',
      emoji: '🥉',
      color: '#cd7f32',
      bgColor: '#fef3e2',
      current: true,
      shopsRequired: 10,
      shopsVisited: 7,
      benefits: ['Basic rewards on visits', 'Birthday discount', 'Access to member events'],
    },
    {
      tier: 'Silver',
      emoji: '🥈',
      color: '#c0c0c0',
      bgColor: '#f8f9fa',
      current: false,
      shopsRequired: 25,
      shopsVisited: 7,
      benefits: [
        'All Bronze benefits',
        '5% discount on all drinks',
        'Priority customer support',
        'Exclusive silver member vouchers',
      ],
    },
    {
      tier: 'Gold',
      emoji: '🥇',
      color: '#ffd700',
      bgColor: '#fffbeb',
      current: false,
      shopsRequired: 50,
      shopsVisited: 7,
      benefits: [
        'All Silver benefits',
        '10% discount on all drinks',
        'Free drink on birthday',
        'Early access to new menu items',
        'VIP customer support',
      ],
    },
    {
      tier: 'Platinum',
      emoji: '💎',
      color: '#e5e4e2',
      bgColor: '#f1f5f9',
      current: false,
      shopsRequired: 100,
      shopsVisited: 7,
      benefits: [
        'All Gold benefits',
        '15% discount on all drinks',
        'Monthly free drink',
        'Exclusive platinum events',
        'Personal drink recommendations',
        'Skip the line privilege',
      ],
    },
  ];

  const currentTier = tiers.find((tier) => tier.current);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Current Tier Highlight */}
        <View className="mb-6 mt-4 rounded-2xl bg-secondary-background p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="mb-2 text-lg font-bold text-secondary-primary">
                Your Current Tier
              </Text>
              <Text className="mb-4 text-sm text-accent-text">
                Keep visiting shops to unlock more rewards!
              </Text>

              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {currentTier?.tier}
                  </Text>
                  <Text className="text-xs text-accent-text">Current</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {currentTier?.shopsVisited}
                  </Text>
                  <Text className="text-xs text-accent-text">Shops Visited</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {currentTier ? currentTier.shopsRequired - currentTier.shopsVisited : 0}
                  </Text>
                  <Text className="text-xs text-accent-text">To Next Tier</Text>
                </View>
              </View>
            </View>

            <View className="ml-4 h-16 w-16 items-center justify-center rounded-full bg-secondary-primary">
              <Trophy size={32} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6 flex-row gap-3">
          <TouchableOpacity className="flex-1 items-center rounded-2xl bg-white p-4 shadow-sm">
            <Target size={24} color="#d86a2b" />
            <Text className="mt-2 text-sm font-semibold text-primary-text">Set Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center rounded-2xl bg-white p-4 shadow-sm">
            <Gift size={24} color="#d86a2b" />
            <Text className="mt-2 text-sm font-semibold text-primary-text">Claim Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center rounded-2xl bg-white p-4 shadow-sm">
            <TrendingUp size={24} color="#d86a2b" />
            <Text className="mt-2 text-sm font-semibold text-primary-text">View Progress</Text>
          </TouchableOpacity>
        </View>

        {/* All Tiers */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">All Tiers</Text>
          {tiers.map((tier, index) => (
            <TierCard key={index} {...tier} />
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
