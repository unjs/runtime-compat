import type { Runtimes } from '~/types/runtime'

export function transformRuntimeKeys(runtimeKeys: any): Runtimes {
  return Object.entries(runtimeKeys).reduce((acc, [key, value]) => {
    if (key !== '$source') {
      acc.push({
        name: key,
        ...(value as any),
      })
    }

    return acc
  }, [] as Runtimes)
}
