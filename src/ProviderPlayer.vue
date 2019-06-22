<template>
	<div class="ProviderPlayer" :class="{'ProviderPlayer--file': provider === 'file'}">
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

		<youtube-player
			v-if="provider === 'youtube'"
			:videoId="track.id"
			:volume="volume"
			:autoplay="autoplay"
			:isPlaying="isPlaying"
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
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@mediaNotAvailable="$emit('mediaNotAvailable')"
			@ended="$emit('trackEnded')"
		></vimeo-player>
	</div>
</template>

<script>
	import YoutubePlayer from './YoutubePlayer.vue'
	import VimeoPlayer from './VimeoPlayer.vue'
	import FilePlayer from './FilePlayer.vue'
	import { mediaUrlParser } from 'media-url-parser'

	export default {
		name: 'provider-player',
		components: {
			YoutubePlayer,
			VimeoPlayer,
			FilePlayer
		},
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			track: Object,
			volume: Number
		},
		computed: {
			// this is a trick, to force reload the component,
			// when this key changes. We use it for vimeo,
			// which sends API triggered pause to the player
			trackKey() {
				return this.track && this.track.id
			},
			provider() {
				if (!this.track || !this.track.url || !this.track.provider) return undefined
				return this.track.provider
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
</style>
