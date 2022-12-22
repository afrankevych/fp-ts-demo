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

## Billion dollar mistake fixed

Considering this code

```ts
const data = fetchRemoteData(id)
```

Is it data? Is it null? Is it undefined? It's superman?

It's Option!

```ts
type Option<T> = { _tag: "none" } | { _tag: "some", value: T }
```

@see `src/option.ts`

## Purifying errors

Considering this code

```ts
const compute = (n: number) => n * 2;
```

`compute` is pure because it's referentially transparent

```ts 
const x = compute(3)
const y = 6;

console.log(x === y); // true
```

What about errors?

```ts
const computeF = (n: number) => {
    if (n >= 3) {
        throw new Error("Value too high!")
    }
    
    return n * 2;
};
```

`computeF` is not pure because it's not referentially transparent

```ts 
const x = computeF(3)
const y = 6;

console.log(x === y); // false
```

Red pill or blue pill?

```ts
type Either<T1, T2> = {_tag: "left", value: T1} | {_tag: "right", value: T2};
```

@see `src/either.ts`
