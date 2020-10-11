const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://discordeno-helper.netlify.app',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/brand.svg',
    logoLink: 'https://deno.land',
    title: 'Discordeno Helper',
    githubUrl: 'https://github.com/Suyashtnt/Discordeno-Helper',
    helpUrl: 'https://discord.gg/yv2sSFu',
    tweetText: '',
    social: ``,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/codeblock',
    ],
    collapsedNav: [
      '/codeblock', // add trailing slash if enabled above
    ],
    links: [
      { text: 'Deno', link: 'https://deno.land' },
      { text: 'discordeno', link: 'https://discordeno.netlify.app/' },
    ],
    frontline: false,
    ignoreIndex: true,
    title:
      "<div class='greenCircle'></div><a href='https://github.com/Suyashtnt/Discordeno-Helper'>discordeno helper</a><div class='greenCircle'></div>",
  },
  siteMetadata: {
    title: 'Discordeno Helper',
    description: 'The ultimate discordeno framework',
    ogImage: null,
    docsLocation: 'https://github.com/suyashtnt/discordeno-helper/tree/master/docs/content',
    favicon:
      'https://raw.githubusercontent.com/denolib/high-res-deno-logo/master/deno_hr_circle.svg',
  },
  pwa: {
    enabled: true, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Discordeno helper',
      short_name: 'DisDeno Helper',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
