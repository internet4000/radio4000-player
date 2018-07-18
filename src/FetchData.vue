<template></template>

<script>
	import {
		findChannelById, findChannelBySlug,
		findChannelTracks, findChannelImage,
		findTrack
	} from './utils/store'

	export default {
		props: {
			channelSlug: String,
			channelId: String,
			trackId: String,

			// needed for caching
			channel: Object,
			tracks: Array,
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
						this.afterFetch({channel})
					})
					.catch(err => {console.log(err)})
			},
			loadChannelById(id) {
				if (!id) return
				return findChannelById(id)
					.then(channel => {
						this.loadTracksAndImageFromChannel(channel)
						this.afterFetch({channel})
					})
					.catch(err => {console.log(err)})
			},
			loadChannelByTrack(id) {
				if (!id) return
				// avoid loading track twice
				let track = this.tracks && this.tracks.find(t => t.id === id)
				if (track) {
					return this.track = track
				}

				return findTrack(id).then(track => {
					this.track = track

					// avoid loading the same channel twice
					const hasQuery = this.channel.query
					const sameChannel = this.channel.id === track.channel
					if (sameChannel && hasQuery || sameChannel && !hasQuery) {
						return
					}

					// refresh
					return this.loadChannelById(track.channel)
				})
			},
			loadChannelTracks(channel) {
				findChannelTracks(channel.id)
					.then(tracks => this.afterFetch({tracks}))
					.catch(err => {console.log(err)})
			},
			loadChannelImage(channel) {
				findChannelImage(channel)
					.then(image => this.afterFetch({image}))
					.catch(() => this.afterFetch({image}))
			},

			loadTracksAndImageFromChannel(channel) {
				/* Reset tracks and image to show loading UX immediately.*/
				this.$emit('afterFetch', {tracks: [], image: ''})

				if (channel.image) {
					this.afterFetch({image: channel.image})
				} else {
					this.loadChannelImage(channel)
				}

				if (channel.tracks.length) {
					this.afterFetch({tracks: channel.tracks})
				} else {
					this.loadChannelTracks(channel)
				}
			},


			afterFetch(data) {
				this.$emit('afterFetch', data)
			}
		}
	}
</script>

