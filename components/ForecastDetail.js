import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export const ForecastDetail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Forecast Detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
});
