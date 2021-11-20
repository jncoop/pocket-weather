import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const ForecastScreen = () => {
  return (
    <SafeAreaView styles={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}> Forecast Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default ForecastScreen;
