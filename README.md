# Welcome to Octagon API 🥊

## 🚦 Lighthouse Score

<div align="center" width="100%">
<!-- lightouse-badges:start -->

![performance](./lighthouse/results/performance.svg)
![accessibility](./lighthouse/results/accessibility.svg)
![seo](./lighthouse/results/seo.svg)
![best-practices](./lighthouse/results/best-practices.svg)

<!-- lightouse-badges:end -->
</div>

## 📜 Description

This is an **open source project**, created by a group of developers who love MMA.

Our purpose is to provide a **free and fast API** from this popular sport. There were lots of APIs for everything you can imagine, except MMA. That's the reason we created **Octagon API**.

Now, MMA fan developers can create their own projects with their favorite fighters information, bringing a breath of fresh air to the common API based projects.

Also, we created a **web page** for displaying our database information.

- **Website URL:** https://www.octagon-api.com/

- **API URL:** https://api.octagon-api.com/

## 🗃 API endpoints

```txt
https://api.octagon-api.com/
```

| Endpoint                    | Response                      |
| --------------------------- | ----------------------------- |
| GET `/rankings`             | Returns whole rankings info.  |
| GET `/fighters`             | Returns all fighters info.    |
| GET `/fighter/:fighterId`   | Returns single fighter info.  |
| GET `/division/:divisionId` | Returns single division info. |

For more extensive documentation, go to the [API documentation](https://www.octagon-api.com/api-documentation)

## 🤖 Scripts

|      Script       |     Params      | Function                                                                                           |
| :---------------: | :-------------: | -------------------------------------------------------------------------------------------------- |
|     `api:dev`     |                 | Starts a local instance of the API service.                                                        |
|   `api:publish`   |                 | Publishes the API. Requires `wrangler` installed and logged.                                       |
|     `scrape`      |                 | Updates the `/db` the complete scraper: rankings and then fighter by fighter.                      |
| `scrape:fighter`  | `--{fighterId}` | Updates `/db/fighters.json` with the provided fighter. Example: `pnpm scrape:fighter --jon-jones`. |
| `scrape:fighters` |                 | Updates complete `/db/fighter.json`.                                                               |
| `scrape:rankings` |                 | Updates `/db/rankings.json`.                                                                       |
|   `lighthouse`    |                 | Generates and insert Lighthouse report badges in the `README.md`.                                  |

# Project technical information

## 👩‍💻 Technologies

- **Front End**: Astro, Svelte
- **PostCSS**: autoprefixer
- **Scraper**: NodeJS and node-html-parser
- **API**: hono
- **Image processing**: sharp

## 🦾 Providers

- **Web hosting**: Vercel
- **API endpoints**: Cloudfare workers

## 🎨 UI and web design

- This is the used [**color palette**](https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226).

- These are the **breakpoints** used in the responsive design:
  - **Tablet:** `768px (48rem)`
  - **Desktop:** `1024px (64rem)`
