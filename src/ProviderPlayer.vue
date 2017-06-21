<template>
	<div class="ProviderPlayer FlexEmbed">
		<div class="FlexEmbed-ratio"></div>
		<div class="FlexEmbed-content">
			<youtube-player
				v-if="provider === 'youtube'"
				:volume="volume"
				:autoplay="autoplay"
				:videoId="track.ytid"
				:isPlaying="isPlaying"
				:isMuted="isMuted"
				@play="playProvider"
				@pause="pauseProvider"
				@trackEnded="trackEnded"></youtube-player>
		</div>
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
			'track'
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
			}
		}
}
</script>

<style>
	.ProviderPlayer {
		background-color: black;
	}
	.FlexEmbed {
		position: relative;
		overflow: hidden;
	}
	.FlexEmbed-ratio {
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
		padding-bottom: calc(9 / 16 * 100%);
	}
	.FlexEmbed-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.FlexEmbed iframe {
		width: 100%;
		height: 100%;
	}
</style>
