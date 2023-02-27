type TLocation = {
  name: string,
  coords: [number, number],
  current: boolean
}

export const getFromStorage = (key: string): [] => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}

export const setToStorage = (key: string, arr: TLocation[]) => {
  localStorage.setItem(key, JSON.stringify(arr))
}

export const getCurrentLimit = (key: string): number => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item).curLimitLoc : 0
}

export const setCurrentLimit = (key: string, value: number) => {
  localStorage.setItem(key, JSON.stringify({curLimitLoc : value}))
}