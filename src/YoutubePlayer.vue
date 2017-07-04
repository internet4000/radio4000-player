<template>
	<div class="ytplayer"></div>
</template>

<script>
	// This component uses https://github.com/gajus/youtube-player
	// to abstract the youtube iframe api.
	// https://github.com/GoogleWebComponents/google-youtube/blob/master/google-youtube.html
	// https://developers.google.com/youtube/iframe_api_reference
	import YouTubePlayer from 'youtube-player'
	import bus from './bus'
	export default {
		name: 'youtube-player',
		props: [
			'autoplay',
			'volume',
			'isPlaying',
			'videoId'
		],
		data() {
			return {
				player: {},
				playerVars: {
					controls: 1,
					fs: 0,
					modestbranding: 1,
					origin: window.location.origin,
					playsinline: 1,
					rel: 0,
					showinfo: 0
				},
				didPlay: false
			}
		},
		mounted() {
			if (this.videoId) {
				this.initPlayer().then(this.setTrackOnProvider(this.videoId))
			}
		},
		watch: {
			videoId(videoId) {
				this.initPlayer().then(this.setTrackOnProvider(videoId))
			},
			isPlaying(isPlaying) {
				if (!this.player) return
				if (isPlaying) {
					this.playProvider()
				} else {
					this.pauseProvider()
				}
			},
			volume(vol) {
				console.log('changing youtube volume from top', vol)
				this.player.getVolume().then(youtubevol => {
					if (vol === youtubevol) {
						console.log('equal vol, not updating')
						return
					}
					this.player.setVolume(vol)
				})
			}
		},
		computed: {
			playerExists() {
				return this.player.hasOwnProperty('getIframe')
			}
		},
		methods: {
			initPlayer() {
				return new Promise(resolve => {
					if (this.playerExists) {
						resolve()
						return
					}
					const el = this.$el
					this.player = YouTubePlayer(el, {
						playerVars: this.playerVars
					})
					resolve(this.attachEventListeners())
				})
			},
			attachEventListeners() {
				return new Promise(resolve => {
					var player = this.player;
					player.on('error', this.handleError)
					player.on('stateChange', this.handleStateChange)
					player.on('ready', this.handleReady)
					player.on('volumeChange', this.handleVolumeChange)
					resolve()
				})
			},
			handleReady(resolve) {
				// Set initial volume.
				console.log('setting initial volume to', this.volume)
				this.player.setVolume(this.volume)
			},
			handleError(event) {
				this.$emit('trackEnded')
			},
			handleVolumeChange(event) {
				console.log('handleVolumeChange', {volume: this.volume, youtubeVolume: event.data.volume})
				if (event.data.volume !== this.volume) {
					console.log('volume change from youtube', event.data.volume)
					bus.$emit('setVolume', event.data.volume)
				}
			},
			handleStateChange(event) {
				const eventsName = {
					'-1': 'unstarted',
					0: 'ended',
					1: 'playing',
					2: 'paused',
					3: 'buffering',
					5: 'cued'
				}
				const id = event.data
				const name = eventsName[id]
				/* console.log('handleStateChange', id, name, event)*/

				const actions = {
					'-1': () => {},
					0: () => this.$emit('trackEnded'),
					1: () => this.$emit('play'),
					2: () => this.$emit('pause'),
					3: () => {},
					5: () => {}
				}

				if (id < 3) {
					actions[id]()
				}
			},

			// select track to play
			setTrackOnProvider(videoId) {
				if (!videoId) return
				if (this.autoplay || this.didPlay) {
					// The extra .then -> play here is to autoplay on mobile.
					this.player.loadVideoById({videoId}).then(this.playProvider)
				} else {
					this.player.cueVideoById({videoId})
					this.didPlay = true
				}
			},
			playProvider() {
				this.player.playVideo()
			},
			pauseProvider() {
				this.player.pauseVideo()
			}
		}
	}
</script>
