<template>
  <div>
    <h1>PTG</h1>
    <div class="canvas-container">
      <div ref="p5Container"></div>
    </div>
    <div class="controller-space">
      <input type="number" v-model.number="numSquares" placeholder="Number of Squares" @change="setupP5" />
      <button @click="randomize">Randomize</button>
      <button @click="toggleNumbers">Show Numbers</button>
    </div>
  </div>
</template>

<script>
import p5 from 'p5';

export default {
  name: 'PTG',
  data() {
    return {
      numSquares: 100, // Default number of squares along one side
      showNumbers: false,
      p5Instance: null,
    };
  },
  mounted() {
    this.setupP5();
  },
  methods: {
    setupP5() {
      if (this.p5Instance) {
        this.p5Instance.remove(); // Remove previous instance if it exists
      }
      this.p5Instance = new p5(this.sketch);
    },
    sketch(p) {
      let squareSize;
      let noiseScale = 0.15; // Scale for noise

      p.setup = () => {
        p.createCanvas(500, 500);
        p.noLoop(); // Prevent continuous redrawing
      };

      p.draw = () => {
        squareSize = p.width / this.numSquares; // Calculate size of each square
        for (let x = 0; x < this.numSquares; x++) {
          for (let y = 0; y < this.numSquares; y++) {
            let noiseValue = p.noise(x * noiseScale, y * noiseScale); // Get Perlin noise value
            let value = Math.floor(noiseValue * 3) - 1; // Scale to -1, 0, 1

            // Set fill color based on value
            let fillColor;
            switch (value) {
              case 1:
                fillColor = 'grey';
                break;
              case 0:
                fillColor = '#204f0d';
                break;
              case -1:
                fillColor = '#593e26';
                break;
              default:
                fillColor = 'white';
            }

            p.fill(fillColor);
            p.rect(x * squareSize, y * squareSize, squareSize, squareSize); // Draw filled square

            // Draw numbers if enabled
            if (this.showNumbers) {
              p.fill('black');
              p.textAlign(p.CENTER, p.CENTER);
              p.textSize(squareSize * 0.4);
              p.text(value, x * squareSize + squareSize / 2, y * squareSize + squareSize / 2);
            }
          }
        }
      },
      p.mousePressed = () => {
        this.toggleNumbers(); // Toggle numbers on mouse press
      };
    },
    toggleNumbers() {
      this.showNumbers = !this.showNumbers;
      if (this.p5Instance) {
        this.p5Instance.redraw(); // Redraw the canvas
      }
    },
    randomize() {
      this.setupP5(); // Reinitialize the p5 instance
    },
  },
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center; /* Center the canvas horizontally */
  margin-bottom: 10px; /* Space between canvas and controller space */
}

.controller-space {
  display: flex; /* Use flexbox for layout */
  justify-content: space-around; /* Space items evenly */
  align-items: center; /* Center items vertically */
  margin-top: 10px; /* Add some space above the controller space */
}

h1 {
  margin: 0; /* Remove default margin */
}

button {
  padding: 5px 10px; /* Add padding to buttons */
  font-size: 16px; /* Increase font size for better readability */
}

input {
  margin-top: 10px; /* Add some space above the input */
  padding: 5px; /* Add padding to the input */
  font-size: 16px; /* Increase font size for better readability */
}
</style>
