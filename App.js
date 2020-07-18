import Constants from "expo-constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
console.disableYellowBox = true;

export default function App() {
  const { container, textStyle } = styles;
  return (
    <View style={container}>
      <View>
        <Text style={textStyle}>
          <MaterialCommunityIcons
            name="music-box-outline"
            size={30}
            color="#ffffff"
          />
          &nbsp;SwipeMusic
        </Text>
      </View>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: { color: "#fff", fontSize: 40, paddingTop: 60 },
});
