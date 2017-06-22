# Radio4000 Player

A player for Radio4000 channels. It is an example of how you could build your own player using the official [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js components.

## How to embed

We are working on an iframe embed. Coming soon.

## How to use as a web component

Copy and paste this snippet to your website:

```html
<script async src="https://rawgit.com/internet4000/radio4000-player-vue/master/dist/radio4000-player.min.js"></script>
<radio4000-player channel-slug="good-time-radio"></radio4000-player>
```

Remember to change the `channel-slug=""` part to match the radio you want to play. Find more radios on https://radio4000.com/all.

## API

Here's a list of all the attributes you can set and change on the web component.

- `channel-slug` [string], a radio4000 channel slug (ex: `oskar`)
- `channel-id` [string], a radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
- `track-id` [string], a radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)
- `volume` [integer] from 0 to 100
- `autoplay` [boolean], if it should start playing automatically

### Examples

```js
var player = document.querySelector('radio4000-player')

// Load radio channel either by slug or id.
player.channelSlug = 'sugar-hiccup'
player.channelId = '-JYZvhj3vlGCjKXZ2cXO'

// Load a specific track.
player.trackId = '-JYEosmvT82Ju0vcSHVP'

// Change the volume.
player.volume = 25
```

To enable autoplay:

```html
<radio4000-player channel-slug="200ok" autoplay="true"></radio4000-player>
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

## More

If this player is used inside radio4000.com, we want the links to switch URL internally.
For that you can use the boolean property `r4-url` like so.
```
<radio4000-player r4-url="true"></radio4000-player>
```
Therefore, URLs in the player header won't open new browser window but will just replace the URL like Ember router would have done.

## Development

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:4002
yarn start

# build for production with minification (will update `dist/radio4000-player.min.js`)
yarn build
```

## Testing

```bash
# run tests using ava
yarn test

# watch for changes and run tests
yarn test:watch

# update test snapshots
yarn test:update
```
