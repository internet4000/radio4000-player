<template>
	<div class="ProviderPlayer" :class="{'ProviderPlayer--file': provider === 'file'}">

		<file-player
			v-if="provider === 'file'"
			:url="track.url"
			:volume="volume"
			:isPlaying="isPlaying"
			@ready="handleProviderReady"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@ended="$emit('trackEnded')"
		></file-player>

		<youtube-player
			v-if="provider === 'youtube'"
			:videoId="track.pid"
			:volume="volume"
			:isPlaying="isPlaying"
			@ready="handleProviderReady"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@mediaNotAvailable="$emit('mediaNotAvailable')"
			@ended="$emit('trackEnded')"
		></youtube-player>

		<vimeo-player
			v-if="provider === 'vimeo'"
			:key="trackKey"
			:videoId="track.pid"
			:volume="volume"
			:autoplay="autoplay"
			:isPlaying="isPlaying"
			@ready="handleProviderReady"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@mediaNotAvailable="$emit('mediaNotAvailable')"
			@ended="$emit('trackEnded')"
		></vimeo-player>

		<soundcloud-player
			v-if="provider === 'soundcloud'"
			:videoId="track.pid"
			:isPlaying="isPlaying"
			:volume="volume"
			@ready="handleProviderReady"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@ended="$emit('trackEnded')"
		></soundcloud-player>

		<aside
			v-if="showLoader"
			:class="loaderClass">
			<div>
				<i>Loading {{provider}}</i>
			</div>
		</aside>
	</div>
</template>

<script>
	import FilePlayer from './FilePlayer.vue'
	import YoutubePlayer from './YoutubePlayer.vue'
	import VimeoPlayer from './VimeoPlayer.vue'
	import SoundcloudPlayer from './SoundcloudPlayer.vue'
	import { mediaUrlParser } from 'media-url-parser'

	export default {
		name: 'provider-player',
		components: {
			FilePlayer,
			YoutubePlayer,
			VimeoPlayer,
			SoundcloudPlayer
		},
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			track: Object,
			volume: Number
		},
		data() {
			return {
				providerReady: false
			}
		},
		watch: {
			track(oldTrack, newTrack) {
				// skip track if the media provider id is the same
				// aka, "don't play the same track twice in a row"
				// also solves the loader not being removed is pid the same
				// because some provider don't then send the ready event
				if (oldTrack.pid === newTrack.pid) {
					this.$emit('trackEnded')
				}
				this.handleNewProvider()
			}
		},
		computed: {
			loaderClass() {
				if (this.showLoader) {
					return 'ProviderPlayer-loader ProviderPlayer-loader--visible'
				} else {
					return 'ProviderPlayer-loader'
				}
			},
			showLoader() {
				return !this.providerReady
			},
			trackKey() {
				return this.track && this.track.id
			},
			provider() {
				if (!this.track || !this.track.url || !this.track.provider) return undefined
				return this.track.provider
			}
		},
		methods: {
			handleProviderReady() {
				console.info('Provider ready: %s', this.provider)
				this.providerReady = true
			},
			handleNewProvider() {
				this.providerReady = false
			}
		}
	}
</script>

<style>
	.ProviderPlayer {
		background-color: black;
		overflow: hidden;
		position: relative;
		/* Youtube requirements */
		min-height: 200px;
		min-width: 200px;
		flex-grow: 1;
	}
	.ProviderPlayer--file {
		display: flex;
	}
	.ProviderPlayer audio {
		margin: auto;
	}
	.ProviderPlayer iframe {
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.ProviderPlayer-loader {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		display: flex;

		align-items: flex-end;
		justify-content: flex-end;
		
		background-color: black;
		color: darkgray;
		font-size: 0.7rem;
		text-align: right;
		padding-right: 0.2rem;
	}
	.ProviderPlayer-loader {
		opacity: 0;
	}
	.ProviderPlayer-loader--visible {
		opacity: 1;
	}
</style>
