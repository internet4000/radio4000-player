<template>
	<div class="VimeoPlayer">
		<article
			id="VimeoPlayerR4"
			data-vimeo-autoplay="true"
			dnt="true"
		></article>
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
			this.initPlayer()
		},
		beforeDestroy() {
			this.destroyPlayer()
		},
		watch: {
			videoId(videoId) {
				if (this.player) {
					this.player.loadVideo(videoId).then((data) => {
						if (this.isPlaying) {
							this.playProvider()
						} else {
							/* this.pauseProvider() */
						}
					})
				} else {
					this.initPlayer()
				}
			},
			isPlaying() {
				if (this.isPlaying) {
					this.player.getPaused().then(paused => {
						this.playProvider()
					})
				} else {
					this.pauseProvider()
				}
			}
		},
		computed: {
		},
		methods: {
			initPlayer() {
				var element = this.$el
				var iframe = element.querySelector('#VimeoPlayerR4')
				var options = {
					id: this.videoId
					/* responsive: true */
				};
				var player = new Player(iframe, options);
				
				player.on('pause', this.handlePause);
				player.on('play', this.handlePlay);
				player.on('ended', this.handleEnded);
				player.on('volumechange', this.handleVolume);
				
				this.player = player

				if (this.isPlaying || this.autoPlay) {
					this.playProvider()
				}
			},
			destroyPlayer() {
				this.player.off('pause', this.handlePause);
				this.player.off('play', this.handlePlay);
				this.player.off('ended', this.handleEnded);
				this.player.off('volumechange', this.handleVolume);
				return this.player.destroy()
			},
			handleEnded() {
				this.$emit('ended')
				console.log('ended')
			},
			handlePlay() {
				this.$emit('playing')
				console.log('playing')
			},
			handlePause() {
				this.$emit('paused')
				console.log('emit paused')

			},
			handleError() {
			},
			handleVolume(event) {
				if (event.volume !== this.volume) {
					this.$root.$emit('setVolume', event.volume)
				}
			},
			handleStateChange() {
			},
			playProvider() {
				this.player.play()
			},
			pauseProvider() {
				this.player.pause()
			}
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
