<template>
	<div class="SoundcloudPlayer">
		<article
			id="SoundcloudPlayerR4"
		>
			<!--
					 no soundcloud specific param are defined on the iframe,
					 but :src, that loads the media when it changes
			-->
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
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
	import '../libs/soundcloud.js'
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
			this.destroyPlayer(this.player)
		},
		watch: {
			isPlaying() {
				if (this.isPlaying) {
					this.player.isPaused((isPaused) => {
						isPaused && this.playProvider()
					})
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
				const srcWithParams = `${src}/&amp;auto_play=true`

				return srcWithParams
			}
		},
		methods: {
			initPlayer() {
				const element = this.$el
				const $iframe = element.querySelector('#SoundcloudPlayerR4 iframe')
				let player = SC.Widget($iframe);

				this.player = player;
				this.player.setVolume(this.volume);
				this.player.bind(SC.Widget.Events.READY, this.handleReady);
			},
			destroyPlayer(player) {
				if (player) {
					/* player.unbind(SC.Widget.Events.ERROR) */
					/* player.unbind(SC.Widget.Events.PAUSE) */
					/* player.unbind(SC.Widget.Events.PLAY) */
					/* player.unbind(SC.Widget.Events.FINISH)					 */
					player.unbind(SC.Widget.Events.READY);
				}				 
			},
			handleError(error) {
				console.log('error', error)
				this.$emit('error')
			},
			handleReady() {
				this.player.bind(SC.Widget.Events.ERROR, this.handleError);
				this.player.bind(SC.Widget.Events.PAUSE, this.handlePause);
				this.player.bind(SC.Widget.Events.PLAY, this.handlePlay);
				this.player.bind(SC.Widget.Events.FINISH, this.handleEnded);
			},
			handleEnded(ended) {
				console.log('ended', ended)
				this.$emit('ended')
			},
			handlePlay() {
				this.$emit('playing')
			},
			handlePause() {
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
