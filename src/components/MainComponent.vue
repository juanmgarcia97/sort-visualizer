<template>
  <h1>Sorting Visualizer</h1>
  <div class="actions">
    <select name="Algorithms" id="" @change="getAlgorithm">
      <option :selected="true" disabled>Choose an algorithm</option>
      <option :value="alg" v-for="(alg, index) in algorithms" :key="index">
        {{ alg }}
      </option>
    </select>
    <select name="Size" id="" @change="getSize">
      <option :selected="true" disabled>Choose an array size</option>
      <option :value="size" v-for="(size, index) in sizesOptions" :key="index">
        {{ size }}
      </option>
    </select>
    <button @click="fillArray">Fill</button>
    <button @click="startSorting">Start</button>
  </div>
  <div class="container" v-if="showingArray.length > 0">
    <div
      class="barElement"
      v-for="(item, index) in showingArray"
      :key="index"
      :style="{
        minHeight: item + 'px',
        minWidth: 0.4 + 'px',
      }"
    ></div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
// import { onMounted } from '@vue/runtime-core';
export default {
  name: 'MainComponent',
  setup() {
    const showingArray = ref([]);
    let algorithmSelected = '';
    const sizesOptions = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const algorithms = [
      'Selection Sort',
      'Insertion Sort',
      'Bubble Sort',
      'Quick Sort',
      'Heap Sort',
    ];

    // onMounted(() => {
    //   for (let i = 0; i < 30; i++) {
    //     showingArray.push(Math.floor(Math.random() * 100) + 1);
    //   }
    // });

    function getAlgorithm(event) {
      algorithmSelected = event.target.value;
      console.log(algorithmSelected);
    }

    function getSize(event) {
      showingArray.value.length = Number(event.target.value);
      console.log(showingArray.value.length);
    }

    async function startSorting() {
      switch (algorithmSelected) {
        case 'Selection Sort':
          await selectionSort(showingArray.value);
          break;
        case 'Insertion Sort':
          await insertionSort(showingArray.value);
          break;
        case 'Bubble Sort':
          await bubbleSort(showingArray.value);
          break;
        case 'Quick Sort':
          await quickSort(showingArray.value);
          break;
        case 'Heap Sort':
          await heapSort(showingArray.value);
          break;
      }
    }

    function fillArray() {
      let size = showingArray.value.length;
      while (showingArray.value.length < size) {
        let rndNumber = Math.ceil(Math.random() * 100);
        let exists = false;
        for (let i = 0; i < showingArray.value.length; i++) {
          if (showingArray.value[i] === rndNumber) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          showingArray.value[size] = rndNumber;
        }
      }
    }

    async function selectionSort(array) {
      let size = array.length;
      for (let i = 0; i < size - 1; i++) {
        let min = i;
        for (let j = i + 1; j < size; j++) {
          if (array[j] < array[min]) min = j;
        }
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      return array;
    }

    async function insertionSort(array) {
      let size = array.length;
      let key, j;
      for (let i = 1; i < size; i++) {
        key = array[i];
        j = i - 1;
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          j = j - 1;
        }
        array[j + 1] = key;
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      return array;
    }

    function heapSort(array) {
      let size = array.length;
      for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
        heapify(array, size, i);
      }

      for (let i = size - 1; i >= 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapify(array, i, 0);
      }
      return array;
    }

    async function heapify(array, size, index) {
      let max = index;
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      if (left < size && array[left] > array[max]) max = left;
      if (right < size && array[right] > array[max]) max = right;
      if (max !== index) {
        let temp = array[index];
        array[index] = array[max];
        array[max] = temp;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return heapify(array, size, max);
      }
    }

    async function quickSort(array, start, end) {
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
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
      quickSort(array, rStart, start - 1);
      quickSort(array, start, rEnd);
    }

    async function bubbleSort(array) {
      let size = array.length;
      let i, j;
      for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
        }
      }
      return array;
    }

    return {
      selectionSort,
      insertionSort,
      bubbleSort,
      heapSort,
      quickSort,
      fillArray,
      getAlgorithm,
      getSize,
      startSorting,
      showingArray,
      sizesOptions,
      algorithms,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.actions {
  display: inline-flex;
  gap: 0.5rem;
}

.container {
  display: block;
  justify-content: center;
  margin: 5rem 20rem;
  min-height: 20rem;
  min-width: 20rem;
}
.barElement {
  width: 0.5rem;
  background-color: black;
  display: inline-block;
  margin: 0 5px;
}
</style>
