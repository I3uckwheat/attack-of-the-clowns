class ScoreTracker {
  constructor() {
    this.currentScore = 0;
    this.enemiesKilled = 0;

    this.savedScores = [];
    if(localStorage.getItem('scores')) {
      this.savedScores = JSON.parse(localStorage.getItem('scores'));
    }

    this.gainingScore = false;
    this.onScoreUpdateCallbacks = [];
    this.scoreIncrementInterval = setInterval(() => {
      if(this.gainingScore) {
        this.currentScore += Math.floor(Math.random() * 3 + 1);
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
    this.saveScore();
  }

  saveScore() {
    this.savedScores.push({
      score: this.currentScore,
      enemiesKilled: this.enemiesKilled
    });

    this.savedScores.sort((firstEl, secondEl) => {
      return firstEl.score < secondEl.score;
    });

    this.savedScores = this.savedScores.slice(0, 2);

    localStorage.setItem('scores', JSON.stringify(this.savedScores));
  }

}

export default ScoreTracker;