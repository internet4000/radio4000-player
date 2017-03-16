<template>
	<div id="YoutubePlayer">
		<div id="player"></div>
	</div>
</template>

<script>
import YouTubePlayer from 'youtube-player'

export default {
  name: 'youtube-player',
	props: ['video-id'],
	watch: {
		videoId(id) {
			this.player.loadVideoById(id)
		}
	},
	mounted() {
    this.player = YouTubePlayer('player');
	}
}
</script>

<style scoped>
#YoutubePlayer {
	overflow: hidden;
	position: relative;
	height: 0;
	padding-bottom: calc(9/16*100%);
}
</style>

<style>
#YoutubePlayer iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>

