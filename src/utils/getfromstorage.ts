export const getFromStorage = (key: string): [] => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}
