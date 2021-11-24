import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import PlacePicker from "../screens/PlacePickerScreen";
import { WeeklyForecast } from "../components/WeeklyForecast";

const HomeStack = createNativeStackNavigator();

export const HomeNavStack = () => {
  return (
    <HomeStack.Navigator
      options={{
        initialRouteName: "Home",
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={PlacePicker}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#241B3A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <HomeStack.Screen
        name="Forecast"
        component={WeeklyForecast}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#241B3A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <HomeStack.Screen
        name="Day Forecast"
        component={DetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#241B3A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
