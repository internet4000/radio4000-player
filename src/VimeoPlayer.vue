<template>
	<div class="VimeoPlayer">
		<article id="VimeoPlayerR4"></article>
	</div>
</template>

<script>
	/*
		 docs:
		 https://developer.vimeo.com/player/sdk/basics
		 https://github.com/vimeo/player.js
	 */
	import Player from '@vimeo/player';
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
			var element = this.$el
			var iframe = element.querySelector('#VimeoPlayerR4')
			var options = {
				id: this.videoId
				/* responsive: true */
			};
			var player = new Player(iframe, options);
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
	.VimeoPlayer,
	#VimeoPlayerR4 {
		height: 100%;
	}
	.VimeoPlayer iframe {
		width: 100%;
		height: 100%;
	}
</style>
