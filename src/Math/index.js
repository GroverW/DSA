const median = (arr) => {
  arr.sort((a, b) => a - b);

  if (arr.length % 2 === 0) {
    return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
  } else {
    return arr[Math.floor(arr.length / 2)];
  }
}

export {
  median,
};
