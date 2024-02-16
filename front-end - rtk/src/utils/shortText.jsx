
const shortText = (text, length) => {
  let limitter;
  switch (true) {
    case text.length <= length:
      limitter = ''
      break;
    case text.length >= length:
      limitter = '...'
      break;
  }
  const shortedText = text.substring(0, length) + limitter
  return shortedText
}

export default shortText