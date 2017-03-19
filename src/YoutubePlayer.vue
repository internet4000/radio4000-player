<template>
	<div id="YoutubePlayer">
		<youtube-controls v-if="controls" :player="player" />
		<div class="Ratio">
			<div id="player"></div>
		</div>
	</div>
</template>

<script>
import YouTubePlayer from 'youtube-player'
import YoutubeControls from './YoutubeControls.vue'

export default {
  name: 'youtube-player',
	props: ['video-id'],
	data() {
		return {
			controls: true,
			player: {}
		}
	},
	watch: {
		videoId(id) {
			this.player.loadVideoById(id)
		}
	},
	mounted() {
    this.player = YouTubePlayer('player');
	},
	components: {YoutubeControls}
}
</script>

<style scoped>
#YoutubePlayer {}
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

