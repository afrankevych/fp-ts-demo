import * as E from "fp-ts/Either";
import {flow} from "fp-ts/function";

class TooHighError extends Error {
    private readonly _tag = "TooHighError";

    constructor(m: string) {
        super(m);
    }
}

const computeF = (n: number) => {
    if (n >= 3) {
        throw new TooHighError("Too damn high!")
    }

    return n * 2;
};

const computeE = (n: number): E.Either<TooHighError, number> => {
    return n >= 3 ? E.left(new TooHighError("Too damn high!")) : E.right(n * 2);
};

const decorate = (n: number) => `🌈🌈 ${n.toString()}`;

const elaborateWithError = (input: number) => {
    // we had to check internal implementation to know it throws an error
    try {
        return decorate(computeF(input));
    } catch (e) { // this is any 🤢
        const error = e as TooHighError;
        return `Error: ${error.message}` // hopefully we can't be sure it has a message
    }
}

const elaborateWithEither = flow(
    computeE,
    E.map(decorate),
    E.getOrElse(e => `Error: ${e.message}`)
);

// console.log("with error ok: ", elaborateWithError(2))
// console.log("with error ko: ", elaborateWithError(4))

// console.log("with either ok: ", elaborateWithEither(2))
// console.log("with either ko: ", elaborateWithEither(4))
