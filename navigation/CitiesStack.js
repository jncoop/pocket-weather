import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitiesScreen from "../screens/CitiesScreen";
import ForecastScreen from "../screens/ForecastScreen";
import PlacePicker from "../screens/PlacePickerScreen";

const CitiesStack = createNativeStackNavigator();

export const CitiesNavStack = () => {
  return (
    <CitiesStack.Navigator
      options={{
        initialRouteName: "Cities",
      }}
    >
      <CitiesStack.Screen
        name="Cities"
        component={CitiesScreen}
        options={{ headerShown: true }}
      />
      <CitiesStack.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{ headerShown: true }}
      />
      <CitiesStack.Screen
        name="Place Picker"
        component={PlacePicker}
        options={{ headerShown: true }}
      />
    </CitiesStack.Navigator>
  );
};
