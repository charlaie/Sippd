import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Navigation,
  Heart,
  Share2,
  ChevronRight,
} from 'lucide-react-native';
import Drawer from './Drawer';

interface Shop {
  id: number;
  name: string;
  rating: number;
  location: string;
  latitude: number;
  longitude: number;
  image: string;
  hours: string;
  isOpen: boolean;
  distance: string;
  phone: string;
  website: string;
  description: string;
  featuredItems: Array<{
    name: string;
    price: string;
    image: string;
  }>;
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    comment: string;
    userImage: string;
  }>;
}

interface ShopDrawerProps {
  shop: Shop | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function ShopDrawer({ shop, isVisible, onClose }: ShopDrawerProps) {
  if (!shop) return null;

  return (
    <Drawer
      isVisible={isVisible}
      onClose={onClose}
      initialState="half"
      snapPoints={{
        half: 0.5,
        full: 0.9,
      }}
      enableGestures={true}
      enableHaptics={true}
    >
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-5">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-primary-text mb-1">
                {shop.name}
              </Text>
              <View className="flex-row items-center">
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text className="text-sm font-semibold text-primary-text ml-1">
                  {shop.rating}
                </Text>
                <Text className="text-sm text-accent-text ml-1">
                  ({shop.reviews.length} reviews)
                </Text>
              </View>
            </View>
            <View className="items-end">
              <View className={`px-2 py-1 rounded-xl mb-1 ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                <Text className="text-xs font-bold text-white">
                  {shop.isOpen ? 'OPEN' : 'CLOSED'}
                </Text>
              </View>
              <Text className="text-sm text-accent-text">
                {shop.distance}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-1">
            <MapPin size={14} color="#707070" />
            <Text className="text-sm text-accent-text ml-1.5 flex-1">
              {shop.location}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={14} color="#707070" />
            <Text className="text-sm text-accent-text ml-1.5">
              {shop.hours}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row mb-6 gap-3">
          <TouchableOpacity className="flex-1 bg-secondary-primary flex-row items-center justify-center py-3 rounded-xl gap-2">
            <Navigation size={18} color="#ffffff" />
            <Text className="text-white text-base font-semibold">Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white border border-secondary-primary flex-row items-center justify-center py-3 rounded-xl gap-2">
            <Phone size={18} color="#d86a2b" />
            <Text className="text-secondary-primary text-base font-semibold">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 bg-gray-50 items-center justify-center rounded-xl">
            <Heart size={20} color="#707070" />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 bg-gray-50 items-center justify-center rounded-xl">
            <Share2 size={20} color="#707070" />
          </TouchableOpacity>
        </View>

        {/* Featured Items */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-primary-text mb-3">
            Featured Items
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            {shop.featuredItems.map((item, index) => (
              <View key={index} className="w-30 mr-4">
                <Image source={{ uri: item.image }} className="w-30 h-20 rounded-xl mb-2" />
                <Text className="text-sm font-medium text-primary-text mb-0.5">
                  {item.name}
                </Text>
                <Text className="text-sm text-secondary-primary font-semibold">
                  {item.price}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Photo Gallery */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-primary-text mb-3">
            Photos
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            <Image source={{ uri: shop.image }} className="w-50 h-30 rounded-xl mr-3" />
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300' }} 
              className="w-50 h-30 rounded-xl mr-3" 
            />
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=300' }} 
              className="w-50 h-30 rounded-xl mr-3" 
            />
          </ScrollView>
        </View>

        {/* Reviews */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-primary-text">
              Top Reviews
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-sm text-secondary-primary font-medium">
                See all {shop.reviews.length}
              </Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          {shop.reviews.slice(0, 3).map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-gray-100">
              <View className="flex-row items-center mb-2">
                <Image source={{ uri: review.userImage }} className="w-10 h-10 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-primary-text mb-0.5">
                    {review.user}
                  </Text>
                  <View className="flex-row gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        color={i < review.rating ? "#FFD700" : "#E5E7EB"}
                        fill={i < review.rating ? "#FFD700" : "#E5E7EB"}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text className="text-sm text-accent-text leading-5">
                {review.comment}
              </Text>
            </View>
          ))}
        </View>

        {/* Menu Button */}
        <TouchableOpacity className="bg-secondary-primary py-4 rounded-xl items-center mb-6">
          <Text className="text-white text-base font-bold">
            View Full Menu
          </Text>
        </TouchableOpacity>

        {/* About Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-primary-text mb-3">
            About
          </Text>
          <Text className="text-sm text-accent-text leading-5 mb-4">
            {shop.description}
          </Text>
          
          <View className="gap-3">
            <TouchableOpacity className="flex-row items-center gap-2">
              <Phone size={16} color="#707070" />
              <Text className="text-sm text-accent-text">
                {shop.phone}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Globe size={16} color="#707070" />
              <Text className="text-sm text-accent-text">
                {shop.website}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-25" />
      </ScrollView>
    </Drawer>
  );
}