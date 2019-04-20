const background = {
  layers: {
    ring: {
      element: document.getElementById('ring'),
      position: 0,
      speed: 5,
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
  }
}

export default background;