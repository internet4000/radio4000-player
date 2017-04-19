<template>
	<menu>
		<!-- <button @click="prev">Prev</button> -->
		<button v-if="!playing" @click="$emit('play')">Play</button>
		<button v-else @click="$emit('pause')">Pause</button>
		<button @click="$emit('next')">Next</button>
		<!-- <button @click="$emit('mute')">Mute</button> -->
		<!-- <button @click="$emit('unMute')">Unmute</button> -->
	</menu>
</template>

<script>
	export default {
		name: 'player-controls',
		props: ['player', 'volume', 'playing'],
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
		border-top: 1px solid hsl(0, 0%, 60%);
		margin: 0;
		padding: 0;
		display: flex;
		flex-flow: row nowrap;
	}
	button {
		flex: 1;
		min-height: 2.7em;
		background: hsl(0, 0%, 96%);
		border: 0;
		font-size: 0.8125em;
	}
	button:hover,
	button:focus {
		background: hsl(0, 0%, 100%);
	}
	input[type="range"] {
		width: 100%;
	}
</style>

