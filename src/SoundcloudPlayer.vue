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
		 Notes: soundcloud is a bit tricky
		 - it does not seem possible to use their js on github, since they don't give api keys no more
		 - Their widget sends weird pause events when a track is finished
		 and changing directly the `src` on the iframe breaks the listeners
		 - We do not, but could, handle sets, just playing the first track for now
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
			this.destroyPlayer(this.player)
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
					this.destroyPlayer(this.player)
					this.initPlayer()
				}
				this.handleIsPlaying()
			}
		},
		computed: {
			iframeSrc() {
				// just a base url to init the player,
				// even with a wrong video, and then we load the correct one
				return `https://w.soundcloud.com/player/?url=https://soundcloud.com`
			},
			videoUrl() {
				// the URL we use to load in the player when it needs
				return `https://soundcloud.com/${this.videoId}`
			}
		},
		methods: {
			initPlayer(){
				// find the iframe, bind ready, then do the things
				const $iframe = this.$el.querySelector('#SoundcloudPlayerR4 iframe')
				let player = SC.Widget($iframe)
				player.load(this.videoUrl)
				player.bind(SC.Widget.Events.READY, () => {
					this.handleReady(player)
				})
			},
			handleReady(player) {
				// keep a trace of the player when we need to access it
				this.player = player
				this.player.bind(SC.Widget.Events.ERROR, this.handleError);
				this.player.bind(SC.Widget.Events.PAUSE, this.handlePause);
				this.player.bind(SC.Widget.Events.PLAY, this.handlePlay);
				this.player.bind(SC.Widget.Events.FINISH, this.handleEnded);
				this.player.setVolume(this.volume)
				this.handleIsPlaying()
			},
			destroyPlayer(player) {
				if (!player) return
				// these evens give error when being removed, but to hell yeh?
				// maybe because removing READY is enough, lo?
				// https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements
				/* this.player.unbind(SC.Widget.Events.ERROR)
					 this.player.unbind(SC.Widget.Events.PAUSE)
					 this.player.unbind(SC.Widget.Events.PLAY)
					 this.player.unbind(SC.Widget.Events.FINISH) */
				this.player.unbind(SC.Widget.Events.READY);
			},
			handleError(error) {
				// not sure what to do yet with the errors
				// so just logging it out, so we figure
				console.log('error', error)
				this.$emit('error', error)
				// emit ended to go to the next track
				this.$emit('ended')
			},			 
			handleEnded(ended) {
				this.$emit('ended')
			},
			handlePlay(playing) {
				console.log('play')
				/* Why is there 2 playing events being emited? */
				this.$emit('playing', playing)
			},
			handlePause(pause) {
				console.log('pause')
				if (pause.relativePosition > 0.99) {
					// if it is a pause emited at the last end of the track.
					// it is probably soundcloud API triggered, so skip
					return
				}
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
