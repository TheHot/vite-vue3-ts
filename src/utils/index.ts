// import { useDark, useToggle } from '@vueuse/core'

// export const isDark = useDark()
// export const toggleDark = useToggle(isDark)

export const setStorage = (key: string, data: object) => {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export const getStorage = (key: string) => {
  const value = window.localStorage.getItem(key)
  let result = null
  try {
    if (value !== null) {
      result = JSON.parse(value)
    }
  } catch (err) {}
  return result
}

export const setSession = (key: string, data: object) => {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}

export const getSession = (key: string) => {
  const value = window.sessionStorage.getItem(key)
  let result = null
  try {
    if (value !== null) {
      result = JSON.parse(value)
    }
  } catch (err) {}
  return result
}
