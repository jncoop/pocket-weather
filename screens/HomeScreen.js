import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}> Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default HomeScreen;
