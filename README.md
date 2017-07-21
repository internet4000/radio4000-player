# Radio4000 Player

This is a web component that plays [Radio4000](htttps://radio4000.com) channels. It uses the open [radio4000-api](https://github.com/internet4000/radio4000-api) and Vue.js.

## How to use

You can either load the player directly like this:

```html
<script async src="https://unpkg.com/radio4000-player"></script>
```

OR, you can download the latest version of the script: 

- https://raw.githubusercontent.com/internet4000/radio4000-player/master/dist/radio4000-player.min.js

OR, you can use a package manager:

- `npm install radio4000-player`
- `yarn add radio4000-player`

```js
import 'radio4000-player'
```

---

In any case, you can now do 

```html
<radio4000-player channel-slug="good-time-radio"></radio4000-player>
```

Remember to change the `channel-slug=""` attribute to match the radio you want to play.

## API

Here's a complete list of all the attributes you can set and change on the web component.

- `channel-slug` [string], a radio4000 channel slug (ex: `oskar`)
- `channel-id` [string], a radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
- `track-id` [string], a radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)
- `volume` [integer] from 0 to 100 (default: `100`)
- `autoplay` [boolean], if it should start playing automatically (default: `false`)
- `shuffle` [boolean], if tracks should be shuffled (default: `false`)

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

// Enable shuffle.
player.shuffle = true
```

To enable autoplay:

```html
<radio4000-player channel-slug="200ok" autoplay="true"></radio4000-player>
```

## Events

You can listen for events directly on each `<radio4000-player>` element.

### Supported events

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
```
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
