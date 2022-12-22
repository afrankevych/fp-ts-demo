import { pipe, flow } from 'fp-ts/function';

const toUppercase = (text: string) => text.toUpperCase();
const appendExclamationMark = (text: string) => `${text}!!`;
const prependSpeaker = (text: string) => `🔊 ${text}`;

const shoutTraditional = (text: string) => prependSpeaker(appendExclamationMark(toUppercase(text)));
// console.log(shoutTraditional("prontone"));

const shoutPipe = (text: string) => pipe(
    text,
    toUppercase,
    appendExclamationMark,
    prependSpeaker
);

const shoutFlow = flow(
    toUppercase,
    appendExclamationMark,
    prependSpeaker
);

// console.log(shoutPipe("prontone"));
// console.log(shoutFlow("ciaone"));