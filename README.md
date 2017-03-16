# Radio4000 Player

A player for Radio4000 channels.

It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to use

To use it, copy the `dist/radio4000-player.min.js` file from this repository and insert this markup. Change the `channel` attribute to use the radio you want.

```markup
<script async src="radio4000-player.min.js"></script>
<div id="radio4000-player" channel="my-radio"></div>
```

## Development

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

For more information see the [docs for vueify](https://github.com/vuejs/vueify).
