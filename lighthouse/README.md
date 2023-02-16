# Lighthouse badge generator

## 📜 Description

Generates SVG with Lighthouse reports for one URL and inserts them in the desired `.md` file.

## 👩‍💻 Required modules

- [lighthouse](https://www.npmjs.com/package/lighthouse)
- [badge-maker](https://www.npmjs.com/package/badge-maker)

## 🦾 How to use

|    Param     |                                   Value                                    |    Default    | Required | Description                              |
| :----------: | :------------------------------------------------------------------------: | :-----------: | :------: | ---------------------------------------- |
|    `url`     |                                  `string`                                  |               |    ✅    | URL to audit with Lighthouse.            |
|   `mdName`   |                                  `string`                                  | `'README.md'` |          | File where the badges will be injected.  |
| `badgeStyle` | `'plastic'` \|`'flat'` \| `'flat-square'` \|`'for-the-badge'` \|`'social'` |  `'plastic'`  |          | Select the style of the generated badge. |

Fill the `lighthouse.config.json` file with the necessary information.

```json
{
  "url": "",
  "mdName": "README.md",
  "badgeStyle": "plastic"
}
```

Add this line in the desired file. This will be the entry point of the injected badges.

```
<!-- lightouse-badges:start -->
```

Run `/lighthouse/index.js` to start the script.

|      Script       | Function                                                          |
| :---------------: | ----------------------------------------------------------------- |
| `node lighthouse` | Generates and insert Lighthouse report badges in the `README.md`. |
