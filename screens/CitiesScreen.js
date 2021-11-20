import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const CitiesScreen = () => {
  return (
    <SafeAreaView styles={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}> Cities Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CitiesScreen;
