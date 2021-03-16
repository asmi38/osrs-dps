export const CHANGE_STAT = 'CHANGE_STAT'
export const CHANGE_PRAYER = 'CHANGE_PRAYER'
export const CHANGE_POTION = 'CHANGE_POTION'
export const FETCH_USER = 'FETCH_USER'

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
  return{
    type: FETCH_USER,
    username,
  }
}
