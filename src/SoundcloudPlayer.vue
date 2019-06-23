<template>
	<div class="SoundcloudPlayer">
		<article
			id="SoundcloudPlayerR4"
		>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				auto_play="true"
				:src="iframeSrc">
			</iframe>
		</article>
	</div>
</template>

<script>
	/*
		 docs:
		 https://developers.soundcloud.com/docs/api/html5-widget#resources
		 https://developers.soundcloud.com/docs/api/sdks#javascript
		 https://github.com/soundcloud/soundcloud-javascript
	 */

	/* 
		 Notes:		  
 */
	export default {
		name: 'soundcloud-player',
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
					this.playProvider()
				} else {
					this.pauseProvider()
				}
			},
			volume(vol) {
				this.player.getVolume(providerVol => {
					if (vol === providerVol) return
					this.player.setVolume(vol)
				})
			}
		},
		computed: {
			iframeSrc() {
				const videoUrl = `https://soundcloud.com/${this.videoId}`
				const src = `https://w.soundcloud.com/player/?url=${videoUrl}`
				return src
			}
		},
		methods: {
			initPlayer() {
				const element = this.$el
				const $iframe = element.querySelector('#SoundcloudPlayerR4 iframe')
				let player = SC.Widget($iframe);

				player.setVolume(this.volume);

				player.bind(SC.Widget.Events.READY, this.handleReady);
				player.bind(SC.Widget.Events.ERROR, this.handleError);
				player.bind(SC.Widget.Events.PAUSE, this.handlePause);
				player.bind(SC.Widget.Events.PLAY, this.handlePlay);
				player.bind(SC.Widget.Events.FINISH, this.handleEnded);
				this.$iframe = $iframe
				this.player = player
			},
			destroyPlayer() {
				const player = this.player
				if (player) {
					player.unbind(SC.Widget.Events.READY);
					player.unbind(SC.Widget.Events.ERROR);
					player.unbind(SC.Widget.Events.PAUSE)
					player.unbind(SC.Widget.Events.PLAY)
					player.unbind(SC.Widget.Events.FINISH)					
				}				 
			},
			handleError(error) {
				this.$emit('error')
			},
			handleReady() {
				console.log('~~~~~ soundcloud player ready!')
				/* if (this.isPlaying || this.autoPlay) {
					 this.playProvider()
					 } */
			},
			handleEnded() {
				console.log('ended')
				this.$emit('ended')
			},
			handlePlay() {
				console.log('play')
				this.$emit('playing')
			},
			handlePause() {
				console.log('pause')
				this.$emit('paused')
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
	.SoundcloudPlayer,
	#SoundcloudPlayerR4 {
		height: 100%;
	}
	.SoundcloudPlayer iframe {
		width: 100%;
		height: 100%;
	}
</style>
