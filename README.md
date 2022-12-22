# fp-ts-demo

Functional programming pillars:

- Pure functions (referentially transparent)
- Function composition

## Functional program = composition of pure functions

```
input 
  |> f1() 
  |> f2() 
  |> f3()
output
```

Fp-ts `pipe()` and `flow()` to the rescue!

```ts
import {flow} from "fp-ts/functions"

const program = flow(
    f1,
    f2,
    f3
)

program(input)
```

@see `src/pipeFlow.ts`
