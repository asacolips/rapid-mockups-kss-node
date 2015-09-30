# Rapid HTML Mockups with kss-node

Have you ever needed to get a head start on front-end theme development while you're still waiting on content types and other back-end work to be finalized? [kss-node](https://github.com/kss-node/kss-node) already makes it easy to create a living style guide and use that to speed up development, but you can also leverage the power of kss-node to generate HTML mockup sites that can be developed on the front-end and then handed off to back-end developers later in the project. 

## View the Demo

So what exactly do I mean by HTML mockups? Take a look at the [demo](http://asacolips.github.io/rapid-mockups-kss-node) to see the compiled style guide. The left sidebar contains the style guide navigation, and the overview links to full page HTML mockups built using kss.

## Getting Started
- `npm install`
- `npm run gulp`
- `npm run gulp styleguide`
- `npm run gulp compress`
- `npm run gulp browser-sync`

Once you've run the `browser-sync` command, your browser should automatically open up to http://localhost:3000, and load the demo site there.

## Examples

If you look through the `sass` directory, you can see an example of how the pages are built. The sass is broken up using SMACSS principles, so you'll find sections for **base**, **components**, **documentation**, **layout**, **pages**, **utils**, and **vendor** code. The two most important sections for our purposes are components and pages.

### Components
To do

### Pages
To do

### The `styleguide` directory and how to make new pages