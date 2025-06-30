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
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4">
            {getIcon()}
          </View>
          <View className="flex-1">
            <Text className="text-primary-text text-base font-semibold mb-1">
              {title}
            </Text>
            <Text className="text-accent-text text-sm">
              {subtitle}
            </Text>
          </View>
        </View>
        {isDefault && (
          <View className="bg-secondary-primary rounded-full px-3 py-1">
            <Text className="text-white text-xs font-semibold">
              DEFAULT
            </Text>
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
        <View className="bg-secondary-background rounded-2xl p-6 mb-6 mt-4">
          <Text className="text-secondary-primary text-lg font-bold mb-2">
            Payment Methods
          </Text>
          <Text className="text-accent-text text-sm">
            Manage your payment options for quick and secure transactions
          </Text>
        </View>

        {/* Add New Payment Method */}
        <TouchableOpacity className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-6 items-center">
          <View className="w-12 h-12 bg-secondary-primary rounded-full items-center justify-center mb-3">
            <Plus size={24} color="#ffffff" />
          </View>
          <Text className="text-primary-text text-base font-semibold mb-1">
            Add New Payment Method
          </Text>
          <Text className="text-accent-text text-sm text-center">
            Add a credit card, mobile payment, or digital wallet
          </Text>
        </TouchableOpacity>

        {/* Payment Methods List */}
        <View className="mb-6">
          <Text className="text-primary-text text-xl font-bold mb-4">
            Saved Payment Methods
          </Text>
          {paymentMethods.map((method, index) => (
            <PaymentMethod key={index} {...method} />
          ))}
        </View>

        {/* Security Info */}
        <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <Text className="text-blue-800 text-sm font-semibold mb-2">
            🔒 Your payments are secure
          </Text>
          <Text className="text-blue-600 text-xs leading-5">
            All payment information is encrypted and stored securely. We never store your full card details on our servers.
          </Text>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}