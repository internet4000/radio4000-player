<template>
	<div class="VimeoPlayer">
		<article
			id="VimeoPlayerR4"
		></article>
	</div>
</template>

<script>
	/*
		 docs:
		 https://developer.vimeo.com/player/sdk/basics
		 https://github.com/vimeo/player.js
	 */

	/* 
		 Notes:
		 Vimeo sends API calls, that pause the player,
		 https://github.com/vimeo/player.js/issues/435
		 when a video is finished. It is not triggered by the user,
		 but there is no way to differenciate both.
		 Therefore it puts our player in pause state, when it should
		 continue playing,e because User did not ask this.
		 Our take, is:
		 - to force the player to reload when the videoId changes
		 - put the vimeo in autoplay, and pause/play manually when needed
		 - a few more tricks along the way
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
			isPlaying() {
				if (this.isPlaying) {
					this.player.getPaused().then(() => {
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
					// do not track
					dnt: true,
					id: this.videoId,
					// for the API pause issue
					autoplay: true,
					autopause: false
				};

				var player = new Player(iframe, options);

				player.on('error', this.handleError);
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
				this.player.off('error', this.handleError);
				this.player.off('pause', this.handlePause);
				this.player.off('play', this.handlePlay);
				this.player.off('ended', this.handleEnded);
				this.player.off('volumechange', this.handleVolume);
				return this.player.destroy()
			},
			handleEnded() {
				// if the player ended, but is paused
				// it is because vimeo API triggered pause, not user
				this.player.getPaused().then(paused => {
					if (paused) {
						this.$emit('playing')
					}
					// then emit ended, when we are in playing mode
					// racing......
					this.$emit('ended')
					console.log('ended')
				})
			},
			handlePlay() {
				this.$emit('playing')
			},
			handlePause() {
				this.$emit('paused')
			},
			handleError(error) {
				this.$emit('error')
				console.log('error', error)

				// the vimeo API sends pause events
				// and we send a play event to keep in play state
				// let's try and force playing a little more
				// message: "The play() request was interrupted by a call to pause()"
				// method: "play"
				// name: "PlayInterrupted"
				if (error.name === 'PlayInterrupted') {
					this.player.getPaused().then(paused => {
						console.log('paused?', paused)
						if (paused) {
							this.playProvider()
						}
					})
				}
			},
			handleVolume(event) {
				if (event.volume !== this.volume) {
					this.$root.$emit('setVolume', event.volume)
				}
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
