export default defineEventHandler(async () => {
  return (await useStorage('assets:server').getItem('apis.json')) as Record<string, Record<string, unknown>>
})
