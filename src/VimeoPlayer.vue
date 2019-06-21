<template>
	<div class="VimeoPlayer">Vimeo</div>
</template>

<script>
	export default {
		name: 'vimeo-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			videoId: String,
			volume: Number
		},
		data() {
			return {}
		},
		mounted() {
		},
		watch: {
		},
		computed: {
		},
		methods: {
		}
	}
</script>

<style>
	.VimeoPlayer {
		color: red;
	}
</style>
