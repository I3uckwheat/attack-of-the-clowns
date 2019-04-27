class ScoreTracker {
  constructor() {
    this.currentScore = 0;

    this.gainingScore = false;
    this.scoreIncrementInterval = setInterval(() => {
      if(this.gainingScore) this.currentScore += Math.floor(Math.random() * 200);
    }, 1000);
  }

  gainPoints(type) {
    switch(type) {
      case 'enemy-killed':
        this.currentScore += 1000;
        break;
      default:
        break;
    }
  }
}

export default ScoreTracker;