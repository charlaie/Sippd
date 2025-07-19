import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Circle as HelpCircle,
  ChevronRight,
  Search,
} from 'lucide-react-native';

interface HelpItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}

function HelpItem({ icon, title, description, onPress }: HelpItemProps) {
  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
            {icon}
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-base font-semibold text-primary-text">{title}</Text>
            <Text className="text-sm text-accent-text">{description}</Text>
          </View>
        </View>
        <ChevronRight size={20} color="#707070" />
      </View>
    </TouchableOpacity>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.7}>
      <View className="flex-row items-center justify-between">
        <Text className="mr-2 flex-1 text-base font-semibold text-primary-text">{question}</Text>
        <ChevronRight
          size={20}
          color="#707070"
          style={{
            transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
          }}
        />
      </View>
      {isExpanded && <Text className="mt-3 text-sm leading-5 text-accent-text">{answer}</Text>}
    </TouchableOpacity>
  );
}

export default function HelpCentrePage() {
  const contactOptions = [
    {
      icon: <MessageCircle size={24} color="#d86a2b" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      onPress: () => console.log('Live chat'),
    },
    {
      icon: <Phone size={24} color="#d86a2b" />,
      title: 'Call Us',
      description: '+852 1234 5678',
      onPress: () => console.log('Call support'),
    },
    {
      icon: <Mail size={24} color="#d86a2b" />,
      title: 'Email Support',
      description: 'support@sippd.com',
      onPress: () => console.log('Email support'),
    },
  ];

  const helpTopics = [
    {
      icon: <HelpCircle size={24} color="#707070" />,
      title: 'Getting Started',
      description: 'Learn the basics of using Sippd',
      onPress: () => console.log('Getting started'),
    },
    {
      icon: <FileText size={24} color="#707070" />,
      title: 'Account & Profile',
      description: 'Manage your account settings',
      onPress: () => console.log('Account help'),
    },
    {
      icon: <Search size={24} color="#707070" />,
      title: 'Finding Shops',
      description: 'Discover new drink locations',
      onPress: () => console.log('Finding shops'),
    },
  ];

  const faqs = [
    {
      question: 'How do I log a new drink?',
      answer:
        'Tap the orange + button in the tab bar to open the drink logging form. Fill in the details about your drink and tap Save.',
    },
    {
      question: 'How do tier levels work?',
      answer:
        'Visit more shops to advance through Bronze, Silver, Gold, and Platinum tiers. Each tier unlocks better rewards and discounts.',
    },
    {
      question: 'Can I edit or delete my drink logs?',
      answer:
        'Yes! Go to your profile and view your drink history. You can edit or delete any previous entries.',
    },
    {
      question: 'How do I redeem vouchers?',
      answer:
        'Show your active vouchers to the shop staff when ordering. They will apply the discount to your purchase.',
    },
    {
      question: 'Is my payment information secure?',
      answer:
        'Absolutely! All payment data is encrypted and we never store your full card details on our servers.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6 mt-4 rounded-2xl bg-secondary-background p-6">
          <Text className="mb-2 text-lg font-bold text-secondary-primary">
            How can we help you?
          </Text>
          <Text className="text-sm text-accent-text">
            Find answers to common questions or get in touch with our support team
          </Text>
        </View>

        {/* Contact Options */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Contact Support</Text>
          {contactOptions.map((option, index) => (
            <HelpItem key={index} {...option} />
          ))}
        </View>

        {/* Help Topics */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">Help Topics</Text>
          {helpTopics.map((topic, index) => (
            <HelpItem key={index} {...topic} />
          ))}
        </View>

        {/* FAQs */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">
            Frequently Asked Questions
          </Text>
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </View>

        {/* App Info */}
        <View className="mb-6 rounded-2xl bg-gray-50 p-4">
          <Text className="mb-2 text-sm font-semibold text-primary-text">App Information</Text>
          <View className="mb-1 flex-row justify-between">
            <Text className="text-xs text-accent-text">Version</Text>
            <Text className="text-xs text-accent-text">1.0.0</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-accent-text">Build</Text>
            <Text className="text-xs text-accent-text">2024.12.1</Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
