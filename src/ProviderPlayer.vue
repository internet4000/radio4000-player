<template>
	<div class="ProviderPlayer" :class="{'ProviderPlayer--file': provider === 'file'}">
		<youtube-player
			v-if="provider === 'youtube'"
			:videoId="track.ytid"
			:volume="volume"
			:autoplay="autoplay"
			:isPlaying="isPlaying"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@mediaNotAvailable="$emit('mediaNotAvailable')"
			@ended="$emit('trackEnded')"
		></youtube-player>

		<file-player
			v-if="provider === 'file'"
			:url="track.url"
			:volume="volume"
			:autoplay="autoplay"
			:isPlaying="isPlaying"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@ended="$emit('trackEnded')"
		></file-player>
	</div>
</template>

<script>
	import YoutubePlayer from './YoutubePlayer.vue'
	import FilePlayer from './FilePlayer.vue'
	import { mediaUrlParser } from 'media-url-parser'

	export default {
		name: 'provider-player',
		components: {
			YoutubePlayer,
			FilePlayer
		},
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			track: Object,
			volume: Number
		},
		computed: {
			provider() {
				if (!this.track || !this.track.url) return undefined
				let parsedUrl = mediaUrlParser(this.track.url)
				return parsedUrl.provider
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
	}
	.ProviderPlayer--file {
		display: flex;
	}
	.ProviderPlayer audio {
		margin: auto;
	}
</style>
