export function deepCreate(obj, path) {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  return current;
}

export function get(obj, path) {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (!current[key]) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}
