import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export const DetailsScreen = () => {
  return (
    <SafeAreaView styles={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}> Details Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default DetailsScreen;
