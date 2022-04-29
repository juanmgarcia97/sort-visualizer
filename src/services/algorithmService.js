export class AlgorithmService {
  constructor() {}
  async bubbleSort(array) {
    let size = array.length;
    let i, j;
    for (i = 0; i < size - 1; i++) {
      for (j = 0; j < size - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          await this.sleep();
        }
      }
    }
  }
  async selectionSort(array) {
    let size = array.length;
    for (let i = 0; i < size - 1; i++) {
      let min = i;
      for (let j = i + 1; j < size; j++) {
        if (array[j] < array[min]) min = j;
      }
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      await this.sleep();
    }
  }
  async insertionSort(array) {
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
      await this.sleep();
    }
  }
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
  }
  async heapSort(array) {
    let size = array.length;
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
      this.heapify(array, size, i);
    }
    for (let i = size - 1; i >= 0; i--) {
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      await this.sleep();
      this.heapify(array, i, 0);
    }
  }
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
  }
  sleep() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  // return {
  //   selectionSort,
  //   insertionSort,
  //   bubbleSort,
  //   quickSort,
  //   heapSort,
  // };
}
