const API_URL = process.env.REACT_APP_API_URL

export function parseObjectToParams(params) {
  if (params) {
    return Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  } else {
    return ''
  }
}

// foo_bar => fooBar
export function toCamelCase(string) {
  return string.replace(
    /_[a-z]/g,
    (match) => `${match.substring(1).toUpperCase()}`
  )
}

export function parseToCamelCase(obj) {
  const parsedObj = {}
  Object.keys(obj).forEach((key) => {
    // recursive call
    obj[key] =
      obj[key] instanceof Object ? parseToCamelCase(obj[key]) : obj[key]
    const camelKey = toCamelCase(key)
    parsedObj[camelKey] = obj[key]
  })
  return parsedObj
}

export function parseBodyToCamelCase(obj) {
  if (obj instanceof Array) {
    const objList = []
    obj.forEach((objectItem) => objList.push(parseToCamelCase(objectItem)))
    return objList
  } else {
    return parseToCamelCase(obj)
  }
}

async function parseResponse(response) {
  try {
    const responseJson = await response.json()
    if (responseJson && response.status >= 200 && response.status < 300) {
      const camelCaseJSONResponse = parseBodyToCamelCase(responseJson)
      return camelCaseJSONResponse
    } else {
      return Promise.reject(responseJson)
    }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export async function callAPI(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)
    const json = await parseResponse(response)
    return json
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function postSymptoms(patient) {
  const response = await callAPI('/patients', 'POST', { patient })
  return response
}

export async function postCode(number, code) {
  const response = await callAPI('/phones/validate', 'POST', {
    phone: { number, verification_code: code },
  })
  return response
}

export async function fetchReports(params) {
  const stringParams = parseObjectToParams(params)
  const response = await callAPI(`/patients?${stringParams}`)
  return response
}
