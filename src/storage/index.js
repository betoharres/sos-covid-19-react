import { tokenKey, volunteerKey } from '../constants'

const { localStorage } = window

export function setLocalAuthToken(authToken) {
  if (authToken) {
    localStorage.setItem(tokenKey, authToken)
  }
}

export function getLocalAuthToken() {
  return localStorage.getItem(tokenKey)
}

export function deleteLocalAuthToken() {
  localStorage.removeItem(tokenKey)
}

export function setLocalVolunteer(volunteer) {
  localStorage.setItem(volunteerKey, JSON.stringify(volunteer))
}

export function getLocalVolunteer() {
  const volunteer = localStorage.getItem(volunteerKey)
  if (Object.keys(volunteer).length) {
    return JSON.parse(volunteer)
  }
  return null
}

export function setLocalPhoneToken(phone, token) {
  if (token) {
    localStorage.setItem(phone, token)
  }
}

export function getLocalPhoneToken(phone) {
  return localStorage.getItem(phone)
}

export function deleteLocalPhoneToken(phone) {
  localStorage.removeItem(phone)
}
