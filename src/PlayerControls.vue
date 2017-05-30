<template>
	<menu>

		<!-- https://en.wikipedia.org/wiki/Geometric_Shapes -->
		<div class="PlayerControl-group">
			<button v-if="!isMute"
							@click="$emit('mute')"
							v-bind:class="{ 'Btn--isNotFullVolume' : isNotFullVolume }"
							class="Btn">
				<span>■</span>
			</button>
			<button v-else
							@click="$emit('unMute')"
							class="Btn">
				<span>□</span>
			</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<button v-if="!isPlaying"
							@click="$emit('play')"
							class="Btn">Play</button>
			<button v-else
							@click="$emit('pause')"
							class="Btn">Pause</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<!-- <button class=Btn @click="prev">Prev</button> -->
			<button @click="$emit('next')"
							class="Btn">Next</button>
		</div>
		
	</menu>
</template>

<script>
	export default {
		name: 'player-controls',
		props: ['volume',
						'isPlaying',
						'isMute',
						'isNotFullVolume']
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
	.PlayerControl-group {
		flex: 1;
	}
	.PlayerControl-group--large {
		flex: 3;
	}
	.Btn {
		flex: 1;
		width: 100%;
		min-height: 2.7em;
		background: hsl(0, 0%, 96%);
		border: 0;
		font-size: 0.8125em;
		padding: 0.2em 0.5em 0.1em;
	}
	.Btn--isNotFullVolume span {
		opacity: 0.4;
	}
</style>

