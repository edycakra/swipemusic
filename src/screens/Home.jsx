import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";
import { MUSICS } from "../utils/music";
import { Audio } from "expo-av";
import AlbumCover from "../components/AlbumCover";
import Card from "../components/Card";

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
      await setState({ ...state, soundInstance: sound }); //set the soundInstance
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

  //general styles
  const { container, generalCardStyle } = styles;

  return (
    <View style={container}>
      <Animated.View style={[generalCardStyle, lastCardStyle]}>
        <Card ArtistInfo={allSongs[(currentIndex + 2) % 3]} />
      </Animated.View>
      <Animated.View style={[generalCardStyle, midCardStyle]}>
        <Card ArtistInfo={allSongs[(currentIndex + 1) % 3]} />
      </Animated.View>
      <Animated.View
        {...cardsPanResponder.panHandlers}
        style={[generalCardStyle, frontCardStyle]}
      >
        <Card ArtistInfo={allSongs[currentIndex % 3]} />
        <AlbumCover coverURL={currentSong.coverURL} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    bottom: 250,
  },
  generalCardStyle: {
    width: 300,
    height: 350,
    position: "absolute",
  },
});
