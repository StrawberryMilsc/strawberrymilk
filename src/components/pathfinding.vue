<template>
  <div ref="p5Container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const p5Container = ref(null);
let sketchInstance = null;


const sketch = (p) => {
  const grid_size = 20;
  let player = {};
  let target = {};
  let grid = [];
  p.setup = () => {
    p.createCanvas(400, 400);
    p.player_init()
    
    p.create_walls()
    p.randomize_player()
    p.randomize_target()
    p.update();
    p.grid();

  };

  p.draw = () => {
    p.draw_player();
    p.draw_target();
  };

  p.draw_target = () => {
    p.fill(255,0,0);
    p.ellipse(target.pos.x * grid_size + (grid_size/2), target.pos.y * grid_size + (grid_size/2) , grid_size-1, grid_size-1);
  };

  p.randomize_player = () => {
    let found = false;
    while (!found) {
      let x = p.floor(p.random(0, p.width / grid_size));
      let y = p.floor(p.random(0, p.height / grid_size));
      if (grid[x][y] === 0) {
        player.pos = p.createVector(x, y);
        found = true;
        console.log(player.pos)
      }
    }
  };

  p.randomize_target = () => {
    let x = p.floor(p.random(0, p.width / grid_size));  
    let y = p.floor(p.random(0, p.height / grid_size));
    target.pos = p.createVector(x, y);
    player.target = target;
  };

  p.draw_player = () => {
    p.fill(0,255,0);
    p.ellipse(player.pos.x * grid_size + (grid_size/2), player.pos.y * grid_size + (grid_size/2) , grid_size-1, grid_size-1);
  };

  p.create_walls = () => {
    for (let i = 0; i < p.width / grid_size; i++) {
      grid[i] = [];
      for (let j = 0; j < p.height / grid_size; j++) {
        grid[i][j] = Math.round(Math.random());
      }
    }
  };

  p.player_init = () => {
    player = { pos: p.createVector(p.width / 2, p.height / 2), target: null };
  };

  p.grid = () => {
    for (let i = 0; i < p.width; i += grid_size) {
      for (let j = 0; j < p.height; j += grid_size) {
        if (grid[i / grid_size][j / grid_size] === 0) {
          p.fill(255); // White
        } else {
          p.fill(0); // Black
        }
        p.rect(i, j, grid_size, grid_size);
        p.stroke(0);
        p.strokeWeight(1);
        p.line(i, 0, i, p.height);
        p.line(0, j, p.width, j);
      }
    }
  };

  p.update = () => {
    p.background(200);

  };
};

onMounted(() => {
  if (p5Container.value) {
    sketchInstance = new p5(sketch, p5Container.value);
  }
});

onBeforeUnmount(() => {
  if (sketchInstance) {
    sketchInstance.remove();
  }
});
</script>

<style scoped>
/* Optional: Style the container */
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
