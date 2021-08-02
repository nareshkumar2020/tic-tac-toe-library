<template lang="">
  <div class="container">
    <div>
      <h3
        v-if="!winner && counter < 9"
        v-bind:class="!winner ? 'blink-turn' : ''"
      >
        {{ counter % 2 == 0 ? "X" : "O" }} Turn to Play!
      </h3>

      <h3 v-bind:class="winner ? 'blink-turn' : ''">{{ winner }}</h3>
      <br />
      <div class="checker-board">
        <Square
          v-for="square in squares"
          :key="square.id"
          :square="square"
          :winningSeries="winningSeries"
          @cellClicked="cellClicked($event)"
        />
      </div>
      <br />
      <h1 v-if="winner || counter === 9">Game Over</h1>
      <br />
      <button class="play-button" @click="playAgain()">
        Play Again
      </button>
    </div>
  </div>
</template>
<script>
import Square from "./Square.vue";
export default {
  name: "TicTacToe",
  components: {
    Square,
  },
  mounted() {},
  props: {
    player: Number,
  },
  data() {
    return {
      squares: [
        { id: 0, value: "" },
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
        { id: 5, value: "" },
        { id: 6, value: "" },
        { id: 7, value: "" },
        { id: 8, value: "" },
      ],
      counter: 0,
      winner: "",
      winningSeries: [],
      history: [],
    };
  },
  methods: {
    cellClicked(id) {
      if (!this.winner && !this.squares[id].value && this.counter < 9) {
        this.counter += 1;
        const turn = this.counter % 2 == 0 ? "O" : "X";
        this.squares[id].value = turn;
        this.history.push({ message: `${turn} clicked ${id}` });
        if (this.counter > 4) {
          this.checkForWinner();
        }
        if (!this.winner && this.player === 1) {
          this.playNextMove(id);
        }
      } else if (this.winner) {
        alert("Game Over");
      }
    },
    playNextMove(id) {
      const priorityFill = this.findPriorityCell();
      const randomCell =
        priorityFill > -1 && !this.squares[priorityFill].value
          ? priorityFill
          : this.getPriorityCell(id);

      if (!this.squares[randomCell].value) {
        setTimeout(() => {
          this.counter += 1;
          const turn = this.counter % 2 == 0 ? "O" : "X";
          this.squares[randomCell].value = turn;
          this.history.push({ message: `${turn} clicked ${randomCell}` });
          this.checkForWinner();
        }, 500);
      } else if (this.counter < 9) {
        this.playNextMove(id);
      }
    },
    findPriorityCell() {
      const winningSequence = [
        [1, 4, 7],
        [3, 4, 5],
        [2, 4, 6],
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
      ];

      let priorityFill = -1;
      for (let i = 0; i < winningSequence.length; i++) {
        const a = winningSequence[i][0];
        const b = winningSequence[i][1];
        const c = winningSequence[i][2];
        let filledSequence = 0;
        if (this.player === 1) {
          if (this.squares[a].value === "X") {
            filledSequence += 1;
          }
          if (this.squares[b].value === "X") {
            filledSequence += 1;
          }
          if (this.squares[c].value === "X") {
            filledSequence += 1;
          }

          if (filledSequence > 1) {
            priorityFill =
              this.squares[a].value === "X"
                ? this.squares[b].value === "X"
                  ? this.squares[c].value === "X"
                    ? -1
                    : c
                  : b
                : a;

            if (!this.squares[priorityFill].value) {
              return priorityFill;
            }
          }
        }
      }
      return priorityFill;
    },
    getPriorityCell(id) {
      //dont change order of array
      const prioritySequence = [
        [1, 3, 4, 2, 6, 8],
        [0, 2, 4, 7],
        [1, 5, 4, 0, 8, 6],

        [0, 6, 4, 5],
        [0, 8, 2, 6, 1, 7, 3, 5],
        [2, 8, 4, 3],

        [3, 7, 4, 0, 2, 8],
        [4, 6, 8, 1],
        [5, 7, 4, 2, 6, 0],
      ];

      const possibilitySeries = prioritySequence[id];

      for (let i = 0; i < possibilitySeries.length; i++) {
        if (!this.squares[possibilitySeries[i]].value) {
          return possibilitySeries[i];
        }
      }
    },
    checkForWinner() {
      const winningSequence = [
        [1, 4, 7],
        [3, 4, 5],
        [2, 4, 6],
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
      ];

      for (let i = 0; i < winningSequence.length; i++) {
        const a = winningSequence[i][0];
        const b = winningSequence[i][1];
        const c = winningSequence[i][2];
        if (
          this.squares[a].value &&
          this.squares[a].value === this.squares[b].value &&
          this.squares[b].value === this.squares[c].value
        ) {
          this.winner = `${this.counter % 2 == 0 ? "O" : "X"} is the Winner!!!`;
          this.winningSeries = winningSequence[i];
          break;
        }
      }
    },
    playAgain() {
      this.counter = 0;
      this.winner = "";
      this.winningSeries = [];
      this.squares.forEach((square) => (square.value = ""));
      this.history = [];
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  text-align: center;
  font-family: "Roboto", sans-serif;
}
.checker-board {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  border: 1px solid grey;
  border-radius: 4px;
}
.play-button {
  padding: 15px;
  border: 0px;
  border-radius: 4px;
  background: #a3dea3;
  color: #2973b7;
  font-size: 16px;
  font-weight: 600;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.blink-turn {
  animation: blink 1s step-start 0s infinite;
}
</style>
