# Vue

This is a collection of the information I have gathered on [vue.js](vuejs.org)
Right now I'm working on a twitter like application called quarrel

It's more so a replacement for _JQuery_

With Vue, we could easily make a desktop application using _Electron_ or a mobile app using _Ionic Vue_

## Single-Page Application

Vue can be used to build **single page web applications(SPA)** which can handle updates whilst also controlling the entire page.

## Sever-side rendering

Vue also supports **server side rendering(SSR)** which makes involves hydrating html templates form the server.

## Vue in action

### Single file components

Vue components can be authored using an HTML-like file format called **Single-File Components(SFC)**
which use the `.vue` extension

[more can be found here](vuejs.org/scaling-up/sfc.html)

This extension encapsulates the component's logic _Javascript_, _HTML_, _CSS_

### Api styles

Vue supports two api styles

**Option Api** and **Composition Api**

#### Option Api

with options api, component logic can be defined as `methods`, `mounted`, or `data`

Ex.

```Vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: ;
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

#### Composition Api

Newer way to do things and reduces boilerplate
typically used with `<script setup>`
`setup` attributes a hint for vue to make compile-time transforms

```Vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### which to choose?

Option model more OOP style
Composition model for functional style

## More Useful things

- [https://vuejs.org/guide/scaling-up/testing.html#testing]: Focus in unit test and component-testing