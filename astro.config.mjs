import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import icon from "astro-icon";
import opengraphImages, { presets } from "astro-opengraph-images";

// https://astro.build/config
export default defineConfig({
  site: "https://astrofolio.pages.dev",
  redirects: {
    "/github": "https://github.com/vrn21",
    "/linkedin": "https://linkedin.com/in/hi-from-varun-",
    "/twitter": "https://x.com/theVRN21",
    "/design": "https://www.figma.com/design/lLZ2Vxs5FLIAhwlUDUuC0V/PortFolio",
    "/resume": "https://drive.google.com/file/d/1m2Dv756U_nu552b4mS2dqUevLjH75XDZ/view?usp=sharing",
  },
  integrations: [
    mdx({
      image: {
        domains: ["unsplash.com"],
      },
      optimize: true,
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
          langs: [],
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: {
              className: "anchor",
            },
          },
        ],
        rehypeKatex,
      ],
      gfm: true,
    }),
    sitemap(),
    tailwind(),
    react({
      experimentalReactChildren: true,
    }),
    icon({
      include: {
        "fa6-solid": ["rss", "circle-half-stroke"],
        tabler: ["mail-filled"],
        "fa6-brands": ["x-twitter", "github", "instagram", "linkedin-in"],
      },
    }),
    opengraphImages({
      render: presets.waveSvg,
      options: {
        fonts: [
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"
            ),
          },
        ],
      },
    }),
  ],
  output: "static",
});
