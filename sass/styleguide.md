# Style Guide

This application is a living style guide, generated from KSS documented styles.

## Pages
- [Main Style Guide](/)
- [Basic Page](/basic/)
- [News Page](/news/)

## Getting started with Gulp

Grab NVM to make sure you're using the right version of NodeJS.

```
nvm use
```

Next install all gulp dependencies declared in the package.json file. From the theme directory run:

```
npm install
```

Sweet. Gulp should be ready to go. Let's make it do work. Here's a list of the available gulp commands.

+ ### gulp
  Compiles Sass and regenerates the style guide using KSS Node.
  
  ```
  npm run gulp
  ```

+ ### gulp-styleguide
  Regenerates the styleguide _without_ recompiling Sass.
  
  ```
  npm run gulp-styleguide
  ```

+ ### gulp-watch
  Watches Sass files in current theme directory. When a file is changed Sass will be recompiled.
  Also uses [browser-sync](http://www.browsersync.io/) for hot pushing css updates.
  
  ```
  npm run gulp-watch
  ```
