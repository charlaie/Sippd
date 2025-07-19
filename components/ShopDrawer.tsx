import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
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
  featuredItems: {
    name: string;
    price: string;
    image: string;
  }[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    userImage: string;
  }[];
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
      enableHaptics={true}>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-5">
          <View className="mb-2 flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="mb-1 text-2xl font-bold text-primary-text">{shop.name}</Text>
              <View className="flex-row items-center">
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text className="ml-1 text-sm font-semibold text-primary-text">{shop.rating}</Text>
                <Text className="ml-1 text-sm text-accent-text">
                  ({shop.reviews.length} reviews)
                </Text>
              </View>
            </View>
            <View className="items-end">
              <View
                className={`mb-1 rounded-xl px-2 py-1 ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                <Text className="text-xs font-bold text-white">
                  {shop.isOpen ? 'OPEN' : 'CLOSED'}
                </Text>
              </View>
              <Text className="text-sm text-accent-text">{shop.distance}</Text>
            </View>
          </View>

          <View className="mb-1 flex-row items-center">
            <MapPin size={14} color="#707070" />
            <Text className="ml-1.5 flex-1 text-sm text-accent-text">{shop.location}</Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={14} color="#707070" />
            <Text className="ml-1.5 text-sm text-accent-text">{shop.hours}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-6 flex-row gap-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-secondary-primary py-3">
            <Navigation size={18} color="#ffffff" />
            <Text className="text-base font-semibold text-white">Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-secondary-primary bg-white py-3">
            <Phone size={18} color="#d86a2b" />
            <Text className="text-base font-semibold text-secondary-primary">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
            <Heart size={20} color="#707070" />
          </TouchableOpacity>
          <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
            <Share2 size={20} color="#707070" />
          </TouchableOpacity>
        </View>

        {/* Featured Items */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-bold text-primary-text">Featured Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            {shop.featuredItems.map((item, index) => (
              <View key={index} className="w-30 mr-4">
                <Image source={{ uri: item.image }} className="w-30 mb-2 h-20 rounded-xl" />
                <Text className="mb-0.5 text-sm font-medium text-primary-text">{item.name}</Text>
                <Text className="text-sm font-semibold text-secondary-primary">{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Photo Gallery */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-bold text-primary-text">Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            <Image source={{ uri: shop.image }} className="w-50 h-30 mr-3 rounded-xl" />
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              className="w-50 h-30 mr-3 rounded-xl"
            />
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              className="w-50 h-30 mr-3 rounded-xl"
            />
          </ScrollView>
        </View>

        {/* Reviews */}
        <View className="mb-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary-text">Top Reviews</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-sm font-medium text-secondary-primary">
                See all {shop.reviews.length}
              </Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          {shop.reviews.slice(0, 3).map((review) => (
            <View key={review.id} className="mb-4 border-b border-gray-100 pb-4">
              <View className="mb-2 flex-row items-center">
                <Image source={{ uri: review.userImage }} className="mr-3 h-10 w-10 rounded-full" />
                <View className="flex-1">
                  <Text className="mb-0.5 text-sm font-semibold text-primary-text">
                    {review.user}
                  </Text>
                  <View className="flex-row gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        color={i < review.rating ? '#FFD700' : '#E5E7EB'}
                        fill={i < review.rating ? '#FFD700' : '#E5E7EB'}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text className="text-sm leading-5 text-accent-text">{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Menu Button */}
        <TouchableOpacity className="mb-6 items-center rounded-xl bg-secondary-primary py-4">
          <Text className="text-base font-bold text-white">View Full Menu</Text>
        </TouchableOpacity>

        {/* About Section */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-bold text-primary-text">About</Text>
          <Text className="mb-4 text-sm leading-5 text-accent-text">{shop.description}</Text>

          <View className="gap-3">
            <TouchableOpacity className="flex-row items-center gap-2">
              <Phone size={16} color="#707070" />
              <Text className="text-sm text-accent-text">{shop.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-2">
              <Globe size={16} color="#707070" />
              <Text className="text-sm text-accent-text">{shop.website}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-25" />
      </ScrollView>
    </Drawer>
  );
}
