import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import { MUSICS } from "../utils/music";
import { Audio } from "expo-av";

export default function Home() {
  //mutable state
  const [state, setState] = useState({
    allSongs: MUSICS,
    cardsPan: new Animated.ValueXY(),
    cardsStackedAnim: new Animated.Value(0),
    currentIndex: 0,
    currentSong: {},
    soundInstance: null, //to store the sound instance, reusable for playing/pausing music
  });

  //declaring available states
  const {
    cardsPan,
    cardsStackedAnim,
    currentIndex,
    allSongs,
    currentSong,
    soundInstance,
  } = state;

  //function to handle music playing,the pauseAsync() is in function cardsPanResponder
  const playMusic = async (input) => {
    try {
      if (soundInstance) soundInstance.pauseAsync();
      const { sound } = await Audio.Sound.createAsync(
        { uri: input.musicURL },
        { shouldPlay: true, isLooping: false, volume: 1.0 }
      );
      await setState({ ...state, soundInstance: sound }); //set the sundInstance
      await sound.playAsync(); //play the sound
      console.log(`"${currentSong.title}" is playing!`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setState({ ...state, currentSong: allSongs[currentIndex % 3] });
  }, [currentIndex]);

  useEffect(() => {
    playMusic(currentSong);
  }, [currentSong]);

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

        //pause music
        soundInstance.pauseAsync();
        //increment the card position after animation is ended
        setState({ ...state, currentIndex: currentIndex + 1 });
      });
    },
  });

  //styling
  const lastCardStyle = {
    width: 300,
    height: 350,
    position: "absolute",
    zIndex: 1,
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 40],
    }),
    backgroundColor: allSongs[(currentIndex + 2) % 3].color,
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0.8],
    }),
    transform: [
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 0.8],
        }),
      },
    ],
  };

  const midCardStyle = {
    width: 300,
    height: 350,
    position: "absolute",
    zIndex: 2,
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0],
    }),
    backgroundColor: allSongs[(currentIndex + 1) % 3].color,
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }),
    transform: [
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.0],
        }),
      },
    ],
  };

  const frontCardStyle = {
    width: 300,
    height: 350,
    position: "absolute",
    zIndex: cardsStackedAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [3, 2, 0],
    }),
    bottom: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80],
    }),
    backgroundColor: allSongs[currentIndex % 3].color,
    opacity: cardsStackedAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.6],
    }),
    transform: [
      { translateX: cardsPan.x },
      {
        scale: cardsStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.6],
        }),
      },
    ],
  };

  //dynamic text color to bring contrast with its respective background
  const textFrontColor = {
    color:
      parseInt(currentSong.color.replace("#", ""), 16) > 0xffffff / 1.1
        ? "#000000"
        : "#ffffff",
  };

  return (
    <View style={styles.container}>
      <Animated.View style={lastCardStyle}>
        <Text style={styles.artistText}>
          {allSongs[(currentIndex + 2) % 3].artist}
        </Text>
        <Text style={styles.titleText}>
          {allSongs[(currentIndex + 2) % 3].title}
        </Text>
        <Text style={styles.contentText}>
          {allSongs[(currentIndex + 2) % 3].album}
        </Text>
      </Animated.View>
      <Animated.View style={midCardStyle}>
        <Text style={styles.artistText}>
          {allSongs[(currentIndex + 1) % 3].artist}
        </Text>
        <Text style={styles.titleText}>
          {allSongs[(currentIndex + 1) % 3].title}
        </Text>
        <Text style={styles.contentText}>
          {allSongs[(currentIndex + 1) % 3].album}
        </Text>
      </Animated.View>
      <Animated.View {...cardsPanResponder.panHandlers} style={frontCardStyle}>
        <Text style={[styles.artistText, textFrontColor]}>
          {allSongs[currentIndex % 3].artist}
        </Text>
        <Text style={[styles.titleText, textFrontColor]}>
          {allSongs[currentIndex % 3].title}
        </Text>
        <Text style={[styles.contentText, textFrontColor]}>
          ({allSongs[currentIndex % 3].album})
        </Text>
        <Image
          style={{
            height: 300,
            width: 300,
            borderRadius: 10,
            left: 20,
            top: 20,
          }}
          source={{ uri: currentSong.coverURL }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    bottom: 250,
  },
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
