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
	import './libs/soundcloud.js'
	export default {
		name: 'soundcloud-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			videoId: String,
			volume: Number
		},
		data() {
			return {
				player: {}
			}
		},
		mounted() {
			this.initPlayer()
		},
		beforeDestroy() {
			this.destroyPlayer()
		},
		watch: {
			isPlaying() {
				this.handleIsPlaying()
			},
			volume(vol) {
				this.player.getVolume(providerVol => {
					if (vol === providerVol) return
					this.player.setVolume(vol)
				})
			},
			videoId() {
				if (this.player) {
					/* this.player.load(this.videoUrl) */
					this.destroyPlayer()
					this.initPlayer()
				}
				this.handleIsPlaying()
			}
		},
		computed: {
			iframeSrc() {
				const videoUrl = `https://soundcloud.com/${this.videoId}`
				const src = `https://w.soundcloud.com/player/?url=https://soundcloud.com`
				/* const src = `https://w.soundcloud.com/player/?url=${videoUrl}` */
				const srcWithParams = `${src}`
				// /&auto_play=true
				return srcWithParams
			},
			videoUrl() {
				return `https://soundcloud.com/${this.videoId}`
			}
		},
		methods: {
			initPlayer(){
				const $iframe = this.$el.querySelector('#SoundcloudPlayerR4 iframe')
				let player = SC.Widget($iframe)
				player.load(this.videoUrl)
				player.bind(SC.Widget.Events.READY, () => {
					this.handleReady(player)
				})
			},
			handleReady(player) {
				this.player = player
				console.log('initplayer, player', this.player)
				this.player.bind(SC.Widget.Events.ERROR, this.handleError);
				this.player.bind(SC.Widget.Events.PAUSE, this.handlePause);
				this.player.bind(SC.Widget.Events.PLAY, this.handlePlay);
				this.player.bind(SC.Widget.Events.FINISH, this.handleEnded);
				this.handleIsPlaying()
			},
			destroyPlayer() {
				if (!this.player) return
				this.player.unbind(SC.Widget.Events.ERROR)
				this.player.unbind(SC.Widget.Events.PAUSE)
				this.player.unbind(SC.Widget.Events.PLAY)
				this.player.unbind(SC.Widget.Events.FINISH)
				this.player.unbind(SC.Widget.Events.READY);
			},
			handleError(error) {
				console.log('error', error)
				/* this.$emit('error') */
			},			 
			handleEnded(ended) {
				console.log('ended', ended)
				/* this.destroyPlayer() */
				this.$emit('ended')
			},
			handlePlay() {
				console.log('playing')
				this.$emit('playing')
			},
			handlePause(pause) {
				if (pause.relativePosition > 0.99) {
					// if it is a pause emited at the last end of the track.
					// it is probably soundcloud API triggered, so skip
 					/* return window.setTimeout(this.handleEnded, 1) */
					return
				}
					
				console.log('paused', pause)
				this.$emit('paused')
			},

			handleIsPlaying() {
				if (this.player && this.isPlaying) {
					this.player.isPaused((isPaused) => {
						if(isPaused) this.playProvider()
					})
				} else {
					this.pauseProvider()
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
	.SoundcloudPlayer,
	#SoundcloudPlayerR4 {
		height: 100%;
	}
	.SoundcloudPlayer iframe {
		width: 100%;
		height: 100%;
	}
</style>
