import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, LocationEdit as Edit3, Trash2 } from 'lucide-react-native';

interface ReviewCardProps {
  shopName: string;
  shopImage: string;
  rating: number;
  review: string;
  date: string;
  drinkName: string;
}

function ReviewCard({ shopName, shopImage, rating, review, date, drinkName }: ReviewCardProps) {
  return (
    <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
      <View className="mb-3 flex-row items-center">
        <Image
          source={{ uri: shopImage }}
          className="mr-3 h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="mb-1 text-base font-semibold text-primary-text">{shopName}</Text>
          <Text className="text-sm text-accent-text">{drinkName}</Text>
        </View>
        <View className="flex-row items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              color={i < rating ? '#FFD700' : '#E5E7EB'}
              fill={i < rating ? '#FFD700' : '#E5E7EB'}
            />
          ))}
        </View>
      </View>

      <Text className="mb-3 text-sm leading-5 text-primary-text">{review}</Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-accent-text">{date}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className="p-2">
            <Edit3 size={16} color="#707070" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function ReviewsPage() {
  const reviews = [
    {
      shopName: 'Ten Ren Tea',
      shopImage:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      review:
        'Amazing bubble tea! The pearls are perfectly chewy and the tea has great flavor. Definitely coming back for more.',
      date: '2 days ago',
      drinkName: 'Brown Sugar Milk Tea',
    },
    {
      shopName: 'Tiger Sugar',
      shopImage:
        'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      review:
        'Good quality tea with authentic taste. The brown sugar boba was delicious, though the wait time was a bit long.',
      date: '1 week ago',
      drinkName: 'Tiger Milk Tea',
    },
    {
      shopName: 'CHICHA San Chen',
      shopImage:
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      review:
        'Best cheese tea in the area! Love their seasonal specials and the quality is always consistent.',
      date: '2 weeks ago',
      drinkName: 'Cheese Tea',
    },
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View className="mb-6 mt-4 rounded-2xl bg-secondary-background p-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="mb-2 text-lg font-bold text-secondary-primary">
                Your Review Stats
              </Text>
              <Text className="mb-4 text-sm text-accent-text">
                Help others discover great drinks!
              </Text>

              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {reviews.length}
                  </Text>
                  <Text className="text-xs text-accent-text">Reviews</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">
                    {averageRating.toFixed(1)}
                  </Text>
                  <Text className="text-xs text-accent-text">Avg Rating</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-secondary-primary">12</Text>
                  <Text className="text-xs text-accent-text">Helpful</Text>
                </View>
              </View>
            </View>

            <View className="ml-4 h-16 w-16 items-center justify-center rounded-full bg-secondary-primary">
              <Star size={32} color="#ffffff" fill="#ffffff" />
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <View className="mb-6">
          <Text className="mb-4 text-xl font-bold text-primary-text">My Reviews</Text>
          {reviews.length > 0 ? (
            reviews.map((review, index) => <ReviewCard key={index} {...review} />)
          ) : (
            <View className="items-center rounded-2xl bg-white p-8">
              <Star size={48} color="#d86a2b" />
              <Text className="mb-2 mt-4 text-lg font-semibold text-primary-text">
                No Reviews Yet
              </Text>
              <Text className="text-center text-accent-text">
                Start reviewing your favorite drinks to help others discover great options!
              </Text>
            </View>
          )}
        </View>

        {/* Write Review Button */}
        <TouchableOpacity className="mb-6 items-center rounded-2xl bg-secondary-primary p-4">
          <Text className="text-base font-bold text-white">Write a New Review</Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
