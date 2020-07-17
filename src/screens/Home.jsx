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
      Animated.timing(cardsStackedAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        //reset to 0 when animation ends
        cardsStackedAnim.setValue(0);

        //increment the card position after animation is ended
        setState({ ...state, currentIndex: currentIndex + 1 });
      });
    },
  });

  //styling
  const lastCardStyle = {
    width: 300,
    height: 300,
    position: "absolute",
    zIndex: 1,
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 20],
    }),
    backgroundColor: COLORS[(currentIndex + 2) % 3],
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.6],
    }),
    transform: [
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 0.9],
        }),
      },
    ],
  };

  const midCardStyle = {
    width: 300,
    height: 300,
    position: "absolute",
    zIndex: 2,
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }),
    backgroundColor: COLORS[(currentIndex + 1) % 3],
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1],
    }),
    transform: [
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.0],
        }),
      },
    ],
  };

  const frontCardStyle = {
    width: 300,
    height: 300,
    position: "absolute",
    zIndex: cardsStackedAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [3, 2, 0],
    }),
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40],
    }),
    backgroundColor: COLORS[currentIndex % 3],
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.3],
    }),
    transform: [
      { translateX: cardsPan.x },
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={lastCardStyle}>
        <Text style={styles.textStyle}>{COLORS[(currentIndex + 2) % 3]}</Text>
      </Animated.View>
      <Animated.View style={midCardStyle}>
        <Text style={styles.textStyle}>{COLORS[(currentIndex + 1) % 3]}</Text>
      </Animated.View>
      <Animated.View {...cardsPanResponder.panHandlers} style={frontCardStyle}>
        <Text style={styles.textStyle}>{COLORS[currentIndex % 3]}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    bottom: 150,
  },
  textStyle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
