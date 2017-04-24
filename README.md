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

Since `<radio4000-player`> is a web component, you can change the radio currently being played by changing the `slug` attribute:

```js
var player = document.querySelector('radio4000-player')
player.slug = 'sugar-hiccup'
```

## Skins

We encourage you to customize the player just how you like. If you're familiar with CSS, you can write your own styles targeting the `<radio4000-player>` element. For instance, try putting this next to where you embed the player:

```html
<style>
radio4000-player {
	background-color: yellow;
	color: black;
}
</style>
```

For the rest of us, we have two built-in skins: *mini* and *dark*. To use either one of them, or both, add the classes like this:


- <radio4000-player class="mini"></radio4000-player>
- <radio4000-player class="dark"></radio4000-player>
- <radio4000-player class="mini dark"></radio4000-player>

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

