<template>
  <h1>Sorting Visualizer</h1>
  <div class="actions">
    <select name="Algorithms" id="">
      <option :selected="true" disabled>Choose an algorithm</option>
      <option :value="alg" v-for="(alg, index) in algorithms" :key="index">
        {{ alg }}
      </option>
    </select>
    <select name="Size" id="" @change="onChange">
      <option :selected="true" disabled>Choose an array size</option>
      <option :value="size" v-for="(size, index) in sizesOptions" :key="index">
        {{ size }}
      </option>
    </select>
    <button>Start</button>
  </div>
  <div class="container">
    <div

      class="barElement"
      v-for="(item, index) in showingArray"
      :key="index"
      :style="{ height: item + 'px' }"
    ></div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
export default {
  name: 'MainComponent',
  setup() {
    let showingArray = [];
    const sizesOptions = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const algorithms = [
      'Selection Sort',
      'Insertion Sort',
      'Bubble Sort',
      'Quick Sort',
      'Heap Sort',
    ];

    onMounted(() => {
      for (let i = 0; i < 100; i++) {
        showingArray.push(Math.floor(Math.random() * 500) + 1);
      }
    });

    function onChange(event) {
      showingArray = [];
      console.log(event.target.value);
      let size = Number.parseInt(event.target.value);
      console.log(size);
      for (let i = 0; i < size; i++) {
        showingArray.push(Math.floor(Math.random() * 500) + 1);
      }
      // while (showingArray.length < size) {
      //   let rndNumber = Math.ceil(Math.random() * 500);
      //   let exists = false;
      //   for (let i = 0; i < showingArray.length; i++) {
      //     if (showingArray[i] == rndNumber) {
      //       exists = true;
      //       break;
      //     }
      //   }
      //   if (!exists) {
      //     showingArray[size] = rndNumber;
      //   }
      // }
    }

    function selectionSort(array) {
      let size = array.length;
      for (let i = 0; i < size - 1; i++) {
        let min = i;
        for (let j = i + 1; j < size; j++) {
          if (array[j] < array[min]) min = j;
        }
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
      return array;
    }

    function insertionSort(array) {
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

    function heapify(array, size, index) {
      let max = index;
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      if (left < size && array[left] > array[max]) max = left;
      if (right < size && array[right] > array[max]) max = right;
      if (max != index) {
        let temp = array[index];
        array[index] = array[max];
        array[max] = temp;

        return heapify(array, size, max);
      }
    }

    function quickSort(array, start, end) {
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
        }
      }
      quickSort(array, rStart, start - 1);
      quickSort(array, start, rEnd);
    }

    function bubbleSort(array) {
      let size = array.length;
      let i, j;
      for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
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
      onChange,
      showingArray,
      sizesOptions,
      algorithms,
    };
  },
};


/*
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
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.container {

  display: block;
  position: fixed;
  left: 100px;
  min-height: 50rem;
  min-width: 50rem;
}
.barElement {
  width: 20px;
  background-color: black;
  display: inline-block;
  margin: 0 5px;
}
</style>


