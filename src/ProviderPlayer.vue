<template>
	<div class="ProviderPlayer">
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
		/* https://stackoverflow.com/questions/15381172/how-to-make-flexbox-children-100-height-of-their-parent */
		display: flex;
		/* Youtube requirements */
		min-height: 200px;
		min-width: 200px;
		/* min-height: 109px;
			 max-height: calc(100vh - 20rem - (2.75rem * 2)); */
	}
</style>
