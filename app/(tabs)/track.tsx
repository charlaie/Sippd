import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Calendar, DollarSign, Coffee, Recycle } from 'lucide-react-native';

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
        <View className="absolute left-0 top-0 bottom-10 justify-between">
          {[4, 3, 2, 1, 0].map((value) => (
            <Text key={value} className="text-xs text-accent-text">
              {value}
            </Text>
          ))}
        </View>

        {/* Grid lines */}
        <View className="absolute left-8 right-0 top-0 bottom-10">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <View
              key={index}
              className="absolute w-full border-b border-gray-100"
              style={{ top: (index * maxHeight) / 4 }}
            />
          ))}
        </View>

        {/* Bars */}
        <View className="absolute left-8 right-0 bottom-10 flex-row items-end justify-around">
          {data.map((value, index) => {
            const barHeight = maxValue > 0 ? (value / maxValue) * maxHeight : 0;
            return (
              <View key={index} className="items-center">
                <View
                  className="bg-secondary-primary rounded-t-md"
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
      <View className="flex-row justify-around mt-2">
        {labels.map((label, index) => (
          <Text key={index} className="text-xs text-accent-text text-center" style={{ width: barWidth + 8 }}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const currentData = trendsData[activeTab];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#fffcf6" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-primary-text text-2xl font-bold text-center">
            Track
          </Text>
        </View>

        {/* Yearly Insights Section */}
        <View className="px-6 mb-6">
          <Text className="text-primary-text text-xl font-bold mb-4">
            Yearly Insights
          </Text>
          
          <View className="bg-white rounded-2xl shadow-sm p-6">
            {/* Main Stat */}
            <Text className="text-accent-text text-sm font-medium text-center mb-2">
              Total times you Sippd in 2025
            </Text>
            <Text className="text-primary-text text-5xl font-bold text-center mb-6">
              {yearlyInsights.totalSips}
            </Text>
            
            {/* Dotted separator */}
            <View className="border-b border-dashed border-gray-300 mb-6" />
            
            {/* Stats Grid */}
            <View className="flex-row justify-around items-center">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                  <Coffee size={20} color="#d86a2b" />
                </View>
                <Text className="text-primary-text text-lg font-semibold">
                  {yearlyInsights.sugarConsumed}
                </Text>
                <Text className="text-accent-text text-xs mt-1 text-center">
                  Sugar Consumed
                </Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Recycle size={20} color="#3b82f6" />
                </View>
                <Text className="text-primary-text text-lg font-semibold">
                  {yearlyInsights.plasticCupsUsed}
                </Text>
                <Text className="text-accent-text text-xs mt-1 text-center">
                  Plastic Cup Used
                </Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <DollarSign size={20} color="#10b981" />
                </View>
                <Text className="text-primary-text text-lg font-semibold">
                  {yearlyInsights.moneySpent}
                </Text>
                <Text className="text-accent-text text-xs mt-1 text-center">
                  Money Spent
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trends Section */}
        <View className="px-6 mb-8">
          <Text className="text-primary-text text-xl font-bold mb-4">
            Trends
          </Text>
          
          <View className="bg-white rounded-2xl shadow-sm p-6">
            {/* Tab Navigation */}
            <View className="flex-row bg-gray-100 rounded-full p-1 mb-6 self-center">
              {(['daily', 'weekly', 'monthly'] as TabType[]).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-full items-center justify-center ${
                    activeTab === tab ? 'bg-secondary-primary' : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold capitalize ${
                      activeTab === tab ? 'text-white' : 'text-accent-text'
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Bar Chart */}
            <BarChart
              data={currentData.data}
              labels={currentData.labels}
              maxHeight={160}
            />
          </View>
        </View>

        {/* Additional Insights */}
        <View className="px-6 mb-8">
          <View className="bg-secondary-background rounded-2xl p-6">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-secondary-primary rounded-full items-center justify-center mr-3">
                <TrendingUp size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-secondary-primary text-lg font-bold">
                  Weekly Goal Progress
                </Text>
                <Text className="text-accent-text text-sm">
                  You're doing great this week!
                </Text>
              </View>
            </View>
            
            {/* Progress bar */}
            <View className="bg-white rounded-full h-3 mb-3">
              <View className="bg-secondary-primary rounded-full h-3" style={{ width: '75%' }} />
            </View>
            
            <Text className="text-accent-text text-sm">
              6 out of 8 drinks logged this week
            </Text>
          </View>
        </View>

        {/* Environmental Impact */}
        <View className="px-6 mb-8">
          <Text className="text-primary-text text-xl font-bold mb-4">
            Environmental Impact
          </Text>
          
          <View className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-4">
                <Recycle size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-green-800 text-lg font-bold">
                  Eco-Friendly Choices
                </Text>
                <Text className="text-green-600 text-sm">
                  You've made a positive impact!
                </Text>
              </View>
            </View>
            
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-green-700 text-sm">Reusable cups used</Text>
                <Text className="text-green-800 font-semibold">30 times</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-green-700 text-sm">Plastic cups avoided</Text>
                <Text className="text-green-800 font-semibold">30 cups</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-green-700 text-sm">CO₂ saved</Text>
                <Text className="text-green-800 font-semibold">2.1 kg</Text>
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