export default defineEventHandler(async () => {
  return (await useStorage('assets:server').getItem('keys.json')) as Record<string, {
    description: string
    website: string
    repository: string
  }>
})
