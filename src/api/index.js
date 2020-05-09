import {
  setLocalAuthToken,
  getLocalAuthToken,
  deleteLocalAuthToken,
} from '../storage'

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
    if (response.status >= 200 && response.status < 300) {
      const responseJson = await response.json()
      const camelCaseJSONResponse = parseBodyToCamelCase(responseJson)
      return camelCaseJSONResponse
    } else if (response.status === 401) {
      deleteLocalAuthToken()
      return Promise.reject(response)
    } else {
      return Promise.reject(response)
    }
  } catch (error) {
    return Promise.reject(response)
  }
}

export async function callAPI(endpoint, method = 'GET', body = null) {
  const authToken = getLocalAuthToken()
  const options = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (authToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)
    const json = await parseResponse(response)
    setLocalAuthToken(json.authToken)
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
    phone: { number, sms_code: code },
  })
  return response
}

export async function fetchReports(params) {
  const stringParams = parseObjectToParams(params)
  const endpoint = getLocalAuthToken() ? '/patients' : '/guest'
  const response = await callAPI(`${endpoint}?${stringParams}`)
  return response
}

export async function postVolunteer(volunteer) {
  const response = await callAPI('/volunteers', 'POST', { volunteer })
  return response
}

export async function postLogin(credentials) {
  const response = await callAPI('/login', 'POST', credentials)
  return response
}

export async function requestResendSMS(number) {
  const response = await callAPI('/phones/resend_sms_code', 'POST', {
    phone: { number },
  })
  return response
}

export async function postPhone(number) {
  const response = await callAPI('/phones', 'POST', { phone: { number } })
  return response
}

