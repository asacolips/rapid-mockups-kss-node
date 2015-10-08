# Rapid HTML Mockups with kss-node

Have you ever needed to get a head start on front-end theme development while you're still waiting on content types and other back-end work to be finalized? [kss-node](https://github.com/kss-node/kss-node) already makes it easy to create a living style guide and use that to speed up development, but you can also leverage the power of kss-node to generate HTML mockup sites that can be developed on the front-end and then handed off to back-end developers later in the project. 

## View the Demo

So what exactly do I mean by HTML mockups? Take a look at the [demo](http://asacolips.github.io/rapid-mockups-kss-node) to see the compiled style guide. The left sidebar contains the style guide navigation, and the overview links to full page HTML mockups built using kss.

## Getting Started

First, clone or download this repository. The demo is setup using gulp and npm, but the actual command that compiles the style guide is a the normal shell commands for kss-node, so it would be fairly simple to either ignore the gulp file and just work directly with your terminal, or to port the style guide gulp task over to grunt.

Once the repo has been downloaded, you'll want to install the npm modules the demo uses. To do this you'll need node.js (I recommend using [Node Version Manager](https://github.com/creationix/nvm)), which includes [NPM](https://www.npmjs.com/). Once those dependencies are in place, cd into the directory where you cloned/downloaded the repository, and then install the npm packages and run [gulp](http://gulpjs.com/).

```
# install the npm modules
npm install

# compile the style guide
npm run gulp styleguide

# compress assets
npm run gulp compress

# compile sass
npm run gulp sass

# the default gulp task, runs all three of the above tasks
npm run gulp

# watch task that also starts a browser-sync server that you can use for testing
npm run gulp browser-sync
```

Once you've run the `browser-sync` command, your browser should automatically open up to http://localhost:3000, and load the demo site there.

## Examples

If you look through the `sass` directory, you can see an example of how the pages are built. The sass is broken up using SMACSS principles, so you'll find sections for **base**, **components**, **layout**, **kss-includes**, **utils**, and **vendor** code. The two most important sections for our purposes are components and kss-includes.

### sass/components
The majority of your style guide will be built in the components section of the sass directory. These should use an organizational structure with components divided into folders, and those folders should each contain a stylesheet and a [Handlebars](http://handlebarsjs.com/) markup file. For example:

```
  __ components
  |___ site-logo
    |___ _site-logo.scss
    |___ components.site-logo.hbs
  |___ main-navigation
    |___ _main-navigation.scss
    |___ components.main-navigation.hbs
```

#### Style sheets

Your component style sheets serve two purposes. First, they're where your styles are actually coming from, so you'll also want to import them in your main stylesheet. See **styleguide.main.scss** for an example of these imports.

Second, your style sheets define your components so that kss knows about them and how to use them. Each style sheet should have a comment at the top of the file such as:

```
// Site Logo
//
// The site logo is used to display the site's title in an accessible link,
// using background image replacement.
//
// Markup: components.site-logo.hbs
//
// Style guide: components.site-logo
```

If you name your component markup files (the `.hbs` files mentioned earlier) with the same naming scheme as your style guide component, you can then render those components in other handlebars templates. This is described in detail in the *How to make new style guide pages* section, but a quick example is that the site logo could be rendered inside a different handlebars file by including `{{> components.site-logo}}` to call it.

#### Handlebars markup

The other major piece of every component is the handlebars markup file. These should be named using the same naming convention as the component, so if you have a file named `_site-logo.scss` in the `components` directory, then it should be named `components.site-logo.hbs`. In addition, your style guide declaration described above should have the same name as the handlebars file, minus the `.hbs` extension, such as `components.site-logo`.

Your handlebars files can have any valid handlebars or HTML markup inside them. In addition, kss-node will treat all HTML it comes across as Handlebars markup, so your file names could instead be written as `components.component-name.html`. I personally use .hbs as the extension so that syntax highlighting happens automatically in my editor, and to remove any confusion about the syntax the file should be written in.

Using the site-logo from earlier as an example, here's what its markup file might look like:

```
<div class="site-logo">
  <a href="/" rel="home" class="site-logo__link active">Styleguide</a>
</div>
```

Using a markup file is optional. If you have an extremely short piece of markup, it's convenient to instead just define it in your style sheet's comment block using something like:

```
// Markup: <a href="#" class="js-back-to-top back-to-top">Back to top</a>
```

### sass/kss-includes

In order to make it easier to create new templates, one useful tool is to setup "components" that aren't intended for the theme itself, but instead include re-usable markup for the template files. For example, in the `sass/kss-includes` directory, there are 5 include components: css, js, html-footer, html-header, and html5shiv.

The demo is setup so that css files and js files can be defined and included in the the respective kss-includes markup. In addition, the html5shiv is used to conditionally load an html5 shiv for IE.

The html-header markup starts up the page with opening `<html>` and `<body>` tags, along with common settings such as meta tags and css includes. In addition, the `site-logo` and `main-navigation` components from the demo are rendered here, since they're common to all of the demo pages.

The html-footer markup is fairly simply, and primarily conists of closing out already opened tags and loading javascript files from the previous js markup.

### How to make new style guide pages

In order for kss-node to compile your style guide as multiple pages, it needs to have a base index.html file that it can work from. These should be placed in their own folder inside the `styleguide/templates` directory. This repository contains two examples, the **basic** template and the **news** template. In addition, the template for the actual style guide overview page that kss-node is known for is in its own template directory, `styleguide/kss-overview`.

To create a new template, make a new directory in the templates directory, and create an index.html file inside that contains the following lines:

```
{{> kss-includes.html-header title="Basic Page"}}

{{!-- START CUSTOM PAGE CONTENT --}}

{{!-- END CUSTOM PAGE CONTENT --}}

{{> kss-includes.html-footer}}
```

Because these are just normal HTML files that allow you to import the components defined earlier, you could also start from your own HTML boilerplate and add components in wherever it makes sense for your project. To make things easier, however, I've set up a `kss-includes` section in the sass directory where you can define template parts common to your various pages, such as the header, footer, and any css/js/conditional includes.

So, using the above code, this is what the Basic Page template in the demo looks like:

```
{{> kss-includes.html-header title="Basic Page"}}

{{!-- START CUSTOM PAGE CONTENT --}}
<div class="l-content-header content-header">
  <h1 class="page-title">Basic page title h1 goes here. This is what it looks like when returned.</h1>
  <h2 class="page-header">Basic page header h2 dolor sit amet nulla sin</h2>
</div>
<div class="l-content-sidebar content-sidebar">
  <article class="l-content l-page-content page-content">
    {{> components.page-content}}
  </article>
  <aside class="l-sidebar sidebar">
    {{> components.page-sidebar}}
  </aside>
</div>
{{!-- END CUSTOM PAGE CONTENT --}}

{{> kss-includes.html-footer}}
```

In the Basic Page template we're including the predefined header with title variable set to *Basic Page*. After that we're defining some custom layout HTML, and rendering the `components.page-content` and `components.page-sidebar` components that are defined in the demo's `sass/components` directory.

## Wrapping it all up

In summary:

- setup components and kss-includes in your **sass/** directory
- your components should include a **.scss** partial with comment defining it for kss-node, and Handlebars markup file with a matching name
- setup new templates in your **styleguide/templates/** directory that include an index.html file
- render and re-use the markup defined in your components by calling them with `{{> components.component-name}}` name. Variables can be passed into your component such as with `{{> components.component-name modifier_class="class--modifier"}}`
- compile your styleguide and sass using Gulp, Grunt, or directly with shell commands for kss-node.
- test your styleguide using Browser Sync, which uses the **styleguide/dist/** as its root directory

## What to do when your style guide gets huge

When you're starting to get near the finish line on your project, you'll probably start running into lengthy compile times for your style guide. Once you've got 30+ components and 10 different pages, it can often take 10-30 seconds to compile all of the pages. One method to speed this up is to only compile the templates you need while you're working, and then compile everything else after you've finished and prior to committing the code.

The include gulp taskfile includes an argument for the kss-node process that allows you to specify a specific template directory. For instance, if you wanted to compile the **styleguide/templates/basic/** template, you would use `npm run gulp styleguide-all --template='basic'`