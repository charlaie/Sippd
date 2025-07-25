import React, { useEffect, ReactNode } from 'react';
import { View, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_THRESHOLD = 100;

export interface DrawerState {
  hidden: number;
  half: number;
  full: number;
}

export interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  initialState?: 'half' | 'full';
  snapPoints?: {
    half?: number;
    full?: number;
  };
  enableGestures?: boolean;
  enableHaptics?: boolean;
  onStateChange?: (state: 'hidden' | 'half' | 'full') => void;
  className?: string;
}

export default function Drawer({
  isVisible,
  onClose,
  children,
  initialState = 'half',
  snapPoints = {},
  enableGestures = true,
  enableHaptics = true,
  onStateChange,
  className = '',
}: DrawerProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const currentState = useSharedValue<'hidden' | 'half' | 'full'>('hidden');

  // Calculate snap points
  const drawerState: DrawerState = {
    hidden: SCREEN_HEIGHT,
    half: SCREEN_HEIGHT - (snapPoints.half ? snapPoints.half * SCREEN_HEIGHT : SCREEN_HEIGHT * 0.5),
    full: SCREEN_HEIGHT - (snapPoints.full ? snapPoints.full * SCREEN_HEIGHT : SCREEN_HEIGHT * 0.9),
  };

  const triggerHaptic = () => {
    if (Platform.OS !== 'web' && enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const animateToState = (state: 'hidden' | 'half' | 'full', withHaptic = true) => {
    translateY.value = withSpring(drawerState[state], {
      damping: 20,
      stiffness: 90,
    });

    if (currentState.value !== state) {
      currentState.value = state;
      if (withHaptic) {
        runOnJS(triggerHaptic)();
      }
      if (onStateChange) {
        runOnJS(onStateChange)(state);
      }
    }

    if (state === 'hidden') {
      runOnJS(onClose)();
    }
  };

  useEffect(() => {
    if (isVisible) {
      animateToState(initialState, true);
    } else {
      animateToState('hidden', false);
    }
  }, [isVisible]);

  // Create gesture using the new Gesture API for better web compatibility
  const panGesture = Gesture.Pan()
    .enabled(enableGestures)
    .onStart(() => {
      'worklet';
      // Store initial state for gesture calculations
    })
    .onUpdate((event) => {
      'worklet';
      if (!enableGestures) return;

      const newY = drawerState[currentState.value] + event.translationY;

      // Constrain the movement
      if (newY < drawerState.full) {
        translateY.value = drawerState.full;
      } else if (newY > drawerState.hidden) {
        translateY.value = drawerState.hidden;
      } else {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      'worklet';
      if (!enableGestures) return;

      const currentY = translateY.value;
      const velocity = event.velocityY;
      const translation = event.translationY;
      const startState = currentState.value;

      // Check if half state is available
      const hasHalfState = snapPoints.half !== undefined;

      // Determine target position based on gesture
      let targetState: 'hidden' | 'half' | 'full';

      if (hasHalfState) {
        // Three-state logic (full, half, hidden)
        if (Math.abs(velocity) > 500) {
          // Fast gesture - prioritize velocity direction
          if (velocity > 0) {
            // Fast swipe down
            if (startState === 'full') {
              targetState = 'half';
            } else {
              targetState = 'hidden';
            }
          } else {
            // Fast swipe up
            if (startState === 'half') {
              targetState = 'full';
            } else {
              targetState = 'half';
            }
          }
        } else {
          // Slow gesture - use position and translation
          const midBetweenHalfAndFull = (drawerState.half + drawerState.full) / 2;
          const midBetweenHalfAndHidden = (drawerState.half + drawerState.hidden) / 2;

          if (currentY < midBetweenHalfAndFull) {
            // Closer to full
            targetState = 'full';
          } else if (currentY < midBetweenHalfAndHidden) {
            // Closer to half
            targetState = 'half';
          } else {
            // Closer to hidden
            targetState = 'hidden';
          }

          // Override based on translation direction if significant
          if (Math.abs(translation) > SNAP_THRESHOLD) {
            if (translation > 0 && startState === 'full') {
              // Dragged down from full
              targetState = 'half';
            } else if (translation > 0 && startState === 'half') {
              // Dragged down from half
              targetState = 'hidden';
            } else if (translation < 0 && startState === 'half') {
              // Dragged up from half
              targetState = 'full';
            }
          }
        }
      } else {
        // Two-state logic (full, hidden only)
        if (Math.abs(velocity) > 500) {
          // Fast gesture - prioritize velocity direction
          if (velocity > 0) {
            // Fast swipe down - go to hidden
            targetState = 'hidden';
          } else {
            // Fast swipe up - go to full
            targetState = 'full';
          }
        } else {
          // Slow gesture - use position and translation
          const midBetweenFullAndHidden = (drawerState.full + drawerState.hidden) / 2;

          if (currentY < midBetweenFullAndHidden) {
            // Closer to full
            targetState = 'full';
          } else {
            // Closer to hidden
            targetState = 'hidden';
          }

          // Override based on translation direction if significant
          if (Math.abs(translation) > SNAP_THRESHOLD) {
            if (translation > 0) {
              // Dragged down - go to hidden
              targetState = 'hidden';
            } else {
              // Dragged up - go to full
              targetState = 'full';
            }
          }
        }
      }

      runOnJS(animateToState)(targetState, true);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    const opacity =
      1 - (translateY.value - drawerState.full) / (drawerState.hidden - drawerState.full);
    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      pointerEvents: translateY.value >= drawerState.hidden ? 'none' : 'auto',
    };
  });

  const handleOverlayPress = () => {
    if (enableGestures) {
      animateToState('hidden', true);
    }
  };
  return (
    <>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={[
            overlayAnimatedStyle,
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            },
          ]}
          className="bg-black/50"
        />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: SCREEN_HEIGHT,
            zIndex: 999,
          },
        ]}
        className={`rounded-t-2xl bg-white shadow-2xl ${className}`}>
        {enableGestures && (
          <GestureDetector gesture={panGesture}>
            <Animated.View className="items-center py-3">
              <View className="h-1 w-10 rounded-full bg-gray-300" />
            </Animated.View>
          </GestureDetector>
        )}

        {children}
      </Animated.View>
    </>
  );
}

// Export utility functions for external control
export const useDrawerControl = () => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const currentState = useSharedValue<'hidden' | 'half' | 'full'>('hidden');

  const animateTo = (state: 'hidden' | 'half' | 'full', snapPoints: DrawerState) => {
    translateY.value = withSpring(snapPoints[state], {
      damping: 20,
      stiffness: 90,
    });
    currentState.value = state;
  };

  return {
    translateY,
    currentState,
    animateTo,
  };
};
