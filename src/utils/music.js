/*
    creating a dummy api, music source is copyright-free from INTERNET ARCHIVE https://archive.org/
*/

//random color generator
const generateRandomColor = () => {
  let num = Math.random();
  let randomColor = "#" + (num.toString(16) + "000000").substring(2, 8); //random color generator
  return randomColor;
};

export const MUSICS = [
  {
    id: 1,
    artist: "Whitney Houston",
    album: "Whitney",
    title: "I Wanna Dance With Somebody",
    musicURL:
      "https://ia800300.us.archive.org/4/items/whitneysoundreco00hous/01_I_Wanna_Dance_With_Somebody__Who_Loves_Me__sample.mp3",
    coverURL:
      "https://ia800300.us.archive.org/4/items/whitneysoundreco00hous/whitneysoundreco00hous_itemimage.jpg",
    color: generateRandomColor(),
  },
  {
    id: 2,
    artist: "Fleetwood Mac",
    album: "Rumours",
    title: "The Chain",
    musicURL:
      "https://ia800907.us.archive.org/11/items/rumourssoundreco00flee/07_The_Chain_sample.mp3",
    coverURL:
      "https://ia800907.us.archive.org/11/items/rumourssoundreco00flee/rumourssoundreco00flee_itemimage.jpg",
    color: generateRandomColor(),
  },
  {
    id: 3,
    artist: "Elton John",
    album: "Elton John",
    title: "Your Song",
    musicURL:
      "https://ia803104.us.archive.org/22/items/lp_elton-john_elton-john/disc1/01.01.%20Your%20Song_sample.mp3",
    coverURL:
      "https://ia803104.us.archive.org/22/items/lp_elton-john_elton-john/lp_elton-john_elton-john_itemimage.png",
    color: generateRandomColor(),
  },
];

// console.log(MUSICS);
