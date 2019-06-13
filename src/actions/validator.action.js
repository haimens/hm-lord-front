

export function matchPattern(str, regex, message) {
  if (!str.match(regex)) {
    return Promise.resolve(message)
  }
  return Promise.resolve(undefined)
}

export async function requireMinLength(str, min, message) {
  if (typeof str === 'number') {
    if (str.toString().length < min) {
      return Promise.resolve(message)
    }
  }
  if (str.length < min) {
    return Promise.resolve(message)
  }
  return Promise.resolve(undefined)
}

export async function requireMaxLength(str, max, message) {
  if (typeof str === 'number') {
    if (str.toString().length > max) {
      return Promise.resolve(message)
    }
  }
  if (str.length > max) {
    return Promise.resolve(message)
  }
  return Promise.resolve(undefined)
}

export function checkValidation(arr) {
  for (let item of arr) {
    if (item) {
      return item;
    }
  }
}

export function areaCodeCheck(str) {
  return str.length >= 2 && str.length <= 8 && str.match(/^\+(?:[\d]*)$/);
}

export function phoneNumberCheck(str) {
  return !isNaN(str) && str.length > 8 && str.length < 18
}
