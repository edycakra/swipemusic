import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { COLORS } from "../utils/colors";

export default function Home() {
  const lastCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 200,
    position: "absolute",
    zIndex: 1,
    bottom: 120,
    backgroundColor: COLORS[2],
    opacity: 0.3,
    transform: [{ scale: 0.8 }],
  };

  const midCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 200,
    position: "absolute",
    zIndex: 2,
    bottom: 60,
    backgroundColor: COLORS[1],
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  };

  const frontCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 200,
    position: "absolute",
    zIndex: 3,
    bottom: 0,
    backgroundColor: COLORS[0],
    opacity: 1,
    transform: [{ scale: 1.0 }],
  };

  return (
    <View style={styles.container}>
      <View style={lastCardStyle}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {COLORS[2]}
        </Text>
      </View>
      <View style={midCardStyle}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {COLORS[1]}
        </Text>
      </View>
      <View style={frontCardStyle}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {COLORS[0]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    bottom: 50,
  },
});
