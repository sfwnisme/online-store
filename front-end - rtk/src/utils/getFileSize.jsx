
const getFileSize = (size) => {
  console.log(typeof(size))
  let measuredSize
  switch (true) {
    case size / 1024 < 900:
      measuredSize = ((size / 1024).toFixed(2) + 'KB').toString()
      break;
    case size / 1024 > 900:
      measuredSize = ((size / (1024 * 1024)).toFixed(2) + 'MB').toString()
      break;
  }
  return measuredSize
}

export default getFileSize

//::: another solution
// size / 1024 < 900
//  ? measuredSize = (size / 1024).toFixed(2) + 'KB'
//  : measuredSize = (size / (1024 * 1024)).toFixed(2) + 'MB'