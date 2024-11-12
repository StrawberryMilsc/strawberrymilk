<template>
    <div>
      <h1>L-System</h1>
      <canvas ref="canvas" width="800" height="600" />
      <div>
        <button @click="nextIteration">Next Iteration</button>
        <p>Current Iteration: {{ currentIteration }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'L_System',
    data() {
      return {
        axiom: 'F',
        rules: { F: 'FF+[+F-F-F]-[-F+F+F]' },
        angle: 25,
        length: 10,
        iterations: 5,
        currentIteration: 0,
        lSystem: '',
      };
    },
    methods: {
      generateLSystem(iteration) {
        let result = this.axiom;
        for (let i = 0; i < iteration; i++) {
          result = result.replace(/[A-Z]/g, (match) => this.rules[match] || match);
        }
        return result;
      },
      drawLSystem() {
        const lSystem = this.generateLSystem(this.currentIteration);
        console.log(lSystem);
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height);
        ctx.scale(1, -1);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        this.drawString(ctx, lSystem, 0, 0, this.angle, this.length);
        ctx.stroke();
      },
      drawString(ctx, lSystem, x, y, angle, length) {
        const stack = [];
        for (let char of lSystem) {
          switch (char) {
            case 'F':
              const newX = x + length * Math.cos((angle * Math.PI) / 180);
              const newY = y + length * Math.sin((angle * Math.PI) / 180);
              ctx.lineTo(newX, newY);
              x = newX;
              y = newY;
              break;
            case '+':
              angle += this.angle;
              break;
            case '-':
              angle -= this.angle;
              break;
            case '[':
              stack.push({ x, y, angle });
              break;
            case ']':
              const state = stack.pop();
              x = state.x;
              y = state.y;
              angle = state.angle;
              ctx.moveTo(x, y);
              break;
          }
        }
      },
      nextIteration() {
        if (this.currentIteration < this.iterations) {
          this.currentIteration++;
          this.drawLSystem();
        } else {
          alert("Maximum iterations reached!");
        }
      },
    },
    mounted() {
      this.drawLSystem(); // Draw the initial L-System
    },
  };
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid black;
  }
  button {
    margin-top: 10px;
    padding: 10px 15px;
    font-size: 16px;
  }
  </style>