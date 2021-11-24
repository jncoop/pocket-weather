import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitiesScreen from "../screens/CitiesScreen";
import { CityPickerScreen } from "../screens/CityPickerScreen";
import { WeeklyForecast } from "../components/WeeklyForecast";
import DetailsScreen from "../screens/DetailsScreen";

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
      </CitiesStack.Group>
      <CitiesStack.Group screenOptions={{ presentation: "modal" }}>
        <CitiesStack.Screen
          name="Add city"
          component={CityPickerScreen}
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
      </CitiesStack.Group>
    </CitiesStack.Navigator>
  );
};
