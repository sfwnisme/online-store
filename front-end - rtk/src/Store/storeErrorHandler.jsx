
const storeErrorHandler = (error) => {
  const serverError = error?.response?.status.toString().split('')[0] === '5'
  const clientError = error?.response?.data?.message
  const errorMessage = serverError ? 'server error: It seems that your server is not connected' : clientError
  const customError = { message: errorMessage, status: error?.response?.status }

  return customError
}

export default storeErrorHandler