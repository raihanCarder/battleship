export default class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    return this.length <= this.timesHit;
  }
}
