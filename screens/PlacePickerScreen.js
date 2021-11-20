import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export const PlacePickerScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}> Place Picker Screen</Text>
      </View>
    </SafeAreaView>
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

export default PlacePickerScreen;
