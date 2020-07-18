import React from "react";
import { Image, StyleSheet } from "react-native";

export default function AlbumCover(props) {
  const { coverURL } = props;
  const { coverStyle } = styles;
  return <Image style={coverStyle} source={{ uri: coverURL }} />;
}

const styles = StyleSheet.create({
  coverStyle: {
    height: 300,
    width: 300,
    borderRadius: 10,
    left: 20,
    top: 20,
  },
});
