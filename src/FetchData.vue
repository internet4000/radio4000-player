<template></template>

<script>
	import {
		findChannelById,
		findChannelBySlug,
		findChannelTracks,
		findTrack,
		buildThumbnail
	} from './utils/store'

	export default {
		props: {
			channelSlug: String,
			channelId: String,
			trackId: String,

			// needed for caching
			currentChannel: Object,
			currentTracks: Array
		},

		watch: {
			channelSlug: { immediate: true, handler: 'loadChannelBySlug' },
			channelId: { immediate: true, handler: 'loadChannelById' },
			trackId: { immediate: true, handler: 'loadChannelByTrack' }
		},

		methods: {
			loadChannelBySlug(slug) {
				if (!slug) return
				return findChannelBySlug(slug)
					.then(channel => {
						this.loadTracksAndImageFromChannel(channel)
						this.update({channel})
					})
					.catch(err => {console.log(err)})
			},
			loadChannelById(id) {
				if (!id) return
				return findChannelById(id)
					.then(channel => {
						this.loadTracksAndImageFromChannel(channel)
						this.update({channel})
					})
					.catch(err => {console.log(err)})
			},
			loadChannelByTrack(id) {
				if (!id) return

				// Use track from cache if possible.
				let track = this.currentTracks && this.currentTracks.find(t => t.id === id)
				if (track) {
					this.update({track})
					return
				}

				return findTrack(id).then(track => {
					this.update({track})

					// Avoid loading the same channel twice.
					const query = this.currentChannel.query
					const sameChannel = this.currentChannel.id === track.channel
					if (sameChannel && query || sameChannel && !query) {
						return
					}

					// Load new channel.
					return this.loadChannelById(track.channel)
				})
			},
			loadChannelTracks(channel) {
				findChannelTracks(channel.id)
					.then(tracks => this.update({tracks}))
					.catch(err => {console.log(err)})
			},
			loadTracksAndImageFromChannel(channel) {
				// Reset tracks and image to show loading UX immediately.
				this.update({tracks: [], image: ''})

				if (channel.image) {
					this.update({image: buildThumbnail(channel.image)})
				}

				if (channel.tracks.length) {
					this.update({tracks: channel.tracks})
				} else {
					this.loadChannelTracks(channel)
				}
			},
			update(data) {
				this.$emit('afterFetch', data)
			}
		}
	}
</script>

