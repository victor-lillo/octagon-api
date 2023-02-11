# Welcome to Octogon API

- Cuando haya cambio de campeón de una división, actualizar su imagen y la del antiguo campeón
- [Paleta de colores](https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226)

- **Website URL:** https://www.octogon-api.com/
- **Website URL:** https://octogon-api.vercel.app/

- **API URL:** https://api.octogon-api.com/
- **API URL:** https://octogon-api.fentos.workers.dev/

## Internal values

- **Breakpoints**
  - **Tablet:** 768px (48rem)
  - **Desktop:** 1024px (64rem)

## Available scripts

|      Script       |     Params      | Function                                                                                              |
| :---------------: | :-------------: | ----------------------------------------------------------------------------------------------------- |
|     `api:dev`     |                 | Starts a local instance of the API service.                                                           |
|   `api:publish`   |                 | Publishes the API. Requires `wrangler` installed and logged.                                          |
|     `scrape`      |                 | Updates the `/db` the complete scraper: rankings and then fighter by fighter.                         |
| `scrape:figther`  | `--{fighterId}` | Updates `/db/fighters.json` with the provided fighter. Example: `yarn scrape:fighter --amanda-nunes`. |
| `scrape:rankings` |                 | Updates `/db/rankings.json`.                                                                          |

## Available API endpoints

| Endpoint                    | Response                      |
| --------------------------- | ----------------------------- |
| GET `/rankings`             | Returns whole rankings info.  |
| GET `/fighters`             | Returns all fighters info.    |
| GET `/fighter/:fighterId`   | Returns single fighter info.  |
| GET `/division/:divisionId` | Returns single division info. |

## ⏰ Recent activity

<!--START_SECTION:activity-->
1. 🎉 Merged PR [#8](https://github.com/fentosv/octogon-api/pull/8) in [fentosv/octogon-api](https://github.com/fentosv/octogon-api)
2. 💪 Opened PR [#8](https://github.com/fentosv/octogon-api/pull/8) in [fentosv/octogon-api](https://github.com/fentosv/octogon-api)
3. 💪 Opened PR [#2481](https://github.com/withastro/docs/pull/2481) in [withastro/docs](https://github.com/withastro/docs)
4. 🎉 Merged PR [#6](https://github.com/fentosv/color-shader/pull/6) in [fentosv/color-shader](https://github.com/fentosv/color-shader)
5. 💪 Opened PR [#6](https://github.com/fentosv/color-shader/pull/6) in [fentosv/color-shader](https://github.com/fentosv/color-shader)
<!--END_SECTION:activity-->
