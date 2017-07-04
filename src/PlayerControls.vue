<!-- https://en.wikipedia.org/wiki/Geometric_Shapes -->
<template>
	<menu>
		<div class="PlayerControl-group">
			<button title="Mute on/off"
				class="Btn Btn--mute"
				:class="{ 'Btn--isNotFullVolume' : isNotFullVolume, 'is-active' : isMuted }"
				:disabled="isDisabled"
				@click="$emit('toggleMute')">
				<span></span>
			</button>
		</div>

		<div class="PlayerControl-group">
			<button title="Shuffle on/off"
				class="Btn Btn--shuffle"
				:class="{ 'is-active' : !isShuffle }"
				:disabled="isDisabled"
				@click="$emit('toggleShuffle')">
				<span>↝</span>
			</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<button v-if="!isPlaying"
				class="Btn"
				:disabled="isDisabled"
				@click="$emit('play')"
				title="Play">Play</button>
			<button v-else
				class="Btn"
				:disabled="isDisabled"
				@click="$emit('pause')"
				title="Pause">Pause</button>
		</div>

		<div class="PlayerControl-group PlayerControl-group--large">
			<button
				:disabled="isDisabled"
				@click="$emit('next')"
				class="Btn"
				title="Next track">Next</button>
		</div>
		
	</menu>
</template>

<script>
	export default {
		name: 'player-controls',
		props: [
			'volume',
			'isPlaying',
			'isDisabled',
			'isMuted',
			'isShuffle',
			'isNotFullVolume'
		],
		computed: {
			isNotFullVolume: function() {
				return this.volume < 100
			}
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
