# Landing Page Template

Create a landing page quickly with **HTML**, **autoprefixed SASS**, and latest **transpiled JavaScript**.

## Includes

* Autoprefixer for your browser CSS needs
* Babel for writing > ES2015 and beyond
* SASS support
* Normalize.scss to standardize styles across browsers
* CSS, JS, and HTML minified in production, automatic `<link>` tag and `<script>` tag injection
* webpack-dev-server for seeing your page in development.

## Get Started

To start using this template, clone the repo and install dependencies

```bash
git clone https://github.com/ericyang321/html-js-css-webpack-template.git
npm install
```

Start writing creating JavaScript files in `src/scripts`, and CSS files in `src/stylesheets`.

Build process is separated between development and production

### Development
* No CSS autoprefixing(for browser source readability)
* JavaScript transpiled
* Has source maps

To see your template in action during development, run
```sh
npm start
```
Access site at `localhost:3000`

### Production
* CSS Autoprefixed and minified
* JavaScript transpiled and minified
* Source maps removed

To build website for production and distribution, run

```sh
npm run build
```

## Autoprefixer

CSS is autoprefixed with [postcss autoprefixer](https://github.com/postcss/autoprefixer). This repo currently autoprefixes based on browserlist requirements in `package.json` ("> 0.25%", "ie 10", "ie 11")

To customize your own, modify `package.json` browserlist array.

## Deployment
`npm run build` creates a build directory with a production build of your app.
Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to statics (CSS, JavaScripts) like `main.<hash>.js` are served through `/` root url

### [Netlify](https://www.netlify.com/)

**To do a manual deploy to Netlify’s CDN:**

```sh
npm install netlify-cli -g
netlify deploy
```

Choose `build` as the path to deploy.

### [Now](https://zeit.co/now)

Now offers a zero-configuration single-command deployment. You can use `now` to deploy your app for free.

1. Install the `now` command-line tool either via the recommended [desktop tool](https://zeit.co/download) or via node with `npm install -g now`.

2. Build your app by running `npm run build`.

3. Move into the build directory by running `cd build`.

4. Run `now --name your-project-name` from within the build directory. You will see a **now.sh** URL in your output like this:

    ```
    > Ready! https://your-project-name-tpspyhtdtk.now.sh (copied to clipboard)
    ```

    Paste that URL into your browser when the build is complete, and you will see your deployed app.

Details are available in [this article.](https://zeit.co/blog/unlimited-static)

### [Surge](https://surge.sh/)

Install the Surge CLI if you haven’t already by running `npm install -g surge`. Run the `surge` command and log in you or create a new account.

When asked about the project path, make sure to specify the `build` folder, for example:

```sh
project path: /path/to/project/build
```

Note that in order to support routers that use HTML5 `pushState` API, you may want to rename the `index.html` in your build folder to `200.html` before deploying to Surge. This [ensures that every URL falls back to that file](https://surge.sh/help/adding-a-200-page-for-client-side-routing).
