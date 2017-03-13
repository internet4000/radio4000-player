<template>
  <div id="Radio4000Player">
		<header>
			<marquee>
				<strong>{{channel.title}}</strong>
				<transition name="fade">
					<span v-if="track.title">&rarr; {{track.title}}</span>
				</transition>
			</marquee>
			<transition name="fade">
			<p v-if="channel.body">
				{{channel.body}}
			</p>
			</transition>
		</header>
		<aside>
			<youtube-player :video-id="track.ytid" />
		</aside>
		<main>
			<track-list :tracks="tracks" v-on:select="playTrack" />
		</main>
  </div>
</template>

<script>
import 'whatwg-fetch'
import TrackList from './TrackList.vue'
import YoutubePlayer from './YoutubePlayer.vue'

// Data.
const host = 'https://radio4000-api-dcobewnpjx.now.sh/v1'
const parse = res => res.json()
function findChannelBySlug(slug) {
	const url = `${host}/channels?slug=${slug}`
	return fetch(url).then(parse).then(data => data[0])
}
function findTracks(channelId) {
	const url = `${host}/channels/${channelId}/tracks`
	return fetch(url).then(parse)
}

export default {
  name: 'radio4000-player',
	props: ['slug'],
	data () {
		return {
			channel: {
				title: 'Loading Radio4000...'
			},
			tracks: [],
			track: {},
			videoId: ''
		}
	},
	components: {
		TrackList, YoutubePlayer
	},
	created() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			let slug = this.slug
			if (!slug) return

			findChannelBySlug(slug).then(channel => {
				this.channel = channel

				findTracks(channel.id).then(tracks => {
					// Define an extra `active` prop.
					tracks = tracks.map(t => {
						t.active = false
						return t
					})
					this.tracks = tracks
				})
			})
		},
		playTrack(track) {
			this.track = track
			// Change active class.
			this.tracks
				//.filter(t => t.id !== track.id)
				.forEach(t => {
					t.active = false
				})
			track.active = true
		}
	}
}
</script>

<style scoped>
#Radio4000Player {
	display: flex;
	flex-direction: column;
	max-width: 500px;
	height: 500px;
	max-height: 95vh;
	border: 2px solid;
	border-right-width: 4px;
	border-bottom-width: 4px;
	background-color: hsla(260, 10%, 92%, 1);
	font-family: 'system-ui', sans-serif;
}
header {
	border-bottom: 1px solid hsla(0, 0%, 0%, 0.8);
	display: flex;
	flex-direction: row;
}
marquee {
	display: block;
	margin: auto;
	padding: 1rem 0;
}
header p {
	font-size: 0.875em;
}
main {
	flex: 1;
	overflow-y: scroll;
}
a {
  color: blue;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
