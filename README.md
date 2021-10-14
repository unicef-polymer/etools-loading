# \<etools-loading\>

Loading spinner.

You can use this loading element:
- with an overlay:
    - default state has the loading spinner and message

	- if the control has 'absolute' attribute (TODO - there is a contradiction between attribute name-`absolute` and the fact that it sets `position:fixed`), the overlay will cover the entire screen, otherwise, the overlay will be shown over your content area,
    make sure your content area has position relative.

    - Use `LoadingMixin` to create the loading element when your custom element is stamped (`createLoading`);
    make sure you remove the loading element in your element detached state using `removeLoading(loadingElement)`.

	- By default, the overlay will be displayed over the `body`, but if `LoadingMixin` it's used and property `etoolsLoadingContainer` is set
	then this will be used as container.

- simple, no overlay, inline block: the loading spinner and the message will be displayed inline-block.

## Usage

### Default. The loading it's placed inside a container:
```html
<etools-loading active>Loading text here...</etools-loading>
```
![Loading inside a container](img/etools-loading-contained.png)

### Inline block loading:
```html
<etools-loading no-overlay active>Loading text here...</etools-loading>
```
![Loading inside a container](img/etools-loading-inline-block-position.png)

### Absolute positioning
```html
<etools-loading absolute active>Loading text here...</etools-loading>
```
![Loading inside a container](img/etools-loading-absolute-position.png)

## Install
TODO: create npm package
```bash
$ npm i --save unicef-polymer/etools-loading#branch_name
```

## Preview element locally
Install needed dependencies by running: `$ npm install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.


Update demo interface: `$ polymer analyze demo/index.html > analysis.json`

## Linting the code

Install local npm packages (run `npm install`)
Then just run the linting task

```bash
$ npm run lint
```

## Running Tests
TODO: improve and add more tests
```
$ polymer test
```

## Circle CI

Package will be automatically published after tag push (`git tag 1.2.3` , `git push --tags`). Tag name must correspond to SemVer (Semantic Versioning) rules.  
Examples:

| Version match      | Result   |
| ------------------ | -------- |
| `1.2.3`            | match    |
| `1.2.3-pre`        | match    |
| `1.2.3+build`      | match    |
| `1.2.3-pre+build`  | match    |
| `v1.2.3-pre+build` | match    |
| `1.2`              | no match |

You can see more details [here](https://rgxdb.com/r/40OZ1HN5)
