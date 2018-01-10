const apiRoot = '/api/1.0'

// function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time))
// }

function potato (callName, method = 'GET', body = '') {
  let headers = new Headers()
  let requestParams = {
    method: method,
    credentials: 'include',
    headers: headers
  }
  if (method === 'PUT' || method === 'POST') {
    if (typeof body === 'string') {
      requestParams['body'] = body
    } else {
      requestParams['body'] = JSON.stringify(body)
    }
  }
  return fetch(apiRoot + '/' + callName, requestParams)
}

export default {
  potato
}
