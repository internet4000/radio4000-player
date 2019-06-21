<template>
	<div class="ytplayer">
		<article id="YoutubeIframeR4"></article>
	</div>
</template>

<script>
	// This component uses https://github.com/gajus/youtube-player
	// to abstract the youtube iframe api.
	// https://github.com/GoogleWebComponents/google-youtube/blob/master/google-youtube.html
	// https://developers.google.com/youtube/iframe_api_reference
	import YouTubePlayer from 'youtube-player'
	export default {
		name: 'youtube-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			videoId: String,
			volume: Number
		},
		data() {
			return {
				ytstate: -1,
				didPlay: false,
				player: {},
				playerVars: {
					controls: 1,
					fs: 0,
					modestbranding: 1,
					origin: window.location.origin,
					playsinline: 1,
					rel: 0,
					showinfo: 0
				}
			}
		},
		mounted() {
			if (this.videoId) {
				this.initPlayer().then(this.setTrackOnProvider(this.videoId))
			}
		},
		beforeDestroy() {
			if (this.playerExists) {
				this.player.getIframe().then(() => {
					this.player.removeEventListener('error', this.handleError)
					this.player.removeEventListener('stateChange', this.handleStateChange)
					this.player.removeEventListener('ready', this.handleReady)
					this.player.removeEventListener('volumeChange', this.handleVolumeChange)
					return this.player.destroy()
				})
			}
		},
		watch: {
			videoId(videoId) {
				return this.initPlayer().then(this.setTrackOnProvider(videoId))
			},
			isPlaying(val) {
				if (val) {
					if (this.ytstate !== 1) this.playProvider()
				} else {
					// Calling `loadVideoById` sends a `paused` event. This makes sure
					// we only pause if it's not already paused.
						if (this.ytstate !== 2) this.pauseProvider()
				}
			},
			volume(vol) {
				this.player.getVolume().then(youtubevol => {
					if (vol === youtubevol) return
					this.player.setVolume(vol)
				})
			}
		},
		computed: {
			playerExists() {
				if (!this.player) return false
				return this.player.hasOwnProperty('getIframe')
			}
		},
		methods: {
			initPlayer() {
				var player
				var playerVars = this.playerVars
				var element = this.$el
				var YoutubeIframeR4 = element.querySelector('#YoutubeIframeR4')
				
				return new Promise(resolve => {
					if (!this.playerExists) {
						player = YouTubePlayer(YoutubeIframeR4, {playerVars})
						player.on('error', this.handleError)
						player.on('stateChange', this.handleStateChange)
						player.on('ready', this.handleReady)
						player.on('volumeChange', this.handleVolumeChange)
						this.player = player
						resolve(this.player)
					}
					resolve()
				})
			},
			handleReady(resolve) {
				// Set initial volume.
					let vol = this.volume
				this.player.unMute().then(() => {
					this.player.setVolume(vol)
				})
			},
			handleError({data}) {
				// error codes
				if ([100, 101, 150].includes(data)) {
					this.$emit('mediaNotAvailable')
					// do not yet fire ended, we do when we catch mediaNotAvailable
				} else {
					// error, fire ended so we move to next track
					this.$emit('ended')
				}
			},
			handleVolumeChange(event) {
				if (event.data.volume !== this.volume) {
					this.$root.$emit('setVolume', event.data.volume)
				}
			},
			handleStateChange(event) {
				this.ytstate = event.data
				const events = {
					'-1': 'unstarted',
					0: 'ended',
					1: 'playing',
					2: 'paused',
					3: 'buffering',
					5: 'cued'
				}
				const eventName = events[this.ytstate]
				const actions = {
					'-1': () => {},
					0: () => this.$emit('ended'),
					1: () => this.$emit('playing'),
					2: () => this.$emit('paused'),
					3: () => this.$emit('buffering'),
					5: () => this.$emit('cued')
				}
				// console.log('yt:'+eventName)
				actions[this.ytstate]()
			},

			// select track to play
			setTrackOnProvider(videoId) {
				if (!videoId) return
				if (this.autoplay || this.didPlay || this.isPlaying) {
					this.player.loadVideoById({videoId})
					// The extra play here is to autoplay on mobile.
					// this.playProvider()
				} else {
					this.player.cueVideoById({videoId})
					this.didPlay = true
				}
			},
			playProvider() {
				return this.player.playVideo()
			},
			pauseProvider() {
				return this.player.pauseVideo()
			}
		}
	}
</script>

<style>
	.ytplayer {
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
