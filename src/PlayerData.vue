<template>
	<radio4000-player
		v-if="canLoad"
		:channel="channel"
		:tracks="tracks"
		:track="track"
		:image="image"
		:autoplay="autoplay"
		:r4Url="r4Url"
		:volume="localVolume"
		:shuffle="shuffle"
		@trackChanged="onTrackChanged"
		@trackEnded="onTrackEnded"
	></radio4000-player>
	<div v-else class="Console">
		<p>Radio4000-player is ready to start playing:
			<a href="https://github.com/internet4000/radio4000-player-vue">documentation</a>
		</p>
	</div>
</template>

<script>
	import Radio4000Player from './Radio4000Player.vue'
	import bus from './bus'
	import {
		findChannelById,
		findChannelBySlug,
		findChannelTracks,
		findChannelImage,
		findTrack
	} from './store'

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
			r4Url: {
				type: Boolean,
				default: false
			},
			volume: {
				type: Number,
				default: 100
			},
			shuffle: Boolean
		},
		data () {
			return {
				channel: {},
				image: '',
				tracks: [],
				track: {},
				providerTrack: {},
				localVolume: this.$props.volume
			}
		},
		created() {
			bus.$on('setVolume', vol => {
				console.log('setting new volume to: ', vol)
				this.localVolume = vol
			})

			const { channelSlug, channelId, trackId } = this;
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
			channelSlug: function (slug) {
				this.loadChannelBySlug(slug)
			},
			channelId: function (id) {
				this.loadChannelById(id)
			},
			trackId: function (id) {
				this.loadTrack(id).then(track => this.loadChannelById(track.channel))
			},
			providerTrack: function(track) {
				console.log("track", track)
			},
			volume: function(vol) {
				// map web component prop to local volume
				this.localVolume = vol
			}
		},
		computed: {
			canLoad: function() {
				return this.channelSlug || this.channelId || this.trackId
			}
		},
		methods: {
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
				findChannelImage(channel)
					.then(this.updatePlayerWithImage)
			},
			loadTrack(trackId) {
				return findTrack(trackId).then(this.updatePlayerWithTrack)
			},
			updatePlayerWithChannel(channel) {
				if (channel.id === this.channel.id) return
				this.channel = channel
				this.loadChannelExtra(this.channel)
			},
			updatePlayerWithTrack(track) {
				return this.track = track
			},
			updatePlayerWithTracks(tracks) {
				return this.tracks = tracks
			},
			updatePlayerWithImage(image) {
				return this.image = image ? image : ''
			},
			onTrackChanged(...args) {
				this.$emit('trackChanged', ...args)
			},
			onTrackEnded(...args) {
				this.$emit('trackEnded', ...args)
			}
		}
	}
</script>

<style>
	.Console {
		font-family: monospace;
		padding: 0 1rem;
		line-height: 1.4;
	}
</style>
