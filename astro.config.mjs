import { defineConfig } from 'astro/config'

import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code'
// https://astro.build/config
import svelte from '@astrojs/svelte'

// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://octagon-api.com/',
  integrations: [
    svelte(),
    react(),
    sitemap(),
    expressiveCode({
      plugins: [
        {
          name: 'custom-style',
          baseStyles: () => `
          .frame {
            margin: 0.7rem 0;
          }
          .frame .header {
            border-bottom: 2px solid #313131;
          }
          .frame code {
            padding: 0.7rem 0;
          }
          .frame.has-title code {
            padding-top: 0.5rem;
          }
          .frame.has-title:not(.is-terminal) .title {
            font-size: 1.1rem;
            background: linear-gradient(to top, var(--color-green-700) 1.5px, transparent 1.5px),linear-gradient(hsl(269deg 40% 65% / 0.15), hsl(269deg 40% 65% / 0.15));
            background-clip: padding-box;
            margin-block-start: 0;
            padding: 0.25rem 1rem;
            border-radius: 0.3rem 0.3rem 0 0;
            border: 1.5px solid transparent;
            border-bottom: none;
          },
          .frame.has-title:not(.is-terminal) .header {
            display: flex;
            background: linear-gradient(to top, transparent 0px, transparent 0px),linear-gradient(#212121, #212121);
            background-repeat: no-repeat;
            padding-inline-start: 0;
        }
          `,
          hooks: {},
        },
      ],
      useThemedScrollbars: false,
      useThemedSelectionColors: false,
      styleOverrides: {
        frames: {
          styleOverrides: {
            frameBoxShadowCssValue: 'none',
          },
        },
        uiLineHeight: 'inherit',
        codeFontSize: '1rem',
        codeLineHeight: '1.4rem',
        borderRadius: '4px',
        borderWidth: '0px',
      },
    }),
    mdx(),
  ],
})
