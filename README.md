# Welcome to Octogon API

- Cuando haya cambio de campeón de una división, actualizar su imagen y la del antiguo campeón
- [Paleta de colores](https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226)

- **API URL:** https://octogon-api.fentos.workers.dev/

## Internal values

- **Breakpoints**
  - **Tablet:** 768px (48rem)
  - **Desktop:** 1024px (64rem)

## Available scripts

|      Script       |     Params      |                                               Function                                                |
| :---------------: | :-------------: | :---------------------------------------------------------------------------------------------------: |
|     `api:dev`     |                 |                              Starts a local instance of the API service.                              |
|   `api:publish`   |                 |                     Publishes the API. Requires `wrangler` installed and logged.                      |
|     `scrape`      |                 |             Updates the `/db` the complete scraper: rankings and then fighter by fighter.             |
| `scrape:figther`  | `--{fighterId}` | Updates `/db/fighters.json` with the provided fighter. Example: `yarn scrape:fighter --amanda-nunes`. |
| `scrape:rankings` |                 |                                     Updates `/db/rankings.json`.                                      |
