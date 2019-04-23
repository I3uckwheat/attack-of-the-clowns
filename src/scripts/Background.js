const background = {
  layers: {
    ring: {
      element: document.getElementById('playableArea'),
      position: 0,
      speed: 5,
      reset: 520,
    },
    crowd: {
      element: document.getElementById('background'),
      position: 0,
      speed: 4,
      reset: 520,
    },
  }, 
  right: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position + layer.speed) % layer.reset;   
    });
  },
  left: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position - layer.speed) % layer.reset;   
    });
  },
  draw: function() {
    this.layers.ring.element.style.backgroundPositionX = this.layers.ring.position + 'px';
    this.layers.crowd.element.style.backgroundPositionX = this.layers.ring.position + 'px';
  }
}

export default background;