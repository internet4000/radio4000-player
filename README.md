# Radio4000 Player

A player for Radio4000 channels. It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to embed

We are working on an iframe embed. Coming soon.

## How to use as a web component

Copy and paste this snippet to your website. Remember to change the `slug=""` part to match the radio you want to play.

```html
<script async src="https://rawgit.com/internet4000/radio4000-player-vue/master/dist/radio4000-player.min.js"></script>
<radio4000-player slug="good-time-radio"></radio4000-player>
```

- Try it out: https://jsbin.com/kevipe/1/edit?html,output
- Find more radios: https://radio4000.com/all

## API

To switch the radio, change the `slug` attribute: 

```js
var player = document.querySelector('radio4000-player')
player.slug = 'sugar-hiccup'
```

To control the volume, change the `volume` attribute:

```js
var player = document.querySelector('radio4000-player')
player.volume = 50
```

## Skins

We offer a dark skin and a mini one. To use, add or combine the classes. Here are some examples:

```html
<radio4000-player slug="200ok" class="mini"></radio4000-player>
<radio4000-player slug="200ok" class="dark"></radio4000-player>
<radio4000-player slug="200ok" class="mini dark"></radio4000-player>
```

If you're familiar with CSS, you can also write your own styles targeting the `<radio4000-player>` element. Here's another example:

```html
<radio4000-player slug="200ok" class="black-and-yellow"></radio4000-player>
<style>
	radio4000-player.black-and-yellow {
		background-color: yellow;
		color: black;
	}
</style>
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

