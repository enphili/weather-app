export const getMediaPreference = (): string => {
  const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
  if (hasDarkPreference) return "dark"
  else return "light"
}