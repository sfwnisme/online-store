export const debaouce = (callback, time) => {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(callback, time)
  }
}