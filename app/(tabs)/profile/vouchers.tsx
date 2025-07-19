import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ticket, Clock, Gift } from 'lucide-react-native';

interface VoucherCardProps {
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  isUsed?: boolean;
  shopImage: string;
}

function VoucherCard({
  title,
  description,
  discount,
  expiryDate,
  isUsed = false,
  shopImage,
}: VoucherCardProps) {
  return (
    <View
      className={`mb-4 overflow-hidden rounded-2xl bg-white shadow-sm ${isUsed ? 'opacity-60' : ''}`}>
      <View className="p-4">
        <View className="mb-3 flex-row items-center">
          <Image
            source={{ uri: shopImage }}
            className="mr-3 h-12 w-12 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="mb-1 text-lg font-bold text-primary-text">{title}</Text>
            <Text className="text-sm text-accent-text">{description}</Text>
          </View>
          <View
            className={`rounded-full px-3 py-1 ${isUsed ? 'bg-gray-200' : 'bg-secondary-primary'}`}>
            <Text className={`text-xs font-bold ${isUsed ? 'text-gray-500' : 'text-white'}`}>
              {isUsed ? 'USED' : discount}
            </Text>
          </View>
        </View>

        <View className="border-t border-dashed border-gray-200 pt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Clock size={14} color="#707070" />
              <Text className="ml-1 text-xs text-accent-text">Expires: {expiryDate}</Text>
            </View>
            {!isUsed && (
              <TouchableOpacity className="rounded-full bg-secondary-primary px-4 py-2">
                <Text className="text-xs font-semibold text-white">Use Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function VouchersPage() {
  const activeVouchers = [
    {
      title: 'HKD 3 Off',
      description: "TenRen's Tea flash discount",
      discount: '3 HKD',
      expiryDate: '31 Dec 2024',
      shopImage:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      title: 'Buy One Get One',
      description: 'Tiger Sugar limited offer',
      discount: 'BOGO',
      expiryDate: '15 Jan 2025',
      shopImage:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const usedVouchers = [
    {
      title: '10% Off',
      description: 'Gong Cha selected items',
      discount: '10%',
      expiryDate: '20 Dec 2024',
      isUsed: true,
      shopImage:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View className="mb-6 mt-4 rounded-2xl bg-secondary-background p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="mb-2 text-lg font-bold text-secondary-primary">
                Your Voucher Stats
              </Text>
              <Text className="mb-4 text-sm text-accent-text">
                Keep collecting to unlock more rewards!
              </Text>

              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {activeVouchers.length}
                  </Text>
                  <Text className="text-xs text-accent-text">Active</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {usedVouchers.length}
                  </Text>
                  <Text className="text-xs text-accent-text">Used</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">$12</Text>
                  <Text className="text-xs text-accent-text">Saved</Text>
                </View>
              </View>
            </View>

            <View className="ml-4 h-16 w-16 items-center justify-center rounded-full bg-secondary-primary">
              <Gift size={32} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Active Vouchers */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Active Vouchers</Text>
          {activeVouchers.length > 0 ? (
            activeVouchers.map((voucher, index) => <VoucherCard key={index} {...voucher} />)
          ) : (
            <View className="items-center rounded-2xl bg-white p-8">
              <Ticket size={48} color="#d86a2b" />
              <Text className="mb-2 mt-4 text-lg font-semibold text-primary-text">
                No Active Vouchers
              </Text>
              <Text className="text-center text-accent-text">
                Visit shops and complete challenges to earn vouchers!
              </Text>
            </View>
          )}
        </View>

        {/* Used Vouchers */}
        {usedVouchers.length > 0 && (
          <View className="mb-6">
            <Text className="mb-4 text-xl font-bold text-primary-text">Recently Used</Text>
            {usedVouchers.map((voucher, index) => (
              <VoucherCard key={index} {...voucher} />
            ))}
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
