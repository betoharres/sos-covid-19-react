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
  localStorage.setItem('volunteer', JSON.stringify(volunteer))
}

export function getLocalVolunteer() {
  const volunteer = localStorage.getItem(volunteerKey)
  if (volunteer) {
    return JSON.parse(volunteer)
  }
  return null
}
