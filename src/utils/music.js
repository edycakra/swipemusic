/*
    creating a dummy api, music source is copyright-free from bensound.com
*/

const generateRandomColor = () => {
  let num = Math.random();
  let randomColor = "#" + (num.toString(16) + "000000").substring(2, 8); //random color generator
  return randomColor;
};

const MUSICS = [
  {
    id: 1,
    artist: "Benjamin Tissot",
    title: "Summer",
    musicURL: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
    color: generateRandomColor(),
  },
  {
    id: 2,
    artist: "Benjamin Tissot",
    title: "The Lounge",
    musicURL: "https://www.bensound.com/bensound-music/bensound-thelounge.mp3",
    color: generateRandomColor(),
  },
  {
    id: 3,
    artist: "Benjamin Tissot",
    title: "Hip Jazz",
    musicURL: "https://www.bensound.com/bensound-music/bensound-hipjazz.mp3",
    color: generateRandomColor(),
  },
];

console.log(MUSICS);
