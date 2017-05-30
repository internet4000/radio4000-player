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

	/* function initialState() {
		 return {
		 channel: {},
		 image: '',
		 tracks: [],
		 track: {}
		 }
		 }*/

	export default {
		name: 'player-data',
		components: {
			Radio4000Player
		},
		props: {
			slug: String,
			id: String,
			trackId: String,
			volume: Number,
			showTracks: {
				type: Boolean,
				default: true
			},
			showCurentTrack: {
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
			const { slug, id, trackId } = this;
			if (slug) {
				return this.startR4Session(this.startBySlug, slug)
			} else if (id) {
				return this.startR4Session(this.startById, id)
			} else if (trackId) {
				return this.startR4Session(this.startByTrackId, trackId)
			}
		},
		watch: {
			// init 1 bis,
			// `slug` and `id` are only used to assign radio externally
			// by the <radio4000-player> web component props
			slug: function (slug) {
				this.startR4Session(this.startBySlug, slug)
				
			},
			id: function (id) {
				this.startR4Session(this.startById, id)
			},
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
					console.log('this', this.channel)
					this.loadChannelImage(this.channel)
					this.loadChannelTracks(this.channel)
				})
			},

			// start player session by:
			// all start method must return a `channel@r4` model
			startBySlug(slug) {
				return this.fetchChannelBySlug(slug)
									 .then(updatePlayerWithChannel)
									 .then(this.startSessionFirstTrack)

			},
			startById(id) {
				return this.fetchChannelById(id)
									 .then(this.updatePlayerWithChannel)
									 .then(this.startSessionFirstTrack)
			},
			startByTrackId(trackId) {
				return findTrack(trackId)
					.then(this.updatePlayerWithTrack)
					.then(track => this.fetchChannelById(track.channel))
					.then(this.updatePlayerWithChannel)
			},
			startSessionFirstTrack(channel) {
				var len = channel.tracks.length -1
				findTrack(channel.tracks[len]).then(this.updatePlayerWithTrack);
			},
			// load data
			loadChannelTracks(channel) {
				console.log('loadChannelTracks:channel', channel)
				return findChannelTracks(channel.id)
					.then(this.updatePlayerWithTracks)
			},
			loadChannelImage(channel) {
				console.log('loadChannelImage:channel:', channel)
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
			},
			fetchChannelBySlug(slug) {
				return findChannelBySlug(slug).catch(this.handleFetchError)
			},
			fetchChannelById(id) {
				return findChannelById(id).catch(this.handleFetchError)
			},
			handleFetchError(error) {
				console.warn(error);
			}
		}
	}
</script>
