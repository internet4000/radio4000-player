<template>
	<div class="ProviderPlayer">
		<youtube-player
			v-if="provider === 'youtube'"
			:volume="volume"
			:autoplay="autoplay"
			:videoId="track.ytid"
			:isPlaying="isPlaying"
			@playing="playProvider"
			@paused="pauseProvider"
			@ended="trackEnded"></youtube-player>
	</div>
</template>

<script>
import YoutubePlayer from './YoutubePlayer.vue'

export default {
	name: 'provider-player',
	components: {
		YoutubePlayer
	},
	props: {
		autoplay: Boolean,
		isPlaying: Boolean,
		track: Object,
		volume: Number
	},
	computed: {
		provider() {
			if (this.track && this.track.ytid) return 'youtube'
			return undefined
		}
	},
	methods: {
		playProvider() {
			this.$emit('play')
		},
		pauseProvider() {
			this.$emit('pause')
		},
		muteProvider() {
			this.$emit('mute')
		},
		unMuteProvider() {
			this.$emit('unMute')
		},
		trackEnded() {
			this.$emit('trackEnded')
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
