# j29n [![Build Status][travis-image]][travis-url] [![Code Coverage][coverage-image]][coverage-url] [![Code Climate][climate-image]][climate-url] [![Dependency Status][dependencies-image]][dependencies-url] [![devDependency Status][dev-dependencies-image]][dev-dependencies-url]

[travis-image]: https://travis-ci.org/soldag/j29n.svg?branch=master
[travis-url]: https://travis-ci.org/soldag/j29n

[coverage-image]: https://codeclimate.com/github/soldag/j29n/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/soldag/j29n/coverage

[climate-image]: https://codeclimate.com/github/soldag/j29n/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/soldag/j29n

[dependencies-image]: https://david-dm.org/soldag/j29n.svg
[dependencies-url]: https://david-dm.org/soldag/j29n

[dev-dependencies-image]: https://david-dm.org/soldag/j29n/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/soldag/j29n?type=dev

*j29n* (short for *JavaScript Internationalization*) is a simple and lightweight GNU gettext implementation for JavaScript. It makes it easy to load translations from PO or MO files and use them for localization in both  browser and Node.JS. The library supports different translation domains, contexts and plural forms. Additionally, it comes with an built-in string formatting mechanism for parameterized messages.

*j29n* was inspired by [Pomo](https://github.com/cfv1984/Pomo).


# Installation
*j29n* is published on [npmjs](https://www.npmjs.com/package/j29n) and can be installed using *npm*. 

`npm install j29n`

### Browser Bundles
For the use in the browser, the source files have to be bundled together with their dependencies first. This bundled file and a minimized version were shipped with each NPM release and can be found in the `dist` directory. Additionally, the files are attatched to the respective GitHub releases. Alternatively, [grunt](https://github.com/gruntjs/grunt) can be used to build them from source manually by executing `grunt browser`.

*j29n* supports AMD module loading, so [RequireJS](https://github.com/requirejs/requirejs) can be used. Alternatively, the library can simply be embedded in an HTML page using the `script` tag. In this case, the *j29n* module will be made globally available.

# Usage
The *j29n* module exports a `j29n` object, which is a singleton responsible for all the internationalization work and the only point of contact with the library.

### Loading translation files

##### Load translations from string
```js
j29n.load({
  mode: 'string',
  data: '\
        #: path/to/file.js:42 \
        msgctxt "Optional Context" \
        msgid "Original string" \
        msgstr "Translation"', //the literal PO contents
  domain: 'messages', // optional
});
```

##### Load translations by AJAX request (Browser-only)

```js
j29n.load({
  mode: 'ajax',
  url: 'url/to/file.mo',
  type: 'application/gettext-mo', // or 'application/gettext-po' for PO files
  domain: 'messages' // optional
  ready: function() {
    // Optional callback is executed, when loading has finished successfully
  }
});
```

Translations can alternatively be loaded by AJAX request using the html `link` tag as shown in the following example:
```html
<link href="/url/to/file.mo" type="application/gettext-mo" data-domain="optional domain" />
<script type="text/javascript">
  j29n.load({
    mode: 'link',
    ready: function() {
      // Optional callback is executed, when loading has finished successfully
    }
  });
</script>
```

##### Load translations from file system (Node-only)

```js
j29n.load({
  mode: 'file',
  path: '/path/to/file.mo',
  domain: 'messages' // optional
  ready: function() {
    // Optional callback is executed, when loading has finished successfully
  }
});
```

### Translate messages
*j29n* provides the following standard gettext functions for translating messages. For each of the functions, `placeholderValues` is an optional argument.

```js
j29n.gettext(key, placeholderValues);
j29n.dgettext(domain, key, placeholderValues);
j29n.cgettext(context, key, placeholderValues);
j29n.dcgettext(domain, context, key, placeholderValues);
j29n.ngettext(singularKey, pluralKey, numericValue, placeholderValues);
j29n.dngettext(domain, singularKey, pluralKey, numericValue, placeholderValues);
j29n.cngettext(context, singularKey, pluralKey, numericValue, placeholderValues);
j29n.dcngettext(domain, context, singularKey, pluralKey, numericValue, placeholderValues);
```

Additionally, you can use the universal `translate` function, which calls the appropriate gettext function depending on the provided arguments. Please note, that `cgettext` and `cngettext` are not supported by `translate`. 

```js
j29n.translate(key, placeholderValues);
```

##### String formatting

Each of the functions above accepts an array of placeholder values for string formatting. 

```js
j29n.gettext('First three letters of the alphabet are %s, %s and %s.', ['a', 'b', 'c']);
```

Named placeholders are also supported. These placeholders refer to keys within an object you pass to the function. 

```js
j29n.gettext('First three letters of the alphabet are %(first)s, %(second)s and %(third)s.', {
  first: 'a',
  second: 'b'
  third: 'c'
});
```

For detailed documentation about string formatting (especially syntax of placeholders) have a look at [sprintf.js](https://github.com/alexei/sprintf.js), which is used internally.

##### Fuzzy translations
Per default, translations marked as *fuzzy* are ignored by the library. You can change the behavior using the ```setIgnoreFuzzy```
function:

```js
j29n.setIgnoreFuzzy(false);
```

# Testing

[Jasmine](https://github.com/jasmine/jasmine) is used as test framework for *j29n*. All features are tested using Node.JS only, so there is no need for browser testing so far. Tests are located in ```test/spec``` and can be executed using ```npm test```. 

# License
This library is provided under [MIT license](https://raw.githubusercontent.com/soldag/j29n/master/LICENSE.md).
