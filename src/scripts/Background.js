const background = {
  layers: {
    ring: {
      element: document.getElementById('playableArea'),
      position: 0,
      speed: 5,
    },
    crowd: {
      element: document.getElementById('background'),
      position: 0,
      speed: 4,
    },
  }, 
  right: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position + layer.speed);   
    });
  },
  left: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position - layer.speed);   
    });
  },
  draw: function() {
    this.layers.ring.element.style.backgroundPositionX = this.layers.ring.position + 'px';
    this.layers.crowd.element.style.backgroundPositionX = this.layers.crowd.position + 'px';
  }
}

export default background;