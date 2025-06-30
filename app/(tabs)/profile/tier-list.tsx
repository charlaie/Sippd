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

function TierCard({ tier, emoji, color, bgColor, current = false, shopsRequired, shopsVisited, benefits }: TierCardProps) {
  const progress = (shopsVisited / shopsRequired) * 100;
  
  return (
    <View className={`rounded-2xl p-6 mb-4 ${current ? 'border-2 border-secondary-primary' : ''}`} style={{ backgroundColor: bgColor }}>
      {current && (
        <View className="absolute top-4 right-4 bg-secondary-primary rounded-full px-3 py-1">
          <Text className="text-white text-xs font-bold">CURRENT</Text>
        </View>
      )}
      
      <View className="flex-row items-center mb-4">
        <View className="w-16 h-16 rounded-full items-center justify-center mr-4" style={{ backgroundColor: color }}>
          <Text className="text-3xl">{emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-primary-text text-xl font-bold mb-1">
            {tier} Tier
          </Text>
          <Text className="text-accent-text text-sm">
            {shopsVisited}/{shopsRequired} shops visited
          </Text>
        </View>
      </View>
      
      {current && (
        <View className="mb-4">
          <View className="bg-white rounded-full h-2 mb-2">
            <View 
              className="bg-secondary-primary rounded-full h-2" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </View>
          <Text className="text-accent-text text-xs">
            {shopsRequired - shopsVisited > 0 
              ? `${shopsRequired - shopsVisited} more shops to next tier`
              : 'Tier completed!'
            }
          </Text>
        </View>
      )}
      
      <View>
        <Text className="text-primary-text text-sm font-semibold mb-2">Benefits:</Text>
        {benefits.map((benefit, index) => (
          <Text key={index} className="text-accent-text text-sm mb-1">
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
      benefits: [
        'Basic rewards on visits',
        'Birthday discount',
        'Access to member events'
      ]
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
        'Exclusive silver member vouchers'
      ]
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
        'VIP customer support'
      ]
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
        'Skip the line privilege'
      ]
    }
  ];

  const currentTier = tiers.find(tier => tier.current);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Current Tier Highlight */}
        <View className="bg-secondary-background rounded-2xl p-6 mb-6 mt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-secondary-primary text-lg font-bold mb-2">
                Your Current Tier
              </Text>
              <Text className="text-accent-text text-sm mb-4">
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
            
            <View className="w-16 h-16 bg-secondary-primary rounded-full items-center justify-center ml-4">
              <Trophy size={32} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
            <Target size={24} color="#d86a2b" />
            <Text className="text-primary-text text-sm font-semibold mt-2">
              Set Goals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
            <Gift size={24} color="#d86a2b" />
            <Text className="text-primary-text text-sm font-semibold mt-2">
              Claim Rewards
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
            <TrendingUp size={24} color="#d86a2b" />
            <Text className="text-primary-text text-sm font-semibold mt-2">
              View Progress
            </Text>
          </TouchableOpacity>
        </View>

        {/* All Tiers */}
        <View className="mb-6">
          <Text className="text-primary-text text-xl font-bold mb-4">
            All Tiers
          </Text>
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