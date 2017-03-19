<!--
https://developers.google.com/youtube/iframe_api_reference#Playback_controls
-->

<template>
	<menu id="Controls">
		<!-- <button @click="prev">Prev</button> -->
		<button @click="play">Play</button>
		<button @click="pause">Pause</button>
		<!-- <button @click="next">Next</button> -->
		<button @click="mute">Mute</button>
		<button @click="unMute">Unmute</button>
	</menu>
</template>

<script>
export default {
	name: 'youtube-controls',
	props: ['player'],
	methods: {
		play() { this.player.playVideo() },
		pause() { this.player.pauseVideo() },
		prev() {},
		next() {},
		mute() { this.player.mute() },
		unMute() { this.player.unMute() },
	}
}
</script>

<style scoped>
	#Controls {
		margin: 0;
		padding: 0;
		display: flex;
		flex-flow: row nowrap;
	}
	button {
		flex: 1;
		min-height: 3em;
	}
</style>

