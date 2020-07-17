import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { COLORS } from "../utils/colors";

export default function Home() {
  //mutable state
  const [state, setState] = useState({
    cardsPan: new Animated.ValueXY(),
    cardsStackedAnim: new Animated.Value(0),
    currentIndex: 0,
  });

  //declaring available states
  const { cardsPan, cardsStackedAnim, currentIndex } = state;

  //function to handle pan respond
  const cardsPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      cardsPan.setValue({ x: gestureState.dx, y: cardsPan.y });
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
      //translationX back to 0
      Animated.timing(cardsPan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      //interpolate values
      Animated.timing(cardsStackedAnim, { toValue: 1, duration: 300 }).start(
        () => {
          //reset to 0 when animation ends
          cardsStackedAnim.setValue(0);

          //increment the card postion after animation is ended
          setState({ ...state, currentIndex: currentIndex + 1 });
        }
      );
    },
  });

  //styling
  const lastCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 400,
    position: "absolute",
    zIndex: 1,
    bottom: 120,
    backgroundColor: COLORS[(currentIndex + 2) % 3],
    opacity: 0.3,
    transform: [{ scale: 0.8 }],
  };

  const midCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 400,
    position: "absolute",
    zIndex: 2,
    bottom: 60,
    backgroundColor: COLORS[(currentIndex + 1) % 3],
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  };

  const frontCardStyle = {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("screen").height - 400,
    position: "absolute",
    zIndex: 3,
    bottom: 0,
    backgroundColor: COLORS[currentIndex % 3],
    opacity: 1,
    transform: [{ translateX: cardsPan.x }, { scale: 1.0 }],
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
      <Animated.View {...cardsPanResponder.panHandlers} style={frontCardStyle}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {COLORS[0]}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    bottom: 150,
  },
});
