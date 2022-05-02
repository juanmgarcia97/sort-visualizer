export class AlgorithmService {
  isOver = false;
  inProgress = false;
  constructor() {}
  async bubbleSort(array) {
    let i, j;
    let size = array.length;
    this.inProgress = true;
    this.isOver = false;
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
    this.inProgress = false;
    this.isOver = true;
  }
  async selectionSort(array) {
    let size = array.length;
    this.inProgress = true;
    this.isOver = false;
    for (let i = 0; i < size - 1; i++) {
      let min = i;
      for (let j = i + 1; j < size; j++) {
        if (array[j] < array[min]) min = j;
        await this.sleep();
      }
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      await this.sleep();
    }
    this.inProgress = false;
    this.isOver = true;
  }
  async insertionSort(array) {
    let size = array.length;
    let key, j;
    this.inProgress = true;
    this.isOver = false;
    for (let i = 1; i < size; i++) {
      key = array[i];
      j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
        await this.sleep();
      }
      array[j + 1] = key;
      await this.sleep();
    }
    this.inProgress = false;
    this.isOver = true;
  }
  
  swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  async partition(arr, start, end) {
    let pivot = arr[end];
    let i = start - 1;
    
    for (let j = start; j <= end - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        this.swap(arr, i, j);
        await this.sleep()
      }
    }
    this.swap(arr, i + 1, end);
    await this.sleep()
    return i + 1;
  }
  async quickSort(arr, start, end) {
    this.inProgress = true
    this.isOver = false
    if (start < end) {
      let pi = await this.partition(arr, start, end);
      await this.quickSort(arr, start, pi - 1);
      await this.quickSort(arr, pi + 1, end);
    }
    this.inProgress = false
    this.isOver = true
  }
  async heapSort(array) {
    let size = array.length;
    this.inProgress = true;
    this.isOver = false;
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
      await this.heapify(array, size, i);
    }
    for (let i = size - 1; i >= 0; i--) {
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      await this.heapify(array, i, 0);
    }
    this.inProgress = false;
    this.isOver = true;
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
      await this.sleep();
    }
  }
  sleep() {
    return new Promise((resolve) => setTimeout(resolve, 50));
  }
}
