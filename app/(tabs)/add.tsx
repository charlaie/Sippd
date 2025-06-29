import React from 'react';
import { View } from 'react-native';
import Drawer from '../../components/Drawer';
import DrinkLogForm from '../../components/DrinkLogForm';
import { useUIStore } from '../../store/uiStore';

export default function AddPage() {
  const { isDrinkLogDrawerVisible, closeDrinkLogDrawer } = useUIStore();

  return (
    <View className="flex-1">
      <Drawer
        isVisible={isDrinkLogDrawerVisible}
        onClose={closeDrinkLogDrawer}
        initialState="full"
        snapPoints={{
          half: 0.6,
          full: 0.95,
        }}
        enableGestures={true}
        enableHaptics={true}
      >
        <DrinkLogForm />
      </Drawer>
    </View>
  );
}