# \<etools-loading\>

Loading spinner.

You can use this loading element:
- with an overlay: the loading spinner, message and overlay will be shown over your content area;
- simple, no overlay: the loading spinner and the message will be displayed inline-block.

## Styling

You can use defined variables for styling.

Custom property | Description | Default
----------------|-------------|----------
`--etools-loading-overlay-transparency` | Overlay transparency | `0.6`
`--etools-loading-msg-color` | Loading message color | `#333333`
`--etools-loading-spinner-size` | Spinner size (width & height) | `20px`
`--etools-loading-bg-color` | Background color | `#ffffff`
`--etools-loading-border-color` | Border color | `#dedede`
`--etools-loading-shadow-color` | Shadow color | `#333333`

To change spinner colors use paper-spinner styling variables([paper-spinner docs](https://elements.polymer-project.org/elements/paper-spinner))


## Usage
```html
<etools-loading active>Loading text here...</etools-loading>

<etools-loading active overlay="no-overlay">Loading text here...</etools-loading>
```

Available attributes:
* active: Boolean, default: false
* loadingText: String, default: 'Loading data'
* overlay: String, default: 'overlay'

## Install
```bash
$ bower install --save etools-loading
```

## Preview element locally
Install needed dependencies by running: `$ bower install`.
Make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `$ polymer serve` to serve your element application locally.

## Running Tests

```
$ polymer test
```
