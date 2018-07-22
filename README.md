# Radio4000 Player

This is a web component that plays channels from
[Radio4000](htttps://radio4000.com). It uses the public
[radio4000-api](https://github.com/internet4000/radio4000-api) and
Vue.js.

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

Here's a complete list of all the attributes you can set and change on the web component. These do not affect the iframe version.

|Attribute|Type|Description|
|----|----|----|
|channel-slug|`string`|Radio4000 channel slug (ex: `oskar`)
|channel-id|`string`|Radio4000 channel id (ex: `-JYZvhj3vlGCjKXZ2cXO`)
|track-id|`string`|Radio4000 track id (ex: `-JYEosmvT82Ju0vcSHVP`)
|volume|`integer`|from 0 to 100 (default: `100`)
|autoplay|`boolean`|if it should start playing automatically (default: `false`)
|shuffle|`boolean`|if tracks should be shuffled (default: `false`)
|r4-url|`boolean`|if channel image url and track url point to radio4000 (default: `false`)



### Examples

The are therefore three available attributes to instanciate a player
with a Radio4000 channel.

In an HTML file you could add the following to generate three players,
instanciated with `channel-slug`, `channel-id` and `track-id`.

```
<script async src="https://cdn.jsdelivr.net/npm/radio4000-player"></script>
<radio4000-player channel-slug="good-time-radio"></radio4000-player>
<radio4000-player channel-id="-JYZvhj3vlGCjKXZ2cXO"></radio4000-player>
<radio4000-player track-id="-JYEosmvT82Ju0vcSHVP"></radio4000-player>
```

You can also set and update these player attribute values with javascript.

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

### Events

You can listen for events directly on each `<radio4000-player>` element.

- `trackChanged` - This event fires whenever the current track is
  changed. It is an object containing two `track` objects,
  `previousTrack` and `track`
- `trackEnded` - This event fires when the current track finishes
  playing. It is an object containing one `track` object.
- `mediaNotAvailable` - This event fires when a track could not be
  played by its provider player (youtube etc.), since its media for
  not available to be played. It is an object containing one `track`
  object, the track which youtube video could not be played. Youtube
  does not give much detail about "why" a media could not be player,
  in the event sent by their javascript player. In you application you
  could make a call to youtube's apis to get more info about a track,
  and figure out why, with a request such as the following.
	
```
# unrelated example of an HTTP query to Youtube api for details about
a video (replace `YOUTUBE_API_KEY` and `YOUTUBE_VIDEO_ID`)
GET https://www.googleapis.com/youtube/v3/videos?key=YOUTUBE_API_KEY&id=YOUTUBE_VIDEO_ID&fields=items(id,snippet,contentDetails,statistics)&part=snippet,contentDetails,statistics
```

Here's an example of how to listen for the `trackChanged` event. It is the same approach for all events. In the case of both `trackChanged` and `trackEnded`, the `event.detail[0]` argument will be a Radio4000 `track` object.

```js
var player = document.querySelector('radio4000-player')
player.addEventListener('trackChanged', (event) => {
  console.info('trackChanged event', event.detail[0])
  // { track: { [...] } }
})
```

### Methods

> !!! Danger zone. We are still finalizing the API for methods so
> except this to change.

It is possible to load data to the `<radio4000-player>`, 
without any relation to the Radio4000 database.

To do that there is an available method `updatePlaylist`, on the
javascript instance of the player, which accepts a `playlist` object.

It can be used this way.

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

#### The `playlist` Object

A playlist object can have the following attributes:

- `title`, the title displayed in the heade

``` javascript
var tracks = [
    {
	id: '1',
	title: 'Randomfunk.ogg',
	url: 'https://200okrecords.com',
	mediaUrl: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg'
    },
    {
	id: '2',
	title: '02_-_Jazzpolice.ogg',
	url: 'http://zty.pe',
	mediaUrl: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg'
    }
];

const playlist = {
    title: 'A title for this list',
    image: 'https://78.media.tumblr.com/5080191d7d19fe64da558f2b4324563e/tumblr_p8eoiltn1t1twkjb3o1_1280.png',
    tracks: tracks
};

```

#### The `track` object

The track object attributes are based on the track model of Radio4000
api.
Available attributes can be found there:
[github.com/internet4000/radio4000-api#track](https://github.com/internet4000/radio4000-api#track)

This is an array of `track`, which have a property `ytid`, so the
`<radio4000-player>` will read them with Youtube's iframe player.
``` javascript
const tracks = {
    {
        "id": "-JYZtlEKiZY75Wt6QpA5",
        "channel":"-JYZtdQfLSl6sUpyIJx6",
        "created": 1412589649848,
        "title":"Kleeer - Tonight",
        "url":"https://www.youtube.com/watch?v=cVXURwACwtk",
        "ytid":"cVXURwACwtk"
    },
    {
        "id": "-Jf2HYHsVl7iPDGZNbCa",
        "channel":"-J_QdrlmldCa7DFyh5GH",
        "created":1420615680144,
        "title":"Patrick Watson - Adventures In Your Own Backyard (Altered Route Video Edit)",
        "url":"https://www.youtube.com/watch?v=cbSbbY5ibas",
        "ytid":"cbSbbY5ibas"
    }
}
```

If instead of a `ytid` (being a Youtube video id), you use the key
`mediaUrl`, the player will attempt to read the media to which this
url points to. It will use an HTML `<audio>` element, to which the
supported media type list can be found on [Mozilla MDN
documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats).

This is an array of `track` objects, with a `mediaUrl` key pointing to
remote media in the *ogg* format.
``` javascript
var tracks = [
    {
        id: '1',
        title: 'Randomfunk.ogg',
        url: 'https://200okrecords.com',
        mediaUrl: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg'
    },
    {
        id: '2',
        title: '02_-_Jazzpolice.ogg',
        url: 'http://zty.pe',
        mediaUrl: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg'
    }
]

```

The `track.url` property is used to create the link that this track
points to when right clicking it on the player's track list.

### r4-url, Using internal links

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
