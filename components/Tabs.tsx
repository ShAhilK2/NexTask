import { withLayoutContext } from "expo-router";
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationOptions,
  NativeBottomTabNavigationEventMap,
} from "@bottom-tabs/react-navigation";

// Create the Bottom Tab Navigator
const { Navigator } = createNativeBottomTabNavigator();

// Wrap the Navigator with `expo-router`'s Layout Context
export const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof Navigator,
  any,
  NativeBottomTabNavigationEventMap
>(Navigator);
