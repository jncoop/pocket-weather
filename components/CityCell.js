import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import cellActiveArr from "../assets/cell-arrow-pri.png";
import Swipeable from "react-native-gesture-handler/Swipeable";

export const CityCell = ({ item, place, deleteCallback }) => {
  const navigation = useNavigation(); // navigation hook

  const swipeRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={{
          backgroundColor: "red",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            marginLeft: "auto",
            marginRight: 50,
            fontSize: 15,
            fontWeight: "bold",
            transform: [{ scale }],
          }}
        >
          Delete City
        </Animated.Text>
      </Animated.View>
    );
  };

  const height = new Animated.Value(70);
  const animatedDelete = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start(() => deleteCallback(item));
  };

  return (
    <Swipeable
      renderRightActions={swipeRight}
      rightThreshold={-200}
      onSwipeableOpen={animatedDelete}
    >
      <Animated.View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("Forecast", { location: item })}
        >
          <View style={styles.placeContainer}>
            <Text style={styles.placeText}>{place}</Text>
          </View>
          <Image style={styles.cellArr} source={cellActiveArr} />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
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
