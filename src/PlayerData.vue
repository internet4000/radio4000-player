<template>
	<article>
		<radio4000-player
				v-if="playerStarted"
				:channel="channel"
				:tracks="tracks"
				:track="track"
				:image="image"
				:autoplay="autoplay"
				:showCurrentTrack="showCurrentTrack"
				:showTracks="showTracks"
				:volume="volume"/>
		<div v-else class="Console">
			<p>Radio4000-player is ready to start playing data:
				<a href="https://github.com/internet4000/radio4000-player-vue">documentation</a>
			</p>
		</div>
	</article>
</template>

<script>
	import Radio4000Player from './Radio4000Player.vue'
	import { findChannelById,
					 findChannelBySlug,
					 findChannelTracks,
					 findChannelImage,
					 findTrack } from './store'

	export default {
		name: 'player-data',
		components: {
			Radio4000Player
		},
		props: {
			autoplay: Boolean,
			channelSlug: String,
			channelId: String,
			trackId: String,
			volume: {
				type: Number,
				default: 100
			},
			showTracks: {
				type: Boolean,
				default: true
			},
			showCurrentTrack: {
				type: Boolean,
				default: false
			}
		},
		data () {
			/* return initialState()*/
			return {
				playerStarted: true,
				channel: {},
				image: '',
				tracks: [],
				track: {}
			}
		},
		created() {
			// init 1 - if there is any following key,
			// start the according session
			// otherwise stay in idle mode
			const { channelSlug, channelId, trackId } = this;

			if (!channelSlug && !channelId && !trackId ) {
				return this.playerStarted = false;
			}

			if (trackId) {
				return this.loadTrack(trackId)
									 .then(track => this.loadChannelById(track.channel))
			}
			
			if (channelSlug) {
				return this.loadChannelBySlug(channelSlug)
			}

			if (channelId) {
				return this.loadChannelById(channelId)
			}
		},
		watch: {
			// init 1 bis,
			// `slug` and `id` are only used to assign radio externally
			// by the <radio4000-player> web component props
			channelSlug: function (slug) {
				this.loadChannelBySlug(slug)				
			},
			channelId: function (id) {
				this.loadChannelById(id)
			},
			trackId: function (id) {
				this.loadTrack(id).then(track => this.loadChannelById(track.channel))
			}
		},
		methods: {
			clearR4Session() {
				return new Promise((resolve, reject) => {
					this.channel = {};
					this.image = ''
					this.tracks = []
					this.track = {}
					resolve()
				})
			},

			// start player session by:
			// all start method must return a `channel@r4` model
			loadChannelBySlug(slug) {
				return findChannelBySlug(slug)
					.then(this.updatePlayerWithChannel)
			},
			loadChannelById(id) {
				return findChannelById(id)
					.then(this.updatePlayerWithChannel)
			},
			loadChannelExtra(channel) {
				findChannelTracks(channel.id)
					.then(this.updatePlayerWithTracks)
					.then(findChannelImage(channel))
					.then(this.updatePlayerWithImage)
			},
			
			loadTrack(trackId) {
				return findTrack(trackId).then(this.updatePlayerWithTrack)
			},
			startSessionFirstTrack(channel) {
				var len = channel.tracks.length -1
				return loadTrack(channel.tracks[len])
			},

			updatePlayerWithChannel(channel) {
				if(channel.id === this.channel.id) return
			
				this.channel = channel;
				this.loadChannelExtra(this.channel)
			},
			updatePlayerWithTrack(track) {
				return this.track = track
			},
			updatePlayerWithTracks(tracks) {
				this.tracks = tracks;
			},
			updatePlayerWithImage(image) {
				this.image = image ? image.src : ''
			}
		}
	}
</script>

<style>
	.Console {
		font-family: monospace;
		padding: 0.5rem;
		line-height: 1.4;
	}
</style>
