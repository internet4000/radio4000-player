<!-- https://developers.google.com/youtube/iframe_api_reference#Playback_controls -->

<template>
	<div>
		<menu id="Controls">
			<!-- <button @click="prev">Prev</button> -->
			<button @click="play">Play</button>
			<button @click="pause">Pause</button>
			<!-- <button @click="next">Next</button> -->
			<!-- <button @click="mute">Mute</button> -->
			<!-- <button @click="unMute">Unmute</button> -->
		</menu>
	</div>
</template>

<script>
	export default {
		name: 'youtube-controls',
		props: ['player', 'masterVolume'],
		watch: {
			masterVolume(vol) {
				console.log('Setting volume to ' + vol)
				this.player.setVolume(vol)
			}
		},
		methods: {
			play() { this.player.playVideo() },
			pause() { this.player.pauseVideo() },
			mute() { this.player.mute() },
			unMute() { this.player.unMute() },
			prev() {},
			next() {}
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
	input[type="range"] {
		width: 100%;
	}
</style>

