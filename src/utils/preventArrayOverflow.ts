export const beyondGuard =  (arr: any[], currentIndex: number): any => {
  if (currentIndex < 0 ) {
    return arr[0]
  }
  if (currentIndex >= arr.length) {
    return arr[arr.length - 1]
  }
  return arr[currentIndex]
}