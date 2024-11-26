<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from 'p5';
export default {
  name: 'KanjiPrac',
  mounted() {
    this.setupP5();
  },
};
</script>

<style scoped>

</style>
