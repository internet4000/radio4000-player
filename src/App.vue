<template>
	<div>
		<h3>Skins</h3>
		<p>
			<label>
				<input type="checkbox" v-model="skins.dark">
				Dark
			</label><br>
			<label>
				<input type="checkbox" v-model="skins.mini">
				Mini
			</label>
		</p>

		<div class="Radio4000Player" :class="{dark: skins.dark, mini: skins.mini}">
		<header>
			<channel-header
				:channel="channel"
				:track="track"></channel-header>
		</header>
		<aside>
			<youtube-player
				:video-id="track.ytid"
				:volume="volume"
				:autoplay="autoplay"
				:playing="playing"
				@error="onPlayerError"
				@ready="onPlayerReady"
				@playing="onPlayerPlaying"
				@ended="onPlayerEnded"
			></youtube-player>
		</aside>
		<main>
			<track-list
				v-if="tracks"
				:tracks="tracks"
				@select="selectTrack"></track-list>
		</main>
		<footer>
			<player-controls
				v-if="playerReady"
				:player="player"
				:playing="playing"
				@play="play"
				@pause="pause"
				@next="next"
			></player-controls>
		</footer>
	</div>
	</div>
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
				track: {},
			}
		},
		created() {
			if (this.slug) {
				this.model(this.slug)
			}
		},
		methods: {
			selectTrack(track) {
				this.autoplay = true
				this.cueTrack(track)
			},
			cueTrack(track) {
				this.tracks.forEach(t => {t.active = false})
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
				console.log('onPlayerEnded')
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
				const index = this.tracks.indexOf(this.track)
				let track = this.tracks[index + 1]
				if (!track && this.loop) {
					track = this.tracks[0]
				}
				if (!track) {
					return
				}
				this.autoplay = true
				this.cueTrack(track)
			},
			model(slug) {
				store.findChannelBySlug(slug).then(channel => {
					this.channel = channel

					const imageId = Object.keys(channel.images)[0]
					if (imageId) {
						store.findImage(imageId).then(image => {
							this.channel.image = image.src
						})
					}

					store.findTracks(channel.id).then(tracks => {
						// Define an extra `active` prop. Otherwise Vue won't detect changes.
							tracks.forEach(t => t.active = false)
						this.tracks = tracks
						this.afterModel()
					})
				})
			},
			afterModel() {
				this.cueTrack(this.tracks[0])
			}
		}
	}
</script>

<style scoped>
	.Radio4000Player {
		display: flex;
		flex-direction: column;
		max-width: 320px;
		height: 400px;
		border: 1px solid hsl(0, 0%, 60%);
		background-color: hsl(260, 10%, 92% );
		color: hsl(0, 0%, 10%);
		font-family: 'maisonneue', 'system-ui', sans-serif;
		font-size: 1em;
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
	/*
	.Radio4000Player {height: auto !important;}
	.Radio4000Player main {display: none;}
	.Radio4000Player menu {border-top: 0;}
	.Radio4000Player menu button:first-child {display: none;}
	*/
	.Radio4000Player.mini {height: auto !important;}
	.Radio4000Player.mini main {display: none;}
	.Radio4000Player.mini menu {border-top: 0;}
	.Radio4000Player.mini menu button:first-child {display: none;}
</style>

<style id="Radio4000-dark">
	div.Radio4000Player.dark,
	div.Radio4000Player.dark button {
		background-color: hsl(100, 30%, 65%);
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 80%);
	}
	div.Radio4000Player.dark {
		border-color: hsl(0, 0%, 0%);
	}
	div.Radio4000Player.dark .TrackList li:before {
		color: hsla(0, 0%, 100%, 0.5);
	}
	div.Radio4000Player.dark .Header-playing,
	div.Radio4000Player.dark .active {
		color: hsl(0, 0%, 100%);
	}
	div.Radio4000Player.dark .R4 {
		fill: hsla(0, 0%, 100%, 0.3);
	}
	/* Dark scrollbars for later. */
	/*
	::-webkit-scrollbar {
		background-color: hsla(0, 0%, 50%, 0.4);
		width: 0.75em;
	}
	::-webkit-scrollbar:hover {
		background-color: hsla(0, 0%, 50%, 0.6);
	}
	::-webkit-scrollbar-thumb {
		background-color: hsla(0, 0%, 50%, 0.4);
	}
	::-webkit-scrollbar-thumb:active {
		background: rgba(0,0,0,0.61); 
	}*/
</style>

<style id="Radio4000-purple">
	/* needs "dark" to be active as well
	div.Radio4000Player.dark,
	div.Radio4000Player.dark button {
		background-color: #5e1ae6;
	}*/
</style>
