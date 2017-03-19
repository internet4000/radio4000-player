# Radio4000 Player

A player for Radio4000 channels.

It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to use

To use it, copy this snippet and change the `slug="my-radio"` part to match the radio you want to play.

```html
<script async src="https://rawgit.com/Internet4000/radio4000-player-vue/master/dist/radio4000-player.min.js"></script>
<div id="radio4000-player" slug="good-time-radio"></div>
```

- Try it out: http://jsbin.com/siluwub/1/edit?html,output
- Find more radios: https://radio4000.com/all

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
