<template>
  <h1>Sorting Algorithm Visualizer</h1>
  <div class="actions">
    <select name="Algorithms" id="Algorithms" @change="getAlgorithm">
      <option :selected="true" disabled>Choose an algorithm</option>
      <option :value="alg" v-for="(alg, index) in algorithms" :key="index">
        {{ alg }}
      </option>
    </select>
    <select name="Size" id="Size" @change="getSize">
      <option :selected="true" disabled>Choose an array size</option>
      <option :value="size" v-for="(size, index) in sizesOptions" :key="index">
        {{ size }}
      </option>
    </select>
    <button @click="fillArray">Fill & Shuffle</button>
    <button @click="startSorting">Start</button>
  </div>

  <div class="container" v-if="array.length > 0">
    <div
      :class="classItems"
      v-for="(number, index) in array"
      :key="index"
      :style="{ minHeight: number + 'px' }"
    ></div>
  </div>
  <div class="no-data" v-else>
    <h3>
      Here you will see the array of size you choose, please select a size and
      fill it!
    </h3>
  </div>
</template>

<script>
import { AlgorithmService } from "../services/algorithmService";
export default {
  name: "App",
  data() {
    return {
      array: [],
      size: 0,
      service: new AlgorithmService(),
      algorithmSelected: "",
      sizesOptions: [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      algorithms: [
        "Selection Sort",
        "Insertion Sort",
        "Bubble Sort",
        "Quick Sort",
        "Heap Sort",
      ],
    };
  },
  computed: {
    classItems() {
      return {
        bar: !this.service.inProgress && !this.service.isOver,
        progress: this.service.inProgress && !this.service.isOver,
        ready: !this.service.inProgress && this.service.isOver,
      }
    }
  },
  methods: {
    async startSorting() {
      switch (this.algorithmSelected) {
        case "Selection Sort":
          await this.service.selectionSort(this.array);
          break;
        case "Insertion Sort":
          await this.service.insertionSort(this.array);
          break;
        case "Bubble Sort":
          await this.service.bubbleSort(this.array);
          break;
        case "Quick Sort":
          await this.service.quickSort(this.array, 0, this.size - 1);
          break;
        case "Heap Sort":
          await this.service.heapSort(this.array);
          break;
      }
    },
    getAlgorithm(event) {
      this.algorithmSelected = event.target.value;
    },
    getSize(event) {
      this.size = Number(event.target.value);
    },

    fillArray() {
      this.array = [];
      this.service.inProgress = false
      this.service.isOver = false
      for (let i = 0; i < this.size; i++) {
        this.array.push(this.getRndInteger(5, 750));
      }
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  created() {
    this.fillArray();
  },
};
</script>

<style>
.container {
  display: block;
  justify-content: center;
  margin: 2rem 10rem;
  border: #2c3e50 solid 2px;
  padding-top: 1rem;
}
.bar {
  width: 5px;
  background-color: grey;
  display: inline-block;
  margin: 0 2px;
  border-radius: 2rem 2rem 0 0;
  transition: all 0.4s ease-in;
}

.progress {
  width: 5px;
  background-color: lightcoral;
  display: inline-block;
  margin: 0 2px;
  border-radius: 2rem 2rem 0 0;
  transition: all 0.4s ease-in;
}
.ready {
  width: 5px;
  background-color: lightgreen;
  display: inline-block;
  margin: 0 2px;
  border-radius: 2rem 2rem 0 0;
  transition: all 0.4s ease-in;
}
.element {
  width: 5px;
  background-color: black;
  display: inline-block;
  margin: 0 2px;
  border-radius: 2rem 2rem 0 0;
  transition: all 0.4s ease-in;

}
.actions {
  display: inline-flex;
  justify-content: center;
  gap: 0.5rem;
}

.no-data {
  padding-top: 20rem;
}
</style>
