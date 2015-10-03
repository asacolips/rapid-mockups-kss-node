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

### sass/components
The majority of your style guide will be built in the components section of the sass directory. These should use an organization structure with components divided into folders, and those folders should each contain a stylesheet and a handlebars markup file. For example:

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

Your component style sheets serve two purposes. First, they're where your styles are actually coming from, so you'll also want to import them in your main stylesheet, such as by using `@import 'components/site-logo';` in styleguide.main.scss under the *components* section.

Second, your style sheets define your component so that kss knows about it and how to use it. Each style sheet should have a comment at the top of the file such as:

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

If you name your component markup files (the `.hbs` files mentioned earlier) with the same naming scheme as your style guide component, you can then render those components in other handlebars templates. We'll take a look at how to do that below in the *pages* section.

#### Handlebars markup

The other major piece of every component is the handlebars markup file. These should be named using the same naming convention as the component, so if you have a file named `_site-logo.scss` in the `components` directory, then it should be named `components.site-logo.hbs`. In addition, your style guide declaration described above should have the same name as the handlebars file, minus the `.hbs` extension, such as `components.site-logo`.

Your handlebars files can have any valid handlebars or HTML markup inside them. For example, the site-logo described above might look like:

```
<div class="site-logo">
  <a href="/" rel="home" class="site-logo__link active">Styleguide</a>
</div>
```

Using a markup file is optional. If you have an extremely short piece of markup, it's convenient to instead just define it in your style sheet's comment block using something like:

```
// Markup: <a href="#" class="js-back-to-top back-to-top">Back to top</a>
```

### How to make new style guide pages

In order for kss-node to compile your style guide as multiple pages, it needs to have a base index.html file that it can work from. These should be placed in their own folder inside the `styleguide/templates` directory. This repository contains two examples, the **basic** template and the **news** template. These templates will usually look very similar, with the only difference being which partial from `sass/pages` is rendered.

This is where the magic of kss-node and handlebars come together to make page mockups possible with style guides. What we're doing here is starting by defining page specific content, such as the header, and layout classes. Things like the page title, layout, and more could all be unique to this file. 

We take advantage of kss-node for the article and sidebar sections, as you'll see that we're rendering handlebars partials in there using components that were defined in the `sass/components` directory. There's really no limit to what could be placed in a component, and it works really well to break up your site into lots of modular components that can be called just like this. For example, if you needed to render the logo inside the content-header, you could use `{{> components.site-logo}}` inside that div to render it wherever you need it.

Another tool you can use is that components can be rendered anywhere, not just in this pages section. For example, if you had a social share box component, you could render that inside the markup for `components.page-content` so that it comes before the article. However, it would also make sense to re-use that component in other locations, so you might also render it inside your `components.site-footer` markup.

If you break up your components well, it can make converting these mockups into templates for your CMS of choice very easy. Your back-end developer could take these layout files and replace the `{{> component.name}}` partials with calls to their CMS, such as rendering a sidebar widget area in WordPress in place of `{{> component.page-sidebar}}`

