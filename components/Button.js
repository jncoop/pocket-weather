import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

//returns full width button with text and background orange
const FullButton = ({ text, callBack }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={callBack}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FF4438",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default FullButton;
