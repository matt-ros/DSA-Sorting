function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }

  return array;
}

// After 3 recursive calls, the list being sorted is [21, 1].
// After 16 recursive calls, the list being sorted is [9].
// First 2 lists to be merged are [21] and [1]
// 7th merge will combine [16] and [49].

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}
[15,13,10,3,9,12,14,16,19,17]
function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

// 2.1 The pivot could have been either 14 or 17.  At the end of the partion function, the pivot is swapped with j.
// We can undo this by swapping our potential pivot (14) with the current last item of the array (20), and then working backwards to figure out if the pointers line up where they should.
// This process works correctly for both 14 and 17, therefore either one could have been the pivot.
// 2.2.1 Using the last item as a pivot, we get [3, 9, 10, 12, 19, 14, 17, 16, 13, 15] after the second partitioning.
// 2.2.2 Using the first item as a pivot, we get [15,13,10,3,9,12,14,16,19,17] after the secont partitioning.

console.log(mergeSort([21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]));
console.log(quickSort([3,9,1,14,17,24,22,20]));

const data = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
function qSort(data) {
  const dataArray = data.split(' ');
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i] = Number(dataArray[i]);
  }
  return quickSort(dataArray);
}
console.log(qSort(data));

function mSort(data) {
  const dataArray = data.split(' ');
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i] = Number(dataArray[i]);
  }
  return mergeSort(dataArray);
}
console.log(mSort(data));

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }

  insertBefore(key, item) {
    if (this.head.value === key) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      while (currNode !== null && currNode.next.value !== key) {
        currNode = currNode.next;
      }
      if (currNode === null) {
        console.log('Key not found');
        return;
      }
      const newNode = new _Node(item, currNode.next);
      currNode.next = newNode;
    }
  }

  insertAfter(key, item) {
    let keyNode = this.find(key);
    if (keyNode === null) {
      console.log('Key not found');
      return;
    }
    const newNode = new _Node(item, keyNode.next);
    keyNode.next = newNode;
  }

  insertAt(pos, item) {
    if (this.head === null || pos === 1) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      let prevNode = this.head;
      let counter = 1;
      while (currNode !== null && counter !== pos) {
        prevNode = currNode;
        currNode = currNode.next;
        counter++;
      }
      const newNode = new _Node(item, currNode);
      prevNode.next = newNode;
    }
  }
}

function size(linkedList) {
  if (linkedList.head === null) {
    return 0;
  }
  let counter = 0;
  let currNode = linkedList.head;
  while (currNode !== null) {
    currNode = currNode.next;
    counter++;
  }
  return counter
}

function isEmpty(linkedList) {
  if (linkedList.head === null) {
    return true;
  }
  return false;
}

function findPrevious(linkedList, item) {
  let currNode = linkedList.head;
  let prevNode = linkedList.head;
  while (currNode !== null && currNode.value !== item) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  if (currNode === null || currNode.value === linkedList.head.value) {
    return null;
  }
  return prevNode;
}

function findLast(linkedList) {
  if (linkedList.head === null) {
    return 'Empty list';
  }
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  return currNode;
}

function reverse(linkedList) {
  let counter = 1;
  let listSize = size(linkedList);
  let currNode = findLast(linkedList);
  let nextNode = findPrevious(linkedList, currNode.value);
  while (counter <= listSize) {
    linkedList.remove(currNode.value);
    linkedList.insertAt(counter, currNode.value);
    counter++;
    currNode = nextNode;
    nextNode = findPrevious(linkedList, currNode.value);

  }
  return linkedList;
}

function display(linkedList) {
  let displayString = '';
  if (linkedList.head === null) {
    console.log('Empty list');
    return;
  }

  let currNode = linkedList.head;
  while (currNode.next !== null) {
    displayString += `${currNode.value} -> `;
    currNode = currNode.next;
  }
  displayString += currNode.value;
  console.log(displayString);
  return;
}

function linkedListMergeSort(linkedList) {
  const listSize = size(linkedList);
  if (listSize <= 1) {
    return linkedList;
  }

  const middle = Math.floor(listSize / 2);
  let left = sliceList(linkedList, 0, middle);
  let right = sliceList(linkedList, middle, listSize);
  
  left = linkedListMergeSort(left);
  right = linkedListMergeSort(right);
  return linkedListMerge(left, right);
}

function sliceList(linkedList, start, end) {
  let counter = 0;
  let currNode = linkedList.head;
  const newList = new LinkedList();
  while (counter < end) {
    if (counter >= start) {
      newList.insertLast(currNode.value);
    }
    currNode = currNode.next;
    counter++;
  }
  return newList;
}

function linkedListMerge(leftList, rightList) {
  let leftNode = leftList.head;
  let rightNode = rightList.head;
  const outputList = new LinkedList();
  while (leftNode !== null && rightNode !== null) {
    if (leftNode.value < rightNode.value) {
      outputList.insertLast(leftNode.value);
      leftNode = leftNode.next;
    }
    else {
      outputList.insertLast(rightNode.value);
      rightNode = rightNode.next;
    }
  }

  while (leftNode !== null) {
    outputList.insertLast(leftNode.value);
    leftNode = leftNode.next;
  }

  while (rightNode !== null) {
    outputList.insertLast(rightNode.value);
    rightNode = rightNode.next;
  }

  return outputList;
}

const dataArray = data.split(' ');
const dataList = new LinkedList();
for (let i = dataArray.length - 1; i >= 0; i--) {
  dataList.insertFirst(Number(dataArray[i]));
}
display(linkedListMergeSort(dataList));

function bucketSort(array, minVal, maxVal) {
  const vals = new Map();
  let ticks = 1;
  for (let i = 0; i < array.length; i++) {
    ticks++;
    if (vals.has(array[i])) {
      vals.set(array[i], vals.get(array[i]) + 1);
    }
    else {
      vals.set(array[i], 1);
    }
  }
  const output = [];
  for (let i = minVal; i <= maxVal; i++) {
    ticks++;
    if (vals.has(i)) {
      let count = vals.get(i);
      while (count > 0) {
        ticks++;
        output.push(i);
        count--;
      }
    }
  }
  return [output, array.length, ticks];
}

const numberArray = [];
for (let i = 0; i < dataArray.length; i++) {
  numberArray.push(Number(dataArray[i]));
  numberArray.push(Number(dataArray[i]));
  numberArray.push(Number(dataArray[i]));
  numberArray.push(Number(dataArray[i]));
  numberArray.push(Number(dataArray[i]));
}
console.log(bucketSort(numberArray, 1, 98));
