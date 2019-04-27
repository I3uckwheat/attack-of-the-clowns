class ScoreTracker {
  constructor() {
    this.currentScore = 0;
    this.enemiesKilled = 0;

    this.gainingScore = false;
    this.onScoreUpdateCallbacks = [];
    this.scoreIncrementInterval = setInterval(() => {
      if(this.gainingScore) {
        this.currentScore += Math.floor(Math.random() * 50 + 1);
        this.scoreUpdated();
      }
    }, 1000);
  }

  killedEnemy() {
    this.currentScore += Math.floor(Math.random() * 200 + 201);
    this.enemiesKilled++;
    this.scoreUpdated();
  }

  onScoreUpdate(callback) {
    this.onScoreUpdateCallbacks.push(callback);
  }

  scoreUpdated() {
    this.onScoreUpdateCallbacks.forEach(cb => cb(this.currentScore));
  }

  startTracking() {
    this.gainingScore = true;
  }

  endTracking() {
    this.gainingScore = false;
  }
}

export default ScoreTracker;