import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FrontCard(props) {
  const { artist, title, album, color } = props.ArtistInfo;

  //dynamic text color to bring contrast with its respective card's background color
  const textFrontColor = {
    color:
      parseInt(color.replace("#", ""), 16) > 0xffffff / 1.1
        ? "#000000"
        : "#ffffff",
  };

  //general styles
  const { artistText, titleText, contentText } = styles;

  return (
    <View>
      <Text style={[artistText, textFrontColor]}>{artist}</Text>
      <Text style={[titleText, textFrontColor]}>{title}</Text>
      <Text style={[contentText, textFrontColor]}>({album})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  artistText: {
    paddingHorizontal: 20,
    color: "#000",
    fontSize: 30,
    fontWeight: "normal",
    top: 20,
  },
  titleText: {
    paddingHorizontal: 20,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    top: 20,
  },
  contentText: {
    paddingHorizontal: 20,
    color: "#000",
    fontSize: 18,
    top: 20,
  },
});
