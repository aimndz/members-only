const riddles = [
    {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        answer: "M"
    },
    {
        question: "What gets wetter as it dries?",
        answer: "Towel"
    },
    {
        question: "What has keys but can't open locks?",
        answer: "Piano"
    },
]

function getRiddle() {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    return riddles[randomIndex];
}


module.exports = getRiddle;