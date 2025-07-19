import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Calendar, DollarSign, Coffee, Recycle } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data for yearly insights
const yearlyInsights = {
  totalSips: 102,
  sugarConsumed: '5502g',
  plasticCupsUsed: 72,
  moneySpent: '$3,522',
};

// Mock data for trends
const trendsData = {
  daily: {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    data: [2, 3, 1, 0, 2, 1, 1],
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [8, 12, 6, 10],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [25, 32, 18, 28, 35, 22],
  },
};

type TabType = 'daily' | 'weekly' | 'monthly';

interface BarChartProps {
  data: number[];
  labels: string[];
  maxHeight: number;
}

function BarChart({ data, labels, maxHeight }: BarChartProps) {
  const maxValue = Math.max(...data);
  const chartWidth = SCREEN_WIDTH - 80; // Account for padding
  const barWidth = Math.min(32, (chartWidth - (data.length - 1) * 8) / data.length);

  return (
    <View className="mt-6">
      {/* Chart Container */}
      <View className="relative" style={{ height: maxHeight + 40 }}>
        {/* Y-axis labels */}
        <View className="absolute bottom-10 left-0 top-0 justify-between">
          {[4, 3, 2, 1, 0].map((value) => (
            <Text key={value} className="text-xs text-accent-text">
              {value}
            </Text>
          ))}
        </View>

        {/* Grid lines */}
        <View className="absolute bottom-10 left-8 right-0 top-0">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <View
              key={index}
              className="absolute w-full border-b border-gray-100"
              style={{ top: (index * maxHeight) / 4 }}
            />
          ))}
        </View>

        {/* Bars */}
        <View className="absolute bottom-10 left-8 right-0 flex-row items-end justify-around">
          {data.map((value, index) => {
            const barHeight = maxValue > 0 ? (value / maxValue) * maxHeight : 0;
            return (
              <View key={index} className="items-center">
                <View
                  className="rounded-t-md bg-secondary-primary"
                  style={{
                    width: barWidth,
                    height: Math.max(barHeight, value > 0 ? 4 : 0),
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>

      {/* X-axis labels */}
      <View className="mt-2 flex-row justify-around">
        {labels.map((label, index) => (
          <Text
            key={index}
            className="text-center text-xs text-accent-text"
            style={{ width: barWidth + 8 }}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  // Animation values for sliding indicator
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const tabs: TabType[] = ['daily', 'weekly', 'monthly'];
  const tabContainerWidth = 240; // Fixed width for consistent calculations
  const tabWidth = tabContainerWidth / tabs.length;

  const currentData = trendsData[activeTab];

  // Animated style for the sliding indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      width: indicatorWidth.value,
    };
  });

  const handleTabPress = (tab: TabType, index: number) => {
    setActiveTab(tab);

    // Animate the indicator to the new position
    const newPosition = index * tabWidth;
    indicatorPosition.value = withSpring(newPosition, {
      damping: 20,
      stiffness: 300,
    });
    indicatorWidth.value = withSpring(tabWidth, {
      damping: 20,
      stiffness: 300,
    });
  };

  // Initialize indicator position and width
  React.useEffect(() => {
    const initialIndex = tabs.indexOf(activeTab);
    indicatorPosition.value = initialIndex * tabWidth;
    indicatorWidth.value = tabWidth;
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#fffcf6" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-6 pt-4">
          <Text className="text-center text-2xl font-bold text-primary-text">Track</Text>
        </View>

        {/* Yearly Insights Section */}
        <View className="mb-6 px-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Yearly Insights</Text>

          <View className="rounded-2xl bg-white p-6 shadow-sm">
            {/* Main Stat */}
            <Text className="mb-2 text-center text-sm font-medium text-accent-text">
              Total times you Sippd in 2025
            </Text>
            <Text className="mb-6 text-center text-5xl font-bold text-primary-text">
              {yearlyInsights.totalSips}
            </Text>

            {/* Dotted separator */}
            <View className="mb-6 border-b border-dashed border-gray-300" />

            {/* Stats Grid */}
            <View className="flex-row items-center justify-around">
              <View className="flex-1 items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Coffee size={20} color="#d86a2b" />
                </View>
                <Text className="text-lg font-semibold text-primary-text">
                  {yearlyInsights.sugarConsumed}
                </Text>
                <Text className="mt-1 text-center text-xs text-accent-text">Sugar Consumed</Text>
              </View>

              <View className="flex-1 items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Recycle size={20} color="#3b82f6" />
                </View>
                <Text className="text-lg font-semibold text-primary-text">
                  {yearlyInsights.plasticCupsUsed}
                </Text>
                <Text className="mt-1 text-center text-xs text-accent-text">Plastic Cup Used</Text>
              </View>

              <View className="flex-1 items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <DollarSign size={20} color="#10b981" />
                </View>
                <Text className="text-lg font-semibold text-primary-text">
                  {yearlyInsights.moneySpent}
                </Text>
                <Text className="mt-1 text-center text-xs text-accent-text">Money Spent</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trends Section */}
        <View className="mb-8 px-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Trends</Text>

          <View className="rounded-2xl bg-white p-6 shadow-sm">
            {/* Tab Navigation */}
            <View
              className="relative mb-6 self-center rounded-full bg-gray-100 p-1"
              style={{ width: tabContainerWidth }}>
              {/* Animated Indicator */}
              <Animated.View
                style={[
                  indicatorStyle,
                  {
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    height: 32,
                    borderRadius: 16,
                  },
                ]}
                className="bg-secondary-primary"
              />

              {/* Tab Buttons */}
              <View className="flex-row">
                {tabs.map((tab, index) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => handleTabPress(tab, index)}
                    className="items-center justify-center rounded-full px-4 py-2"
                    style={{ width: tabWidth }}>
                    <Text
                      className={`text-sm font-semibold capitalize ${
                        activeTab === tab ? 'text-white' : 'text-accent-text'
                      }`}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bar Chart */}
            <BarChart data={currentData.data} labels={currentData.labels} maxHeight={160} />
          </View>
        </View>

        {/* Additional Insights */}
        <View className="mb-8 px-6">
          <View className="rounded-2xl bg-secondary-background p-6">
            <View className="mb-3 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-secondary-primary">
                <TrendingUp size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-secondary-primary">
                  Weekly Goal Progress
                </Text>
                <Text className="text-sm text-accent-text">You're doing great this week!</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View className="mb-3 h-3 rounded-full bg-white">
              <View className="h-3 rounded-full bg-secondary-primary" style={{ width: '75%' }} />
            </View>

            <Text className="text-sm text-accent-text">6 out of 8 drinks logged this week</Text>
          </View>
        </View>

        {/* Environmental Impact */}
        <View className="mb-8 px-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Environmental Impact</Text>

          <View className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <Recycle size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-green-800">Eco-Friendly Choices</Text>
                <Text className="text-sm text-green-600">You've made a positive impact!</Text>
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-green-700">Reusable cups used</Text>
                <Text className="font-semibold text-green-800">30 times</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-green-700">Plastic cups avoided</Text>
                <Text className="font-semibold text-green-800">30 cups</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-green-700">CO₂ saved</Text>
                <Text className="font-semibold text-green-800">2.1 kg</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
