# Welcome to Octagon API 🥊

## 📜 Description

This is an **open source project**, created by a group of developers who loves MMA.

Our purpouse is to provide a **free and fast API** from this popular sport. There were lots of APIs for everything you can imagine, except MMA. That's the reason we created **Octagon API**

Now, MMA fan developers can create their own projects with their favourite fighters information, bringing a breath of fresh air to the common API based projects.

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

## 🤖 Scripts

|      Script       |     Params      | Function                                                                                              |
| :---------------: | :-------------: | ----------------------------------------------------------------------------------------------------- |
|     `api:dev`     |                 | Starts a local instance of the API service.                                                           |
|   `api:publish`   |                 | Publishes the API. Requires `wrangler` installed and logged.                                          |
|     `scrape`      |                 | Updates the `/db` the complete scraper: rankings and then fighter by fighter.                         |
| `scrape:figther`  | `--{fighterId}` | Updates `/db/fighters.json` with the provided fighter. Example: `yarn scrape:fighter --amanda-nunes`. |
| `scrape:rankings` |                 | Updates `/db/rankings.json`.                                                                          |
|   `lighthouse`    |                 | Generates and insert Lighthouse report badges in the `README.md`.                                     |

# Project technical information

## 👩‍💻 Technologies

- **Front End**: Astro, Svelte, React
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

## Lighthouse report

<!-- lightouse-badges:start -->

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="114" height="18" role="img" aria-label="performance: 98%"><title>performance: 98%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0"  stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1"  stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="r"><rect width="114" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="79" height="18" fill="#555"/><rect x="79" width="35" height="18" fill="#00ff00"/><rect width="114" height="18" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="405" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="690">performance</text><text x="405" y="130" transform="scale(.1)" fill="#fff" textLength="690">performance</text><text aria-hidden="true" x="955" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="250">98%</text><text x="955" y="130" transform="scale(.1)" fill="#fff" textLength="250">98%</text></g></svg>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="118" height="18" role="img" aria-label="accessibility: 100%"><title>accessibility: 100%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0"  stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1"  stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="r"><rect width="118" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="75" height="18" fill="#555"/><rect x="75" width="43" height="18" fill="#00ff00"/><rect width="118" height="18" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="385" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="650">accessibility</text><text x="385" y="130" transform="scale(.1)" fill="#fff" textLength="650">accessibility</text><text aria-hidden="true" x="955" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="330">100%</text><text x="955" y="130" transform="scale(.1)" fill="#fff" textLength="330">100%</text></g></svg>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72" height="18" role="img" aria-label="seo: 100%"><title>seo: 100%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0"  stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1"  stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="r"><rect width="72" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="29" height="18" fill="#555"/><rect x="29" width="43" height="18" fill="#00ff00"/><rect width="72" height="18" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="155" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="190">seo</text><text x="155" y="130" transform="scale(.1)" fill="#fff" textLength="190">seo</text><text aria-hidden="true" x="495" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="330">100%</text><text x="495" y="130" transform="scale(.1)" fill="#fff" textLength="330">100%</text></g></svg>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="130" height="18" role="img" aria-label="best-practices: 100%"><title>best-practices: 100%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0"  stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1"  stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="r"><rect width="130" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="87" height="18" fill="#555"/><rect x="87" width="43" height="18" fill="#00ff00"/><rect width="130" height="18" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="445" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="770">best-practices</text><text x="445" y="130" transform="scale(.1)" fill="#fff" textLength="770">best-practices</text><text aria-hidden="true" x="1075" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="330">100%</text><text x="1075" y="130" transform="scale(.1)" fill="#fff" textLength="330">100%</text></g></svg>

<!-- lightouse-badges:end -->
