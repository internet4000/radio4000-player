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
			this.init()
		},
		beforeDestroy() {
			this.player.off('ended', this.handleEnded);
			this.player.destroy().then(function() {
				// the player was destroyed
			}).catch(function(error) {
				// an error occurred
			});
		},
		watch: {
			videoId(videoId) {
				if (this.player) {
					this.player.loadVideo(videoId).then((data) => {
						if (this.isPlaying) {
							this.playProvider()
						} else {
							this.pauseProvider()
						}
					})
				} else {
					this.init()
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
			init() {
				var element = this.$el
				var iframe = element.querySelector('#VimeoPlayerR4')
				var options = {
					id: this.videoId
					/* responsive: true */
				};
				var player = new Player(iframe, options);
				
				/* player.on('pause', this.handlePause); */
				player.on('play', this.handlePlay);
				player.on('ended', this.handleEnded);
				player.on('volumechange', this.handleVolume);
				
				this.player = player

				if (this.isPlaying || this.autoPlay) {
					this.playProvider()
				}
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
				console.log('paused')

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
