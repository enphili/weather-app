export const handleError = (err, response) => {
  const statusCode = isNaN(err.statusCode) ? 500 : err.statusCode
  const message =  err.message ? err.message : err
  response.status(statusCode).json({
    success: false,
    status: 'error',
    errorCode: statusCode,
    message
  })
}