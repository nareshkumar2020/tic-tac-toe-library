<template>
  <span
    @click="onCellClick(square.id)"
    class="cell"
    v-bind:class="winningSeries.includes(square.id) ? 'blink' : ''"
  >
    {{ square.value }}
  </span>
</template>
<script>
export default {
  name: "Square",
  props: {
    square: {
      id: Number,
      value: String,
    },
    winningSeries: Array,
  },
  methods: {
    onCellClick(cellID) {
      this.$emit("cellClicked", cellID);
    },
  },
};
</script>
<style scoped>
.cell {
  height: 100px;
  width: 31.3%;
  margin: 1%;

  border-radius: 4px;
  background-color: beige;
  font-size: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.cell:hover {
  background-color: #f5dec0;
}
.highlight {
  background-color: #a3dea3;
}

@keyframes blink {
  50% {
    background-color: #a3dea3;
  }
}
.blink {
  animation: blink 1s step-start 0s infinite;
}
</style>
