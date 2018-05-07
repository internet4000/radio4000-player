# Radio4000 Player

This is a web component that plays channels from
[Radio4000](htttps://radio4000.com). It uses the public
[radio4000-api](https://github.com/internet4000/radio4000-api) and
Vue.js.

[![](https://data.jsdelivr.com/v1/package/npm/radio4000-player/badge)](https://www.jsdelivr.com/package/npm/radio4000-player)

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

## Methods

Danger zone. We are still finalizing the API for methods so except this to change.

```js
// Get access to the Vue component behind the web component to access methods.
var player = document.querySelector('radio4000-player')
var vue = player.__vue_custom_element__.$children[0]

var tracks = [
	{
		id: 'uniqueId',
		title: 'A title to display',
		url: 'an url to link to in the track list',
		ytid: 'an id to the youtube video'
	}
];

var playlist = {
	title: `A title for this list`,
	image: 'https://raw.githubusercontent.com/internet4000/assets/master/radio4000/icon-r4.svg',
	tracks: tracks
};

vue.updatePlaylist(playlist)
```

If the playlist object contains a `query` string it will be shown on top of the track list.

## Using internal links

If this player is used inside radio4000.com, we want the links to switch URL internally.
For that you can use the boolean property `r4-url` like so.

```html
<radio4000-player r4-url="true"></radio4000-player>
```

Therefore, URLs in the player header won't open new browser window but will just replace the URL like Ember router would have done.

## Development

- Feature branches are made from the `master` branch.
- `production` branch is used for the production version releases.

``` bash
# 1. clone and install dependencies
git clone git@github.com:internet4000/radio4000-player.git
yarn

# 2. starts a server on http://localhost:4002 that autobuilds when files change
yarn start
```

## Testing

```bash
# run tests once
yarn test

# (re)run tests as files change
yarn start; yarn cypress open
```

## How to release a new version

Release a new patch e.g. `1.0.4` to `1.0.5`.

```
yarn release
```

Release a minor, major, or specific version:

```
yarn release minor
yarn release major
yarn release 0.8.3
```

Running this command create a new, tagged "release" commit including a production build and pushes it to Git and NPM. See [release-it](https://github.com/webpro/release-it) for more.

- https://www.npmjs.com/package/radio4000-player
- https://www.jsdelivr.com/package/npm/radio4000-player
