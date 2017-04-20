<template>
	<div id="YoutubePlayer">
		<div class="Ratio">
			<div class="ytplayer"></div>
		</div>
	</div>
</template>

<script>
// This component uses https://github.com/gajus/youtube-player
// to abstract the youtube iframe api.
import YouTubePlayer from 'youtube-player'

const stateNames = {
	'-1': 'unstarted',
	0: 'ended',
	1: 'playing',
	2: 'paused',
	3: 'buffering',
	5: 'cued'
}

export default {
	name: 'youtube-player',
	props: [
		'videoId',
		'volume',
		'autoplay',
		'playing'
	],
	data() {
		return {
			player: {},
			playerVars: {
				controls: 1,
				fs: 0,
				modestbranding: 1,
				origin: window.location.origin,
				playsinline: 1,
				rel: 0,
				showinfo: 0
			}
		}
	},
	watch: {
		videoId(id) {
			if (this.autoplay) {
				this.player.loadVideoById(id).then(() => {
					// This extra "play" is needed on at least
					// Chrome on Android 4.2. Otherwise it stays "buffering".
					this.player.playVideo()
				})
			} else {
				this.player.cueVideoById(id)
			}
		},
		playing(paused) {
			if (paused) {
				this.player.playVideo()
			} else {
				this.player.pauseVideo()
			}
		},
		volume(vol) {
			console.log('not yet setting volume to ' + vol)
			// this.player.setVolume(vol)
		}
	},
	mounted() {
		// Create the player.
		const el = this.$el.querySelector('.ytplayer')
		this.player = YouTubePlayer(el, {playerVars: this.playerVars})
		// Emit "ready" event with the player instance.
		this.player.on('ready', () => {
			this.$emit('ready', this.player)
		})
		this.player.on('error', event  => {
			this.$emit('error', event)
		})
		// Emit all YouTube events.
		this.player.on('stateChange', event => {
			const state = stateNames[event.data]
			this.$emit(state, event.data)
		})
	}
}
</script>

<style scoped>
	.Ratio {
		background-color: black;
		width: 100%;
		overflow: hidden;
		position: relative;
		height: 0;
		padding-bottom: calc(9/16*100%);
	}
</style>

<style>
	.Ratio iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

