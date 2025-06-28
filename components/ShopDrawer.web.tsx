import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
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
  X,
} from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.5;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.9;

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
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const isExpanded = useSharedValue(false);

  useEffect(() => {
    if (isVisible && shop) {
      translateY.value = withSpring(SCREEN_HEIGHT - DRAWER_HEIGHT, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, {
        damping: 20,
        stiffness: 90,
      });
    }
  }, [isVisible, shop]);

  const toggleExpanded = () => {
    if (isExpanded.value) {
      translateY.value = withSpring(SCREEN_HEIGHT - DRAWER_HEIGHT);
      isExpanded.value = false;
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT - EXPANDED_HEIGHT);
      isExpanded.value = true;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!shop) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Web-specific header with close button and expand toggle */}
      <View style={styles.webHeader}>
        <TouchableOpacity style={styles.expandButton} onPress={toggleExpanded}>
          <View style={styles.handle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={20} color="#707070" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleContainer}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.rating}>{shop.rating}</Text>
                <Text style={styles.reviewCount}>({shop.reviews.length} reviews)</Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: shop.isOpen ? '#10B981' : '#EF4444' }]}>
                <Text style={styles.statusText}>{shop.isOpen ? 'OPEN' : 'CLOSED'}</Text>
              </View>
              <Text style={styles.distance}>{shop.distance}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={14} color="#707070" />
            <Text style={styles.location}>{shop.location}</Text>
          </View>

          <View style={styles.hoursContainer}>
            <Clock size={14} color="#707070" />
            <Text style={styles.hours}>{shop.hours}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Navigation size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Phone size={18} color="#d86a2b" />
            <Text style={styles.secondaryButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Heart size={20} color="#707070" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 size={20} color="#707070" />
          </TouchableOpacity>
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredItems}>
            {shop.featuredItems.map((item, index) => (
              <View key={index} style={styles.featuredItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Photo Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoGallery}>
            <Image source={{ uri: shop.image }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300' }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=300' }} style={styles.galleryImage} />
          </ScrollView>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Reviews</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all {shop.reviews.length}</Text>
              <ChevronRight size={16} color="#d86a2b" />
            </TouchableOpacity>
          </View>
          {shop.reviews.slice(0, 3).map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.userImage }} style={styles.userImage} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.userName}>{review.user}</Text>
                  <View style={styles.reviewRating}>
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
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>View Full Menu</Text>
        </TouchableOpacity>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{shop.description}</Text>
          
          <View style={styles.contactInfo}>
            <TouchableOpacity style={styles.contactItem}>
              <Phone size={16} color="#707070" />
              <Text style={styles.contactText}>{shop.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Globe size={16} color="#707070" />
              <Text style={styles.contactText}>{shop.website}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  webHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  expandButton: {
    flex: 1,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f4f4f',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#707070',
    marginLeft: 4,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  distance: {
    fontSize: 14,
    color: '#707070',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#707070',
    marginLeft: 6,
    flex: 1,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    fontSize: 14,
    color: '#707070',
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#d86a2b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d86a2b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#d86a2b',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginBottom: 12,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#d86a2b',
    fontWeight: '500',
  },
  featuredItems: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  featuredItem: {
    width: 120,
    marginRight: 16,
  },
  itemImage: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4f4f4f',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#d86a2b',
    fontWeight: '600',
  },
  photoGallery: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  galleryImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f4f4f',
    marginBottom: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#707070',
    lineHeight: 20,
  },
  menuButton: {
    backgroundColor: '#d86a2b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#707070',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#707070',
  },
  bottomPadding: {
    height: 100,
  },
});