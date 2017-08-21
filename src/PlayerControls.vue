<!-- https://en.wikipedia.org/wiki/Geometric_Shapes -->
<!-- http://jsbin.com/wiqiyat/2/edit?html,css,output -->
<template>
	<footer class="PlayerControl">
		<div class="PlayerControl-group">
			<button title="Mute volume (on/off)"
				class="Btn Btn--mute"
				:class="{ 'Btn--isNotFullVolume' : isNotFullVolume, 'is-active' : isMuted }"
				:disabled="isDisabled"
				@click="$emit('toggleMute')">
				<span></span>
			</button>
		</div>
		<div class="PlayerControl-group">
			<button title="Shuffle tracks (on/off)"
				class="Btn Btn--shuffle"
				:class="{ 'is-active' : !isShuffle }"
				:disabled="isDisabled"
				@click="$emit('toggleShuffle')">
				<span>↝</span>
			</button>
		</div>
		<div class="PlayerControl-group PlayerControl-group--large">
			<PlayPauseButton title="Play/pause"
				class="Btn"
				:isPlaying="isPlaying"
				@play="$emit('play')"
				@pause="$emit('pause')"
			></PlayPauseButton>
		</div>
		<div class="PlayerControl-group">
			<button title="Next track"
				:disabled="isDisabled"
				@click="$emit('next')"
				class="Btn Btn--next"><span>→</span></button>
		</div>
	</footer>
</template>

<script>
import PlayPauseButton from './PlayPauseButton.vue'
export default {
	name: 'player-controls',
	components: {PlayPauseButton},
	props: [
		'volume',
		'isPlaying',
		'isDisabled',
		'isMuted',
		'isShuffle'
	],
	computed: {
		isNotFullVolume: function() {
			return this.volume < 100
		}
	}
}
</script>

<style scoped>
	.PlayerControl {
		min-height: 2.5em;
	}
	.PlayerControl {
		border-top: 1px solid hsl(0, 0%, 70%);
		margin: 0;
		padding: 0;
		display: flex;
		flex-flow: row nowrap;
		position: relative; /* on top of ProviderPlayer */
	}
	.PlayerControl-group {
		flex-basis: 3em;
		display: flex;
	}
	.PlayerControl-group--large {
		flex: 1;
	}
	.Btn {
		width: 100%;
		background: hsl(0, 0%, 96%);
		border: 0;
		font-size: 0.8125em; /* 13/16 */
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
	.PlayPause,
	.Btn--shuffle {
		padding-top: 0;
		padding-bottom: 0;
	}
	.Btn--next span,
	.Btn--shuffle span {
		font-size: 1.7em;
	}
	.Btn--shuffle {
		line-height: 1;
	}
	.Btn--shuffle.is-active span {
		opacity: 0.5;
	}
</style>
