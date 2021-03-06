import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavStack } from "./HomeStack";
import { CitiesNavStack } from "./CitiesStack";
import { StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export const TabNavigator = () => {
  const BottomNavigator = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarHideOnKeyboard: "true",
        }}
      >
        <BottomNavigator.Screen
          name="HomeTab"
          component={HomeNavStack}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name={"home"} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FF4438",
            tabBarInactiveTintColor: "#ffffff",
          }}
        />
        <BottomNavigator.Screen
          name="CitiesTab"
          component={CitiesNavStack}
          options={{
            tabBarLabel: "Cities",
            headerShown: false,
            tabBarIcon: ({ size, color }) => {
              return <Ionicons name={"star"} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FF4438",
            tabBarInactiveTintColor: "#ffffff",
          }}
        />
      </BottomNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#241B3A",
  },
});
