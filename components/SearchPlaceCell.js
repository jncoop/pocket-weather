import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import cellActiveArr from "../assets/cell-arrow-sec.png";

export const SearchPlaceCell = ({ item, callBack }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => callBack(item)}>
      <View style={styles.placeContainer}>
        <Text style={styles.placeText}>{item.name + ", " + item.country}</Text>
      </View>
      <Image style={styles.cellArr} source={cellActiveArr} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
    alignItems: "center",
  },
  placeContainer: {
    flex: 1,
    flexDirection: "row",
  },
  placeText: {
    paddingTop: 24,
    paddingBottom: 24,
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  cellArr: {
    flexDirection: "column",
    marginRight: 8,
    marginLeft: 8,
  },
});
