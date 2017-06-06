<template>
	<menu>

		<!-- https://en.wikipedia.org/wiki/Geometric_Shapes -->
		<div class="PlayerControl-group">
			<button @click="$emit('toggleMute')"
							v-bind:class="{ 'Btn--isNotFullVolume' : isNotFullVolume, 'is-active' : isMute }"
							class="Btn Btn--mute"
							title="Mute on/off">
				<span></span>
			</button>
			</button>
		</div>
		<div class="PlayerControl-group">
			<button @click="$emit('toggleShuffle')"
							class="Btn Btn--shuffle"
							v-bind:class="{ 'is-active' : !isShuffle }"
							title="Shuffle on/off">
				<span>↝</span>
			</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<button v-if="!isPlaying"
							@click="$emit('play')"
							class="Btn"
							title="Play">Play</button>
			<button v-else
							@click="$emit('pause')"
							class="Btn"
							title="Pause">Pause</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<!-- <button class=Btn @click="prev">Prev</button> -->
			<button @click="$emit('next')"
							class="Btn"
							title="Next track">Next</button>
		</div>
		
	</menu>
</template>

<script>
	export default {
		name: 'player-controls',
		props: ['volume',
						'isPlaying',
						'isMute',
						'isShuffle',
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
		min-height: 2.6rem;
		background: hsl(0, 0%, 96%);
		border: 0;
		font-size: 0.8125em;
		padding: 0.2em 0.5em 0.1em;
	}
	
	.Btn--isNotFullVolume span {
		opacity: 0.4;
	}
	.Btn--mute span::before {
		content: '■';
	}
	.Btn--mute.is-active span::before {
		content: '□';
	}
	
	.Btn--shuffle {
		font-size: 1.7rem;
		line-height: 1;
	}
	.Btn--shuffle.is-active span {
		opacity: 0.5;
	}
	
</style>

