<template>
	<div class="Radio4000Player">
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
				@play="play"
				@pause="pause"
				@next="next"
			></player-controls>
		</footer>
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
				channel: {
					title: 'Loading Radio4000...'
				},
				tracks: [],
				track: {}
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
		height: 500px;
		max-height: 95vh;
		border: 2px solid;
		border-right-width: 4px;
		border-bottom-width: 4px;
		background-color: hsla(260, 10%, 92%, 1);
		font-family: 'system-ui', sans-serif;
		font-size: 1em;
	}
	header {
		border-bottom: 1px solid hsla(0, 0%, 0%, 0.8);
	}
	aside {}
	main {
		flex: 1;
		overflow-y: scroll;
	}
	footer {}
</style>
