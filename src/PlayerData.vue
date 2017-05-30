<template>
	<radio4000-player
			:channel="channel"
			:tracks="tracks"
			:track="track"
			:image="image"
			:showCurrentTrack="showCurrentTrack"
			:showTracks="showTracks"
			:volume="volume"/>
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
			channelSlug: String,
			channelId: String,
			trackId: String,
			volume: {
				type: Number,
				default: 80
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
				channel: {},
				image: '',
				tracks: [],
				track: {}
			}
		},
		created() {
			// init 1 - from what `key` do we load channel data?
			const { channelSlug, channelId, trackId } = this;
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

					resolve(console.log('-- clearR4Session --'))
				})
			},
			startR4Session(startMethod, param) {
				this.clearR4Session();
				startMethod(param).then(() => {
					this.loadChannelImage(this.channel)
					this.loadChannelTracks(this.channel)
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
				findTrack(channel.tracks[len]).then(this.updatePlayerWithTrack);
			},
			// load data
			loadChannelTracks(channel) {
				return findChannelTracks(channel.id)
					.then(this.updatePlayerWithTracks)
			},
			loadChannelImage(channel) {
				if(!channel.images) {
					return
				}
				return findChannelImage(channel)
					.then(this.updatePlayerWithImage)
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
