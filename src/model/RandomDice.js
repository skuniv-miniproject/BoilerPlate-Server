class RandomDice {
  //생성자 생성
  constructor(numSide) {
    this.numSide = numSide;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSide);
  }

  roll({ numRolls }) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

module.exports = RandomDice;
