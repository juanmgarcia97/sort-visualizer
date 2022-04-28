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
    <button @click="fillArray">Shuffle</button>
    <button @click="startSorting">Start</button>
  </div>

  <div class="container" v-if="array.length > 0">
    <div
      class="bar"
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
export default {
  name: 'App',
  data() {
    return {
      array: [],
      size: 0,
      algorithmSelected: '',
      sizesOptions: [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      algorithms: [
        'Selection Sort',
        'Insertion Sort',
        'Bubble Sort',
        'Quick Sort',
        'Heap Sort',
      ],
    };
  },
  components: {},
  methods: {
    async startSorting() {
      switch (this.algorithmSelected) {
        case 'Selection Sort':
          await this.selectionSort();
          break;
        case 'Insertion Sort':
          await this.insertionSort();
          break;
        case 'Bubble Sort':
          await this.bubbleSort();
          break;
        case 'Quick Sort':
          await this.quickSort(this.array, 0, this.size - 1);
          break;
        case 'Heap Sort':
          await this.heapSort();
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
      // populate array with random numbers between 5 and 750
      this.array = [];
      for (let i = 0; i < this.size; i++) {
        this.array.push(this.getRndInteger(5, 750));
      }
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async bubbleSort() {
      let i, j;
      for (i = 0; i < this.size - 1; i++) {
        for (j = 0; j < this.size - i - 1; j++) {
          if (this.array[j] > this.array[j + 1]) {
            let temp = this.array[j];
            this.array[j] = this.array[j + 1];
            this.array[j + 1] = temp;
            await this.sleep();
          }
        }
      }
    },
    async selectionSort() {
      let size = this.array.length;
      for (let i = 0; i < size - 1; i++) {
        let min = i;
        for (let j = i + 1; j < size; j++) {
          if (this.array[j] < this.array[min]) min = j;
        }
        let temp = this.array[i];
        this.array[i] = this.array[min];
        this.array[min] = temp;
        await this.sleep();
      }
    },
    async insertionSort() {
      let size = this.array.length;
      let key, j;
      for (let i = 1; i < size; i++) {
        key = this.array[i];
        j = i - 1;
        while (j >= 0 && this.array[j] > key) {
          this.array[j + 1] = this.array[j];
          j = j - 1;
        }
        this.array[j + 1] = key;
        await this.sleep();
      }
    },
    async quickSort(array, start, end) {
      if (start === undefined) {
        start = 0;
        end = array.length - 1;
      } else if (start >= end) {
        return array;
      }
      let rStart = start,
        rEnd = end;
      let pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
      while (start < end) {
        while (array[start] <= pivot) start++;
        while (array[end] > pivot) end--;
        if (start < end) {
          let temp = array[start];
          array[start] = array[end];
          array[end] = temp;
          await this.sleep();
        }
      }
      this.quickSort(array, rStart, start - 1);
      this.quickSort(array, start, rEnd);
    },
    async heapSort() {
      let size = this.array.length;
      for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
        this.heapify(this.array, size, i);
      }
      for (let i = size - 1; i >= 0; i--) {
        let temp = this.array[0];
        this.array[0] = this.array[i];
        this.array[i] = temp;
        await this.sleep();
        this.heapify(this.array, i, 0);
      }
    },
    async heapify(array, size, index) {
      let max = index;
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      if (left < size && array[left] > array[max]) max = left;
      if (right < size && array[right] > array[max]) max = right;
      if (max !== index) {
        let temp = array[index];
        array[index] = array[max];
        array[max] = temp;
        this.heapify(array, size, max);
      }
    },
    sleep() {
      return new Promise((resolve) => setTimeout(resolve, 100));
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
  transition: all 0.7s ease-in;
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
