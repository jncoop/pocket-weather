import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavStack } from "./HomeStack";
import { CitiesNavStack } from "./CitiesStack";
import { Image, StyleSheet } from "react-native";
import homeIcon from "../assets/hometab.png";
import citiesIcon from "../assets/citiestab.png";
import Ionicons from "react-native-vector-icons/Ionicons";

export const TabNavigator = () => {
  const BottomNavigator = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
        }}
      >
        <BottomNavigator.Screen
          name="HomeTab"
          component={HomeNavStack}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
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
            tabBarIcon: ({ focused, size, color }) => {
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
