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
				@play="playProvider"
				@pause="pauseProvider"
				@trackEnded="trackEnded"></youtube-player>
			</div>
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
			'track',
		],
		computed: {
			provider: function() {
				if (this.track && this.track.ytid) return 'youtube'
				return undefined
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
		flex-basis: 100%;
		/* Youtube requirements */
		min-height: 200px;
		min-width: 200px;
		/* min-height: 109px;
			 max-height: calc(100vh - 20rem - (2.75rem * 2)); */
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
