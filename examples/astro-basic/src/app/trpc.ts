import { initTRPC } from '@trpc/server'

export const { procedure } = initTRPC.context<{}>().create()
