# Welcome to Octogon API

- Cuando haya cambio de campeón de una división, actualizar su imagen y la del antiguo campeón
- [Paleta de colores](https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226)

- **API URL:** https://octogon-api.fentos.workers.dev/

- TODO: Refactorizar para permitir la búsqueda de un sólo peleador.

```js
const ARG_SELECTOR = '--'
const findArg = process.argv.find((el) => el.startsWith(ARG_SELECTOR)).replace(ARG_SELECTOR, '')

console.log(findArg)
```
