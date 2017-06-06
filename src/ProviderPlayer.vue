<template>
	<div class="ProviderPlayer">
		<div class="Ratio"></div>
		<youtube-player
				v-if="provider === 'youtube'"
				:volume="volume"
				:trackId="track.ytid"
				:isPlaying="isPlaying"
				:isMute="isMute"
				@play="playProvider"
				@pause="pauseProvider"
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
			'videoId',
			'volume',
			'autoplay',
			'isPlaying',
			'isMute',
			'track'
		],
		data() {
			return {
				provider: ''
			}
		},
		watch: {
			track: function(track) {
				if (!track) return
				this.selectProvider(track)
			}
		},
		methods: {
			selectProvider(track) {
				if (track.ytid) {
					this.provider = 'youtube'
				}
			},
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
