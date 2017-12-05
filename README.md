# Radio4000 Player

This is a web component that plays channels from [Radio4000](htttps://radio4000.com). It uses the public [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js.

## How to use

You can either load the player directly like this:

```html
<script async src="https://unpkg.com/radio4000-player"></script>
<radio4000-player channel-slug="good-time-radio"></radio4000-player>
```

OR, you can use a package manager:

```js
// npm install radio4000-player
import 'radio4000-player'
// now you can use <radio4000-player> in your templates
```

OR, you can use an iframe ([source](https://github.com/internet4000/radio4000-api/blob/master/src/embed/index.js)):

```html
<iframe src="https://api.radio4000.com/embed?slug=detecteve" width="320" height="500" frameborder="0"></iframe>
```

## API

Here's a complete list of all the attributes you can set and change on the web component. These do not affect the iframe version.

|Attribute|Type|Description|
|----|----|----|
|channel-slug|`string`|Radio4000 channel slug (ex: `oskar`)
|channel-id|`string`|Radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
|track-id|`string`|Radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)
|volume|`integer`|from 0 to 100 (default: `100`)
|autoplay|`boolean`|if it should start playing automatically (default: `false`)
|shuffle|`boolean`|if tracks should be shuffled (default: `false`)

### Examples

Remember that HTML attributes are dasherized `channel-slug` whereas JavaScript expects CamelCase `channelSlug`.

```js
var player = document.querySelector('radio4000-player')

// Load radio channel either by slug or id.
player.channelSlug = 'sugar-hiccup'
player.channelId = '-JYZvhj3vlGCjKXZ2cXO'

// Load a specific track.
player.trackId = '-JYEosmvT82Ju0vcSHVP'

// Change the volume.
player.volume = 25

// Enable shuffle.
player.shuffle = true
```

To enable autoplay:

```html
<radio4000-player channel-slug="200ok" autoplay="true"></radio4000-player>
```

## Events

You can listen for events directly on each `<radio4000-player>` element.

- `trackChanged` - This event fires whenever the current track is
  changed. It is an object containing two `track` objects,
  `previousTrack` and `track`
- `trackEnded` - This event fires when the current track finishes
  playing. It is an object containing one `track` object.

Here's an example of how to listen for the `trackChanged` event. It is the same approach for all events. In the case of both `trackChanged` and `trackEnded`, the `event.detail[0]` argument will be a Radio4000 `track` object.

```js
var player = document.querySelector('radio4000-player')
player.addEventListener('trackChanged', (event) => {
  console.info('trackChanged event', event.detail[0])
  // { track: { [...] } }
})
```

## More

If this player is used inside radio4000.com, we want the links to switch URL internally.
For that you can use the boolean property `r4-url` like so.

```html
<radio4000-player r4-url="true"></radio4000-player>
```

Therefore, URLs in the player header won't open new browser window but will just replace the URL like Ember router would have done.

## Development

``` bash
# 1. clone and install dependencies
git clone git@github.com:internet4000/radio4000-player.git
yarn install

# 2. starts a server at http://localhost:4002 that autobuilds when files change
yarn start
```

## Testing

```bash
# run tests using ava
yarn test

# watch for changes and run tests
ava --watch

# update test snapshots
ava --update-snapshots
```
