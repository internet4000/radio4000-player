<template>
	<div class="ProviderPlayer" :class="{'ProviderPlayer--file': provider === 'file'}">
		<div
			v-if="showLoader"
			class="ProviderPlayer-loader">
			<p>loading</p>
		</div>

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
			:videoId="track.id"
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
			:videoId="track.id"
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
			:videoId="track.id"
			:isPlaying="isPlaying"
			:volume="volume"
			@ready="handleProviderReady"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@ended="$emit('trackEnded')"
		></soundcloud-player>
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
			track() {
				this.handleProviderEnded()
			}
		},
		computed: {
			// this is a trick, to force reload the component,
			// when this key changes. We use it for vimeo,
			// which sends API triggered pause to the player
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
			handleProviderEnded() {
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

		align-items: center;
		justify-content: center;
		
		background-color: black;
		color: white;
	}
</style>
