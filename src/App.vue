<template>
  <div id="app">
    <TicTacToe :player="1" />
  </div>
</template>

<script>
import TicTacToe from "./components/TicTacToe";

export default {
  name: "App",
  components: {
    TicTacToe,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
