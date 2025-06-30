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
    <View className="bg-white rounded-2xl shadow-sm mb-4 p-4">
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: shopImage }}
          className="w-12 h-12 rounded-full mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-primary-text text-base font-semibold mb-1">
            {shopName}
          </Text>
          <Text className="text-accent-text text-sm">
            {drinkName}
          </Text>
        </View>
        <View className="flex-row items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              color={i < rating ? "#FFD700" : "#E5E7EB"}
              fill={i < rating ? "#FFD700" : "#E5E7EB"}
            />
          ))}
        </View>
      </View>
      
      <Text className="text-primary-text text-sm leading-5 mb-3">
        {review}
      </Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-accent-text text-xs">
          {date}
        </Text>
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
      shopImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      review: 'Amazing bubble tea! The pearls are perfectly chewy and the tea has great flavor. Definitely coming back for more.',
      date: '2 days ago',
      drinkName: 'Brown Sugar Milk Tea',
    },
    {
      shopName: 'Tiger Sugar',
      shopImage: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      review: 'Good quality tea with authentic taste. The brown sugar boba was delicious, though the wait time was a bit long.',
      date: '1 week ago',
      drinkName: 'Tiger Milk Tea',
    },
    {
      shopName: 'CHICHA San Chen',
      shopImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      review: 'Best cheese tea in the area! Love their seasonal specials and the quality is always consistent.',
      date: '2 weeks ago',
      drinkName: 'Cheese Tea',
    },
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View className="bg-secondary-background rounded-2xl p-6 mb-6 mt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-secondary-primary text-lg font-bold mb-2">
                Your Review Stats
              </Text>
              <Text className="text-accent-text text-sm mb-4">
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
                  <Text className="text-2xl font-bold text-secondary-primary">
                    12
                  </Text>
                  <Text className="text-xs text-accent-text">Helpful</Text>
                </View>
              </View>
            </View>
            
            <View className="w-16 h-16 bg-secondary-primary rounded-full items-center justify-center ml-4">
              <Star size={32} color="#ffffff" fill="#ffffff" />
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <View className="mb-6">
          <Text className="text-primary-text text-xl font-bold mb-4">
            My Reviews
          </Text>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))
          ) : (
            <View className="bg-white rounded-2xl p-8 items-center">
              <Star size={48} color="#d86a2b" />
              <Text className="text-primary-text text-lg font-semibold mt-4 mb-2">
                No Reviews Yet
              </Text>
              <Text className="text-accent-text text-center">
                Start reviewing your favorite drinks to help others discover great options!
              </Text>
            </View>
          )}
        </View>

        {/* Write Review Button */}
        <TouchableOpacity className="bg-secondary-primary rounded-2xl p-4 items-center mb-6">
          <Text className="text-white text-base font-bold">
            Write a New Review
          </Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}