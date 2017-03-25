<template>
	<div id="YoutubePlayer">
		<youtube-controls v-if="controls" :player="player"></youtube-controls>

		<div class="Ratio" v-show="videoId">
			<div id="player"></div>
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
	props: ['videoId'],
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
		const playerVars = this.options
		this.player = YouTubePlayer('player', {playerVars})
		this.player.on('ready', () => {
			this.$emit('ready', this.player)
		})
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

