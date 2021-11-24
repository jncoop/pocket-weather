import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import cellActiveArr from "../assets/cell-arrow-pri.png";

//returns cell showing city item with name and detail arrow
export const CityCell = ({ city }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Forecast", { location: city })}
    >
      <View style={styles.placeContainer}>
        <Text style={styles.placeText}>{city.name + ", " + city.country}</Text>
      </View>
      <Image style={styles.cellArr} source={cellActiveArr} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
    alignItems: "center",
    padding: 8,
  },
  placeContainer: {
    flex: 1,
    flexDirection: "row",
  },
  placeText: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  cellArr: {
    flexDirection: "column",
    marginRight: 8,
    marginLeft: 8,
  },
});
