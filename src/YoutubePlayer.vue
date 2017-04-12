<template>
	<div id="YoutubePlayer">
		<youtube-controls v-if="controls"
			:player="player"
			:masterVolume="volume"></youtube-controls>
		<div class="Ratio" v-show="videoId">
			<div class="ytplayer"></div>
		</div>
	</div>
</template>

<script>
import YouTubePlayer from 'youtube-player'
import YoutubeControls from './YoutubeControls.vue'

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
	props: ['videoId', 'volume'],
	data() {
		return {
			controls: true,
			player: {},
			options: {
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
			this.player.cueVideoById(id)
		}
	},
	mounted() {
		// Create the player.
		const playerVars = this.options
		const el = this.$el.querySelector('.ytplayer')
		this.player = YouTubePlayer(el, {playerVars})
		// Emit "ready" event with the player instance.
		this.player.on('ready', () => {
			this.$emit('ready', this.player)
		})
		// Emit all YouTube events. 
		this.player.on('stateChange', event => {
			const state = stateNames[event.data]
			this.$emit(state, event.data)
		})
	},
	components: {YoutubeControls}
}
</script>

<style scoped>
	.Ratio {
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

