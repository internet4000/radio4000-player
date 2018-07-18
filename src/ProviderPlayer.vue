<template>
	<div class="ProviderPlayer">
		<youtube-player
			v-if="provider === 'youtube'"
			:volume="volume"
			:autoplay="autoplay"
			:videoId="track.ytid"
			:isPlaying="isPlaying"
			@playing="$emit('play')"
			@paused="$emit('pause')"
			@mediaNotAvailable="$emit('mediaNotAvailable')"
			@ended="$emit('trackEnded')"></youtube-player>

		<file-player
			v-if="provider === 'file'"
			:volume="volume"
			:mediaUrl="track.mediaUrl"
			@playing="$emit('play')"></file-player>
	</div>
</template>

<script>
	import YoutubePlayer from './YoutubePlayer.vue'
	import FilePlayer from './FilePlayer.vue'

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
				if(!this.track) return undefined
				if (this.track.ytid) return 'youtube'
				if (this.track.mediaUrl) return 'file'			
				return undefined
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
</style>
