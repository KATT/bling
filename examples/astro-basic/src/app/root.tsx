import { fetch$, server$, split$ } from '@tanstack/bling'
import { z } from 'zod'
import { wrapProcedure } from './@trpc/adapters/bling'
import { secret } from './secret.server$'
import { procedure } from './trpc'

const greeting = fetch$(
  wrapProcedure(
    procedure.input(z.string().optional()).mutation((opts) => {
      console.log('hello from trpc')
      return `Hello ${opts.input ?? 'world'}` as const
    }),
  ),
)

function ServerHello() {
  return (
    <button
      onClick={() => {
        greeting('blastro + trpc')
          .then((res) => console.log({ res }))
          .catch((err) => console.error({ err }))
      }}
    >
      ServerFn Hello
    </button>
  )
}

const splitHello = split$(() => console.log('I am code split!'))

function SplitHello() {
  return <button onClick={() => splitHello()}>Split Hello</button>
}

const inlineSecret = server$('I am an inline server secret!')

export function App() {
  console.log('Do you know the server secret?', secret ?? 'Nope.')
  console.log(
    'Do you know the inline server secret?',
    inlineSecret ?? 'Not even.',
  )

  return (
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <div>Hello world</div>
        <ServerHello />
        <SplitHello />
        <Scripts />
      </body>
    </html>
  )
}

function Scripts() {
  return <script type="module" src="/src/app/entry-client.tsx"></script>
}
