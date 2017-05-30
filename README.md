# Radio4000 Player

A player for Radio4000 channels. It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to embed

We are working on an iframe embed. Coming soon.

## How to use as a web component

Copy and paste this snippet to your website.  
Remember to change the `channel-slug=""` part to match the radio you want to play.

```html
<script async src="https://rawgit.com/internet4000/radio4000-player-vue/master/dist/radio4000-player.min.js"></script>
<radio4000-player channel-slug="good-time-radio"></radio4000-player>
```

You can use *one* of these properties to assign channel and track to the player:

- `channel-slug` [string], a radio4000 channel slug (ex: `oskar`)
- `channel-id` [string], a radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
- `track-id` [string], a radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)

- Try it out: https://jsbin.com/kevipe/1/edit?html,output
- Find more radios: https://radio4000.com/all

## API

To assign the radio or track, change one of those properties on the <radio4000-player> component:
- `channelSlug` [string], a radio4000 channel slug (ex: oskar)
- `channelId` [string], a radio4000 channel id (ex: -JYZvhj3vlGCjKXZ2cXO)
- `trackId` [string], a radio4000 track id (ex: -JYEosmvT82Ju0vcSHVP)

```js
var player = document.querySelector('radio4000-player')
player.channelSlug = 'sugar-hiccup' // either by channel slug
player.channelId = '-JYZvhj3vlGCjKXZ2cXO' // or by channel id
player.trackId = '-JYEosmvT82Ju0vcSHVP' // or by track id
```

To control the volume, change the `volume` attribute:
- `volume` [integer] from 0 to 100

```js
var player = document.querySelector('radio4000-player')
player.volume = 50
```

## Skins

We offer a dark skin and a mini one. To use, add or combine the classes. Here are some examples:

```html
<radio4000-player channel-slug="200ok" class="mini"></radio4000-player>
<radio4000-player channel-slug="200ok" class="dark"></radio4000-player>
<radio4000-player channel-slug="200ok" class="mini dark"></radio4000-player>
```

If you're familiar with CSS, you can also write your own styles targeting the `<radio4000-player>` element. Here's another example:

```html
<radio4000-player channel-slug="200ok" class="black-and-yellow"></radio4000-player>
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

