import { Tabs } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { Chrome as Home, Search, Plus, Map, User } from 'lucide-react-native';
import { useUIStore } from '@/store/uiStore';
import Drawer from '@/components/Drawer';
import DrinkLogForm from '@/components/DrinkLogForm';

export default function TabLayout() {
  const { isDrinkLogDrawerVisible, openDrinkLogDrawer, closeDrinkLogDrawer } = useUIStore();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#d86a2b',
          tabBarInactiveTintColor: '#707070',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: '',
            tabBarIcon: ({ size, color }) => (
              <Plus size={32} color="#ffffff" strokeWidth={2} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity 
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onPress={openDrinkLogDrawer}
                activeOpacity={0.7}
              >
                <View style={{ 
                  width: 56, 
                  height: 56, 
                  backgroundColor: '#d86a2b', 
                  borderRadius: 28, 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                  <Plus size={24} color="#ffffff" strokeWidth={2} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="track"
          options={{
            title: 'Track',
            tabBarIcon: ({ size, color }) => (
              <Map size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>

      {/* Global Drawer - renders on top of all tabs */}
      <Drawer
        isVisible={isDrinkLogDrawerVisible}
        onClose={closeDrinkLogDrawer}
        initialState="full"
        snapPoints={{
          full: 0.95,
        }}
        enableGestures={true}
        enableHaptics={true}
      >
        <DrinkLogForm />
      </Drawer>
    </>
  );
}