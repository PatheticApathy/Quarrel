---
id: 1726784240-YMSF
aliases:
  - TypeScript
tags:
  - javascript
  - typescript
---

# TypeScript

Typescript is Javascript with extra steps, but those steps make JS better for bigger projects
this is like a tiny band-aid

From node
"Basically, TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor or in your CI/CD pipeline, and write more maintainable code."

## Types and psuedo objects

```Typescript
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine = {
  name: 'Justine',
  age: 23,
} satisfies User;

const isJustineAnAdult = isAdult(justine);
```

The `type` keyword is how you specify custom types
The function uses the newly declared type and returns the boolean
The `satifies` keyword used to declare a instance of custom type

## how to compile

Install tsc package

```Shell
npm i -D typescript # -D is a shorthand for --save-dev
```

Compile tsc with

```Shell
npx tsc example.ts
```

Then you can run as you would normally

```Shell
npm example.js
```

## Resources

- <https://nodejs.org/en/learn/typescript/introduction>
