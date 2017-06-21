<template>
	<div class="ProviderPlayer">
		<div class="Ratio"></div>
		<youtube-player
			v-if="provider === 'youtube'"
			:volume="volume"
			:autoplay="autoplay"
			:videoId="track.ytid"
			:isPlaying="isPlaying"
			:isMuted="isMuted"
			@play="playProvider"
				@pause="pauseProvider"
				@setVolume="setVolume"
			@trackEnded="trackEnded"></youtube-player>
	</div>
</template>

<script>
	import YoutubePlayer from './YoutubePlayer.vue'

	export default {
		name: 'provider-player',
		components: {
			YoutubePlayer
		},
		props: [
			'volume',
			'autoplay',
			'isPlaying',
			'isMuted',
			'track',
		],
		computed: {
			provider: function() {
				return this.track.ytid ? 'youtube' : undefined
			}
		},
		methods: {
			playProvider() {
				this.$emit('play');
			},
			pauseProvider() {
				this.$emit('pause');
			},
			muteProvider() {
				this.$emit('mute');
			},
			unMuteProvider() {
				this.$emit('unMute')
			},
			trackEnded() {
				this.$emit('playNextTrack')
			},
			setVolume(volume) {
				this.$emit('setVolume', volume)
			}
		}
}
</script>

<style>
	.ProviderPlayer {
		position: relative;
		background-color: black;
		height: 25vh;
		overflow: hidden;
	}
	.Ratio {
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
		padding-bottom: calc(9/16*100%);
	}
	.ProviderPlayer iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
