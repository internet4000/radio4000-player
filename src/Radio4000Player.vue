<template>
	<article>
		<header>
			<channel-header
				:channel="channel"
				:track="track"></channel-header>
		</header>
		<aside>
			<youtube-player
				:video-id="track.ytid"
				:autoplay="autoplay"
				:playing="playing"
				@error="onPlayerError"
				@ready="onPlayerReady"
				@playing="onPlayerPlaying"
				@ended="onPlayerEnded"></youtube-player>
		</aside>
		<main>
			<track-list
				v-if="playlist"
				:tracks="playlist"
				@select="selectTrack"></track-list>
		</main>
		<footer>
			<player-controls
				v-if="playerReady"
				:player="player"
				:playing="playing"
				@play="play"
				@pause="pause"
				@next="next"></player-controls>
		</footer>
	</article>
</template>

	<script>
import Vue from 'vue'
import ChannelHeader from './ChannelHeader.vue'
import TrackList from './TrackList.vue'
import YoutubePlayer from './YoutubePlayer.vue'
import PlayerControls from './PlayerControls.vue'
import store from './store'

export default {
	name: 'radio4000-player',
	components: {
		ChannelHeader,
		TrackList,
		YoutubePlayer,
		PlayerControls
	},
	props: {
		slug: String,
		volume: Number
	},
	data () {
		return {
			playerReady: false,
			autoplay: false,
			loop: false,
			playing: false,
			skins: {
				mini: false,
				dark: false
			},
			channel: {
				title: 'Loading Radio4000...'
			},
			tracks: [],
			track: {}
		}
	},
	created() {
		if (this.slug) {
			this.loadAndQueue(this.slug)
		}
	},
	watch: {
		slug: function (slug) {
			this.loadAndQueue(slug)
		}
	},
	computed: {
		playlist: function() {
			return this.tracks.reverse()
		}
	},
	methods: {
		loadAndQueue(slug) {
			this.fetchModel(slug).then(() => {
				this.cueTrack(this.playlist[0])
			})
		},
		selectTrack(track) {
			this.autoplay = true
			this.cueTrack(track)
		},
		cueTrack(track) {
			this.playlist.forEach(t => {t.active = false})
			track.active = true
			this.track = track
		},
		// runs once on load when yt-iframe is ready
		onPlayerReady(player) {
			this.playerReady = true
		},
		onPlayerError(event) {
			console.log({youtubeError: event.data})
			this.next()
		},
		onPlayerPlaying(event) {
			this.playing = true
		},
		onPlayerEnded(event) {
			this.playing = false
			this.next()
		},
		play() {
			this.playing = true
		},
		pause() {
			this.playing = false
		},
		next() {
			let playlist = this.playlist
			const index = playlist.indexOf(this.track)
			let track = playlist[index + 1]
			if (!track && this.loop) {
				track = playlist[0]
			}
			if (!track) {
				return
			}
			this.autoplay = true
			this.cueTrack(track)
		},
		fetchModel(slug) {
			return store.findAll(slug)
				.then(data => {
					data.tracks.forEach(t => {t.active = false})
					this.channel = data.channel
					this.tracks = data.tracks
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style>
radio4000-player {
	display: block;
	width: 320px;
	height: 400px;
	overflow: hidden;
	border: 1px solid hsl(0, 0%, 60%);
	background-color: hsl(260, 10%, 92% );
	color: hsl(0, 0%, 10%);
	font-family: 'maisonneue', 'system-ui', sans-serif;
	font-size: 1em;
}
</style>

<style scoped>
article {
	display: flex;
	flex-direction: column;
	height: 100%;
}
header {}
aside {}
main {
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;
}
footer {}
</style>

<style id="Radio4000-mini">
/* Mini skin. Hides track list and "play/pause" button */
radio4000-player.mini {height: auto !important;}
radio4000-player.mini main {display: none;}
radio4000-player.mini menu {border-top: 0;}
radio4000-player.mini menu button:first-child {display: none;}
</style>

<style id="Radio4000-dark">
radio4000-player.dark,
radio4000-player.dark button {
	background-color: hsl(0, 0%, 0%);
	color: hsl(0, 0%, 80%);
}
radio4000-player.dark {
	border-color: hsl(0, 0%, 0%);
}
radio4000-player.dark .TrackList li:before {
	color: hsla(0, 0%, 100%, 0.5);
}
radio4000-player.dark .Header-playing,
radio4000-player.dark .active {
	color: hsl(0, 0%, 100%);
}
radio4000-player.dark .R4 {
	fill: hsla(0, 0%, 100%, 0.3);
}
</style>

<style id="Radio4000-purple">
/* needs "dark" to be active as well
div.Radio4000Player.dark,
div.Radio4000Player.dark button {
background-color: #5e1ae6;
}*/
</style>

