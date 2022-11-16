export function arrRandom(arr, count = 1) {
  if (arr?.length) {
    let out = ''
    for (let i = 0; i < count; i++) {
      out += arr[Math.floor(Math.random() * arr.length)]
    }
    return out
  }
}

export function chance(prob) {
  return Math.round(Math.random() * 100) < prob * 100
}

export function randI(arr) {
  if (arr?.length) {
    return Math.floor(Math.random() * arr.length)
  }
}

export function randomRange(start, end) {
  return start + Math.round(Math.random() * end)
}

export function indexWrap(arr, start, move) {
  return arr[((start + arr.length) + move) % arr.length]
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
