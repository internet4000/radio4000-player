<template>
	<div class="PlayPause">
		<input type="checkbox" :id="uid" class="PlayPause-state"
			:checked="isPlaying" @change="toggle" />
		<label :for="uid" :title="isPlaying ? 'Pause' : 'Play'" class="PlayPause-label">
			<div class="PlayPause-controller"></div>
		</label>
	</div>
</template>

<script>
// Pass it an `isPlaying` Boolean and it will emit either
// 'pause' or 'play' depending on the state.
export default {
	name: 'play-pause-button',
	props: {
		isPlaying: Boolean
	},
	computed: {
		uid() {
			return `id${this._uid}`
		}
	},
	methods: {
		toggle() {
			const action = this.isPlaying ? 'pause' : 'play'
			this.$emit(action)
		}
	}
}
</script>

<style scoped>
.PlayPause {
	display: flex;
}
.PlayPause::-moz-selection {
	background-color: transparent;
}
.PlayPause::selection {
	background-color: transparent;
}
.PlayPause-state {
	width: 0;
	height: 0;
	border: none;
	visibility: hidden;
	margin: 0;
	position: absolute;
}
.PlayPause-label {
	flex: 1;
	display: flex;
	cursor: pointer;
}
.PlayPause-controller {
	display: inline-block;
	position: relative;
	font-size: 16px;
	width: 1em;
	height: 1.2em;
	padding: 0;
	margin: auto;
}
.PlayPause-controller::before,
.PlayPause-controller::after {
	box-sizing: content-box;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	content: "";
	border-top: 0.3em solid transparent;
	border-bottom: 0.3em solid transparent;
	border-left: 0.5em solid black;
}
.PlayPause-controller::before {
	left: 0;
	transition: all 100ms linear;
	width: 0;
	height: 0.6em;
}
.PlayPause-controller::after {
	right: 0;
	transition: all 150ms linear;
	width: 0;
	height: 0;
}
.PlayPause-state:checked + .PlayPause-label .PlayPause-controller::before,
.PlayPause-state:checked + .PlayPause-label .PlayPause-controller::after {
	border-top-width: 0;
	border-bottom-width: 0;
	border-left-width: 0.38em;
	height: 100%;
}
</style>
