import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ForecastScreen from "../screens/ForecastScreen";
import DetailsScreen from "../screens/DetailsScreen";
import PlacePicker from "../screens/PlacePickerScreen";

const HomeStack = createNativeStackNavigator();

export const HomeNavStack = () => {
  return (
    <HomeStack.Navigator
      options={{
        initialRouteName: "Home",
      }}
    >
      <HomeStack.Group>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <HomeStack.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{ headerShown: true }}
        />
        <HomeStack.Screen
          name="Forecast Details"
          component={DetailsScreen}
          options={{ headerShown: true }}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ presentation: "modal" }}>
        <HomeStack.Screen
          name="Place Picker"
          component={PlacePicker}
          options={{ headerShown: true }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};
