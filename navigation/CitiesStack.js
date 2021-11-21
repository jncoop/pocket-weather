import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitiesScreen from "../screens/CitiesScreen";
import ForecastScreen from "../screens/ForecastScreen";
import PlacePicker from "../screens/PlacePickerScreen";
import { CityPickerScreen } from "../screens/CityPickerScreen";
import { WeeklyForecast } from "../components/WeeklyForecast";

const CitiesStack = createNativeStackNavigator();

export const CitiesNavStack = () => {
  return (
    <CitiesStack.Navigator
      options={{
        initialRouteName: "Cities",
      }}
    >
      <CitiesStack.Group>
        <CitiesStack.Screen
          name="Cities"
          component={CitiesScreen}
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
        <CitiesStack.Screen
          name="Forecast"
          component={WeeklyForecast}
          options={{ headerShown: true }}
        />
      </CitiesStack.Group>
      <CitiesStack.Group screenOptions={{ presentation: "modal" }}>
        <CitiesStack.Screen
          name="City Picker"
          component={CityPickerScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#241B3A",
            },
          }}
        />
      </CitiesStack.Group>
    </CitiesStack.Navigator>
  );
};
