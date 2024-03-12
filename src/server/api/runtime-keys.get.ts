import data from "runtime-compat-data"

export default defineEventHandler(() => {
  // Arbritary use an API to retrieve the `support` field and as such,
  // retrieve the list of runtimes.
  return Object.keys(data.api.AbortController.__compat?.support ?? {})
})
