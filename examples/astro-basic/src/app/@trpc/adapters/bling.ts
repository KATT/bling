import type { AnyProcedure, inferProcedureInput } from '@trpc/server'

export function wrapProcedure<TProc extends AnyProcedure>(proc: TProc) {
  return (input: inferProcedureInput<TProc>) => {
    console.log('input received', input)
    return proc({
      ctx: {},
      rawInput: input,
      path: '',
      type: 'mutation',
    })
  }
}
