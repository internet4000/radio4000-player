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
				:class="{ 'is-active' : isShuffle }"
				:disabled="isDisabled"
				@click="$emit('toggleShuffle')">
				<span>↝</span>
			</button>
		</div>
		<div class="PlayerControl-group PlayerControl-group--large">
			<PlayPauseButton 
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
		background: hsl(0, 0%, 96%);
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
		padding: 0 0.5rem;
		font-size: 0.8em;
		line-height: 1;
		background: hsl(0, 0%, 96%);
		border: 0;
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
		font-size: 2em;
	}
	.Btn--shuffle span {
		position: relative;
		top: -0.05em;
		opacity: 0.5;
	}
	.Btn--shuffle.is-active span {
		opacity: 1;
	}
	.PlayPause {}
	.Btn--next {
		font-size: 1.5em;
	}
</style>
