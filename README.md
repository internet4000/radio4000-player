# Radio4000 Player

This is a web component that plays channels from
[Radio4000](htttps://radio4000.com). It uses the public
[radio4000-api](https://github.com/internet4000/radio4000-api) and
Vue.js.

- [How to use](#how-to-use)
- [API](#api)
	- [Attributes](#attributes)
	- [Examples](#examples)
	- [Events](#events)
	- [Methods](#methods)
- [Development](#development)

[![](https://data.jsdelivr.com/v1/package/npm/radio4000-player/badge)](https://www.jsdelivr.com/package/npm/radio4000-player)


## How to use

You can load the player with a CDN, like this:

```html
<script async src="https://cdn.jsdelivr.net/npm/radio4000-player"></script>
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

### Attributes

Here's a complete list of all the attributes you can set and change on the web component. These do not affect the iframe version.

|Attribute|Type|Description|
|----|----|----|
|channel-slug|`string`|Radio4000 channel slug (ex: `oskar`)
|channel-id|`string`|Radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
|track-id|`string`|Radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)
|volume|`integer`|from 0 to 100 (default: `100`)
|autoplay|`boolean`|if it should start playing automatically (default: `false`)
|shuffle|`boolean`|if tracks should be shuffled (default: `false`)
|r4-url|`boolean`|use relative, internal links. When the player is used on radio4000.com we want the links to not open a new window. (default: `false`)

### Examples

The are three available attributes to start the player: `channel-slug`, `channel-id` and `track-id`.

In a HTML file, add the following to generate three players:

```html
<script async src="https://cdn.jsdelivr.net/npm/radio4000-player"></script>

<radio4000-player channel-slug="good-time-radio"></radio4000-player>
<radio4000-player channel-id="-JYZvhj3vlGCjKXZ2cXO"></radio4000-player>
<radio4000-player track-id="-JYEosmvT82Ju0vcSHVP"></radio4000-player>
```

You can also set and update the player attributes using JavaScript. Remember that HTML attributes are dasherized `channel-slug` whereas JavaScript expects CamelCase `channelSlug`.

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

### Events

You can listen for events directly on each `<radio4000-player>` element.

|Event name|Description|Arguments|
|----|----|----|
|`trackChanged`|Fires whenever the current track is changed|`{previousTrack, track}`
|`trackEnded`|Fires when the current track finishes playing|`{track}`
|`mediaNotAvailable`|Fires when a track can not be played by its provider (YouTube etc.)|`{track}`

Here's an example of how to listen for the `trackChanged` event. It is the same approach for all events. In the case of both `trackChanged` and `trackEnded`, the `event.detail[0]` argument will be a Radio4000 `track` object.

```js
var player = document.querySelector('radio4000-player')
player.addEventListener('trackChanged', (event) => {
  console.info('trackChanged event', event.detail[0])
  // { track: { [...] } }
})
```

### Methods

> !!! Danger zone. We are still finalizing the API for methods so expect this to change.

It is possible to load data to the `<radio4000-player>` without any relation to the Radio4000 database. To do that use the `updatePlaylist` method, on the JavaScript instance of the player. It accepts a `playlist` object.

#### The `playlist` object

|Attribute|Type|Description|
|----|----|----|
|title|`string`|Displayed in the header
|image|`string`|URL to an image (square ~60px)
|tracks|`string`|An array of track objects

Here's an example an array of a `playlist` object. Note how the tracks' `url` key points to remote media in the *ogg* format (can be any format your browser supports).

``` javascript
// Create a playlist.
const playlist = {
  title: 'A title for this list',
  image: 'https://78.media.tumblr.com/5080191d7d19fe64da558f2b4324563e/tumblr_p8eoiltn1t1twkjb3o1_1280.png',
  tracks = [
    {
      id: '1',
      title: 'Randomfunk.ogg',
      url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg'
    },
    {
      id: '2',
      title: 'Rare and Cheese - Jazzpolice',
      url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg'
    }
  ]
}

// Get access to the Vue component behind the web component to access methods.
var player = document.querySelector('radio4000-player')
var vue = player.__vue_custom_element__.$children[0]

// Update player with our new playlist.
vue.updatePlaylist(playlist)
```

#### The `track` object

The track object attributes are based on the track model of Radio4000 API.
Available attributes can be found there:
[github.com/internet4000/radio4000-api#track](https://github.com/internet4000/radio4000-api#track)

This is an array of `track`, which have a property `ytid`, so the
`<radio4000-player>` will read them with YouTube's iframe player.

``` javascript
const tracks = {
    {
        "id": "-JYZtlEKiZY75Wt6QpA5",
        "channel": "-JYZtdQfLSl6sUpyIJx6",
        "created": 1412589649848,
        "title": "Kleeer - Tonight",
        "url":" https://www.youtube.com/watch?v=cVXURwACwtk",
        "ytid": "cVXURwACwtk"
    },
    {
        "id": "-Jf2HYHsVl7iPDGZNbCa",
        "channel":"-J_QdrlmldCa7DFyh5GH",
        "created": 1420615680144,
        "title":" Patrick Watson - Adventures In Your Own Backyard (Altered Route Video Edit)",
        "url":" https://www.youtube.com/watch?v=cbSbbY5ibas",
        "ytid": "cbSbbY5ibas"
    }
}
```

If instead of a `ytid` (being a Youtube video id), you use the key
`url`, the player will attempt to read the media to which this
url points to. It will use an HTML `<audio>` element, to which the
supported media type list can be found on [Mozilla MDN
documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats).

## Development

- Feature branches are made from the `master` branch.

``` bash
# 1. clone and install dependencies
git clone git@github.com:internet4000/radio4000-player.git
yarn

# 2. starts a server on http://localhost:4002 that autobuilds when files change
yarn start
```

### Testing

```bash
# run tests once
yarn test

# (re)run tests as files change
yarn start; yarn cypress open
```

### How to release a new version

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
