import { useEffect } from 'react'
import { Alert } from "react-bootstrap";

const AlertMsg = ({ message, isError, isMsg, setIsMsg, delay }) => {
  //::: delay variants
  const initialDelay = 3000
  const successDelay = delay
  const errorDelay = 10000
  const delayVariants = isError ? errorDelay : successDelay || initialDelay
  //:::

  useEffect(() => {
    const timer = setTimeout(() => setIsMsg(false), [delayVariants])
    return () => clearTimeout(timer)
  }, [isMsg])

  return (
    <>
      {
        isMsg ?
          <Alert variant={isError ? "danger" : "success"} className={`credentials-${isError ? 'error' : 'success'}`}>
            {message}
          </Alert >
          : null
      }
    </>
  )
}

export default AlertMsg