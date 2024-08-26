const riddles = [
  {
    question:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "M",
  },
  {
    question: "What gets wetter as it dries?",
    answer: "Towel",
  },
  {
    question: "What has keys but can't open locks?",
    answer: "Piano",
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    answer: "Clock",
  },
  {
    question: "What goes up but never comes down?",
    answer: "Age",
  },
  {
    question: "What has many teeth but can't bite?",
    answer: "Comb",
  },
  {
    question: "What has to be broken before you can use it?",
    answer: "Egg",
  },
  {
    question: "What has a head and a tail but no body?",
    answer: "Coin",
  },
  {
    question: "What has an eye but cannot see?",
    answer: "Needle",
  },
  {
    question: "What is made of water but if you put it into water it will die?",
    answer: "Ice",
  },
];

function getRiddle() {
  const randomIndex = Math.floor(Math.random() * riddles.length);
  return riddles[randomIndex];
}

module.exports = getRiddle;
