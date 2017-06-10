<template>
		<radio4000-player
				v-if="playerStartedSession"
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
				playerStartedSession: false,
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
				this.playerStartedSession = false;
			}
			if (channelSlug) {
				return this.startR4Session(this.startBySlug, channelSlug)
			} else if (channelId) {
				return this.startR4Session(this.startById, channelId)
			} else if (trackId) {
				return this.startR4Session(this.startByTrackId, trackId)
			}
		},
		watch: {
			// init 1 bis,
			// `slug` and `id` are only used to assign radio externally
			// by the <radio4000-player> web component props
			channelSlug: function (slug) {
				this.startR4Session(this.startBySlug, slug)				
			},
			channelId: function (id) {
				this.startR4Session(this.startById, id)
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
			startR4Session(startMethod, param) {
				this.clearR4Session();
				this.playerStartedSession = true;
				startMethod(param).then(channel => {
					findChannelTracks(channel.id)
						.then(this.updatePlayerWithTracks)
					if (!channel.images) return
					findChannelImage(channel)
						.then(this.updatePlayerWithImage)
				})
			},

			// start player session by:
			// all start method must return a `channel@r4` model
			startBySlug(slug) {
				return findChannelBySlug(slug)
					.then(this.updatePlayerWithChannel)
					.then(this.startSessionFirstTrack)
			},
			startById(id) {
				return findChannelById(id)
					.then(this.updatePlayerWithChannel)
					.then(this.startSessionFirstTrack)
			},
			startByTrackId(trackId) {
				return findTrack(trackId)
					.then(this.updatePlayerWithTrack)
					.then(track => findChannelById(track.channel))
					.then(this.updatePlayerWithChannel)
			},
			startSessionFirstTrack(channel) {
				var len = channel.tracks.length -1
				return findTrack(channel.tracks[len])
					.then(this.updatePlayerWithTrack)
					.then(() => channel)
			},
			updatePlayerWithChannel(channel) {
				this.channel = channel;
				return channel;
			},
			updatePlayerWithTrack(track) {
				this.track = track
				return new Promise(resolve => resolve(track));
			},
			updatePlayerWithTracks(tracks) {
				this.tracks = tracks;
			},
			updatePlayerWithImage(image) {
				return this.image = image.src;
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
