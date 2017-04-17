<!-- https://developers.google.com/youtube/iframe_api_reference#Playback_controls -->

<template>
	<div>
		<menu id="Controls">
			<!-- <button @click="prev">Prev</button> -->
			<button @click="$emit('play')">Play</button>
			<button @click="$emit('pause')">Pause</button>
			<button @click="$emit('next')">Next</button>
			<!-- <button @click="mute">Mute</button> -->
			<!-- <button @click="unMute">Unmute</button> -->
		</menu>
	</div>
</template>

<script>
	export default {
		name: 'player-controls',
		props: ['player', 'masterVolume'],
		watch: {
			masterVolume(vol) {
				console.log('Setting volume to ' + vol)
				this.player.setVolume(vol)
			}
		},
		methods: {
			mute() { this.$emit('setVolume', 0) },
			unMute() { this.player.unMute() }
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

