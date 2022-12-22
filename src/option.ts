import * as O from "fp-ts/Option";
import {flow, pipe} from "fp-ts/function";

const db = {
    things: [
        {
            id: 0,
            value: "foo"
        },
        {
            id: 1,
            value: "bar"
        }
    ]
};

const thingsRepository = ({
    fetch: (id: number) => db.things.find(thing => thing.id === id)
});

const decode = (s: string) => s.toUpperCase();
const present = (s: string) => "Here's your thing: " + s;
const decorate = (s: string) => `✨ ${s} ✨`;

const elaborateTraditional = (id: number) => {
    const thing = thingsRepository.fetch(id)
    if (thing !== undefined) {
        return decorate(present(decode(thing.value)));
    }

    return "Error: entry not found";
}

// console.log("Traditional way: ", elaborateTraditional(0));
// console.log("Traditional way: ", elaborateTraditional(42));

const elaborateOption = flow(
    thingsRepository.fetch,
    O.fromNullable,
    O.map(thing => pipe(
        thing.value,
        decode,
        present,
        decorate)
    ),
    O.getOrElse(() => "Error: entry not found")
);

// console.log("Option way: ", elaborateOption(1));
// console.log("Option way: ", elaborateOption(42));
