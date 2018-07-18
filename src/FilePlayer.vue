<template>
	<audio class="FilePlayer"
		controls
		:src="mediaUrl"
		:autoplay="autoplay">
		Your browser does not support the <code>audio</code> element.
	</audio>
</template>

<script>
	export default {
		name: 'file-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			mediaUrl: String,
			volume: Number
		},
		mounted() {
			const el = this.$el
			// Set up events.
			el.addEventListener('play', this.$emit('playing'))
			el.addEventListener('pause', this.$emit('paused'))
			el.addEventListener('ended', this.$emit('ended'))
			el.addEventListener('error', this.$emit('ended'))
			el.addEventListener('volumechange', (event) => {
				console.log('todo volumechange', event)
			})
		}
	}
</script>
