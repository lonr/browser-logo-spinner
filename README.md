# browser-logo-spinner

Use browser logos as spinners!

![chrome](./assets/infinite-loop/chrome.svg)
![edge](./assets/infinite-loop/edge.svg)
![firefox](./assets/infinite-loop/firefox.svg)
![opera](./assets/infinite-loop/opera.svg)
![safari](./assets/infinite-loop/safari.svg)

## Installation

```bash
yarn add @lonr/browser-logo-spinner
```

## Usage

This package provides several specific elements (e.g. `<chrome-spinner>`) and a `<browser-logo-spinner>` element which auto detects the visitor's UA and chooses one logo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Usage</title>
    <script defer src="https://unpkg.com/@lonr/browser-logo-spinner"></script>
  </head>
  <body>
    <chrome-spinner style="width: 100px" loading></chrome-spinner>
    <browser-logo-spinner
      style="width: 200px"
      loading
      delay="500"
      faster-rate="3"
    ></browser-logo-spinner>
  </body>
</html>
```

`spinner.setAttribute('loading', '')` or `spinner.loading = true` to mark the spinner loading. The spinner will wait for `delay`(defaults to `200`ms) and then starting spinning

Then `spinner.removeAttribute('loading')` or `spinner.loading = false` to mark the spinner loaded. The spinner will speed up(controlled by `faster-rate`; defaults to `2`) and stop at the end of the current iteration

You should at least size the element or one of it's parent elements

You probably want to set an initial `loading` attribute

```html
<browser-logo-spinner style="width: 100px" loading></browser-logo-spinner>
```

There is also a [storybook](https://lonr.github.io/browser-logo-spinner) playground

## Limitations

The Opera spinner is broken in Firefox and Safari

Higher CPU usage
