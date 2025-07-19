import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Plus, Smartphone, Wallet } from 'lucide-react-native';

interface PaymentMethodProps {
  type: 'card' | 'mobile' | 'wallet';
  title: string;
  subtitle: string;
  isDefault?: boolean;
}

function PaymentMethod({ type, title, subtitle, isDefault = false }: PaymentMethodProps) {
  const getIcon = () => {
    switch (type) {
      case 'card':
        return <CreditCard size={24} color="#707070" />;
      case 'mobile':
        return <Smartphone size={24} color="#707070" />;
      case 'wallet':
        return <Wallet size={24} color="#707070" />;
      default:
        return <CreditCard size={24} color="#707070" />;
    }
  };

  return (
    <TouchableOpacity className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
            {getIcon()}
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-base font-semibold text-primary-text">{title}</Text>
            <Text className="text-sm text-accent-text">{subtitle}</Text>
          </View>
        </View>
        {isDefault && (
          <View className="rounded-full bg-secondary-primary px-3 py-1">
            <Text className="text-xs font-semibold text-white">DEFAULT</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function PaymentDetailsPage() {
  const paymentMethods = [
    {
      type: 'card' as const,
      title: 'Visa •••• 4532',
      subtitle: 'Expires 12/26',
      isDefault: true,
    },
    {
      type: 'mobile' as const,
      title: 'Apple Pay',
      subtitle: 'Touch ID enabled',
      isDefault: false,
    },
    {
      type: 'wallet' as const,
      title: 'PayPal',
      subtitle: 'charli@example.com',
      isDefault: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View className="mb-6 mt-4 rounded-2xl bg-secondary-background p-6">
          <Text className="mb-2 text-lg font-bold text-secondary-primary">Payment Methods</Text>
          <Text className="text-sm text-accent-text">
            Manage your payment options for quick and secure transactions
          </Text>
        </View>

        {/* Add New Payment Method */}
        <TouchableOpacity className="mb-6 items-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6">
          <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-secondary-primary">
            <Plus size={24} color="#ffffff" />
          </View>
          <Text className="mb-1 text-base font-semibold text-primary-text">
            Add New Payment Method
          </Text>
          <Text className="text-center text-sm text-accent-text">
            Add a credit card, mobile payment, or digital wallet
          </Text>
        </TouchableOpacity>

        {/* Payment Methods List */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Saved Payment Methods</Text>
          {paymentMethods.map((method, index) => (
            <PaymentMethod key={index} {...method} />
          ))}
        </View>

        {/* Security Info */}
        <View className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <Text className="mb-2 text-sm font-semibold text-blue-800">
            🔒 Your payments are secure
          </Text>
          <Text className="text-xs leading-5 text-blue-600">
            All payment information is encrypted and stored securely. We never store your full card
            details on our servers.
          </Text>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
