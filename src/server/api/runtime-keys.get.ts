import data from "runtime-compat-data"

export default defineEventHandler(() => {
  return Object.keys(data.api.AbortController.__compat?.support ?? {})
})
