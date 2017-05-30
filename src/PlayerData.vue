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
				return this.loadBySlug(slug)
			} else if (id) {
				return this.loadById(id)
			} else if (trackId) {
				return this.loadByTrackId(trackId)
			}
		},
		watch: {
			// init 1 bis,
			// `slug` and `id` are only used to assign radio externally
			// by the <radio4000-player> web component props
			slug: function (slug) {
				this.loadBySlug(slug)
			},
			id: function (id) {
				this.loadById(id)
			},
			// when channel is set, load img and tracks
			channel: function(channel) {
				this.loadChannelImage(channel);
				this.loadChannelTracks(channel);
			}
		},
		methods: {
			/* 
				 player data loading
			 */
			loadBySlug(slug) {
				this.fetchModelBySlug(slug)
						.then(channel => {
							this.updatePlayerWithChannel(channel);
							// not sure why -1 is needed
							var len = channel.tracks.length -1
							return findTrack(channel.tracks[len])
								.then(this.updatePlayerWithTrack);
						})
			},
			loadById(id) {
				this.fetchModelById(id)
						.then(channel => {
							this.updatePlayerWithChannel(channel);
							// not sure why -1 is needed
							var len = channel.tracks.length -1
							return findTrack(channel.tracks[len])
								.then(this.updatePlayerWithTrack);
						})
			},
			loadByTrackId(trackId) {
				findTrack(trackId).then(track => {	
					this.updatePlayerWithTrack(track);
					this.fetchModelById(track.channel)
							.then(this.updatePlayerWithChannel)
				})
			},
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
			},
			updatePlayerWithTrack(track) {
				this.track = track;
			},
			updatePlayerWithTracks(tracks) {
				this.tracks = tracks;
			},
			updatePlayerWithImage(image) {
				return this.image = image.src;
			},
			fetchModelBySlug(slug) {
				return findChannelBySlug(slug).catch(this.handleFetchError)
			},
			fetchModelById(id) {
				return findChannelById(id).catch(this.handleFetchError)
			},
			handleFetchError(error) {
				console.warn(error);
			}
		}
	}
</script>
