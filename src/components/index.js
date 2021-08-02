import Vue from "vue";
import TicTacToe from "./TicTacToe.vue";

const Components = {
  TicTacToe,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
