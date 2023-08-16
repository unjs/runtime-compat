export default defineEventHandler(async () => {
  return await useStorage('assets:server').getItem('relations.json')
})
