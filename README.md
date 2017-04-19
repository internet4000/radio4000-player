# Radio4000 Player

A player for Radio4000 channels.

It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to use

Copy this snippet and paste it on your own website. Remember to change the `slug=""` part to match the radio you want to play. 

```html
<script async src="https://rawgit.com/Internet4000/radio4000-player-vue/master/dist/radio4000-player.min.js"></script>
<radio4000-player slug="good-time-radio"></radio4000-player>
```

- Try it out: https://jsbin.com/siluwub/4/edit?html,output
- Find more radios: https://radio4000.com/all

## API

Since `<radio4000-player`> is a web component, you can change the radio currently being played like this:

```js
var player = document.querySelector('radio4000-player')
player.slug = 'sugar-hiccup'
```

## Development

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:5000
yarn start

# build for production with minification
yarn build
```

For more information see the [docs for vueify](https://github.com/vuejs/vueify).

