import { fetchUser } from '../utils/api'
export const CHANGE_STAT = 'CHANGE_STAT'
export const CHANGE_PRAYER = 'CHANGE_PRAYER'
export const CHANGE_POTION = 'CHANGE_POTION'
export const FETCHING_USER = 'FETCHING_USER'
export const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

export function changeStat (stat_name, stat) {
  return {
    type: CHANGE_STAT,
    stat_name,
    stat,
  }
}

export function changePrayer (stat_name, prayer){
  return {
    type: CHANGE_PRAYER,
    stat_name,
    prayer,
  }
}

export function changePotion (stat_name, potion){
  return{
    type: CHANGE_POTION,
    stat_name,
    potion,
  }
}

export function handleFetchUser (username){
  return (dispatch) => {
    dispatch(fetchingUser())
    fetchUser(username)
        .then((data) => dispatch(fetchingUserSuccess(data)))
        .catch((error) => dispatch(fetchingUserError(error)))
  }
}

function fetchingUser () {
  return {
    type: 'FETCHING_USER'
  }
}

function fetchingUserError (error) {
  return {
    type: 'FETCHING_USER_ERROR',
    error: error.msg
  }
}

function fetchingUserSuccess (data) {
  return {
    type: 'FETCHING_USER_SUCCESS',
    data,
  }
}
