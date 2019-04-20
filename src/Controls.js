class Controls {
  constructor(controls) {
    this.controls = controls;

    this.controlState = Object.values(this.controls).reduce((acc, controlName) => {
      acc[controlName] = 0;
      return acc;
    }, {undefined: 0});

    // Add event listeners for keys
    document.addEventListener('keydown', event => {
      this.controlState[this.controls[event.code]] = 1;
    });
    document.addEventListener('keyup', event => {
      this.controlState[this.controls[event.code]] = 0;
    });
  }

  isPressed(control) {
    return this.controlState[control];
  }
}

export default Controls;
