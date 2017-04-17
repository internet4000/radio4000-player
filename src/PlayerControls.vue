<template>
	<menu>
		<!-- <button @click="prev">Prev</button> -->
		<button @click="$emit('play')">Play</button>
		<button @click="$emit('pause')">Pause</button>
		<button @click="$emit('next')">Next</button>
		<!-- <button @click="$emit('mute')">Mute</button> -->
		<!-- <button @click="$emit('unMute')">Unmute</button> -->
	</menu>
</template>

<script>
	export default {
		name: 'player-controls',
		props: ['player', 'volume'],
		watch: {
			masterVolume(vol) {
				console.log('not yet setting volume to ' + vol)
				// this.player.setVolume(vol)
			}
		},
		methods: {
			/*
			mute() { this.$emit('setVolume', 0) },
			unMute() { this.player.unMute() },
			changeVolume(vol) {
				this.$emit('volumeChanged', vol)
			}
			*/
		}
	}
</script>

<style scoped>
	menu {
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

