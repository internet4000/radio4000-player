<template>
	<div id="YoutubePlayer">
		<div class="Ratio"></div>
		<div class="ytplayer"></div>
	</div>
</template>

<script>
	// This component uses https://github.com/gajus/youtube-player
	// to abstract the youtube iframe api.
	// note: https://github.com/GoogleWebComponents/google-youtube/blob/master/google-youtube.html
	// note: https://developers.google.com/youtube/iframe_api_reference
	// note: there are no event listeners for volume
	//       so changing volume on YT player can't be
	//       repercuted on <r4-player> interface
	import YouTubePlayer from 'youtube-player'

	localStorage.debug = 'youtube-player:*';

	export default {
		name: 'youtube-player',
		props: [
			'videoId',
			'volume',
			'autoplay',
			'isPlaying',
			'isMute',
			'playNextTrack',
			'track'
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
				}
			}
		},
		watch: {
			track(track) {
				console.log('watch:track', track)
				this.initPlayer().then(this.setTrackOnProvider(track))
			},
			isPlaying(isPlaying) {
				if(isPlaying) {
					this.playProvider();
				} else {
					this.pauseProvider();
				}
			},
			isMute(isMute) {
				if(isMute && this.playerExists) {
					this.muteProvider()
				} else {
					this.unMuteProvider();
				}
			}
		},
		computed: {
			playerExists: function() {
				return this.player.hasOwnProperty('getIframe')
			}
		},
		methods: {
			initPlayer() {
				return new Promise(resolve => {
					if(this.playerExists) {
						return resolve();
					}
					
					const el = this.$el.querySelector('.ytplayer')
					this.player = YouTubePlayer(el, {
						playerVars: this.playerVars
					})
					return resolve(this.attachEventListeners())
				})
			},
			attachEventListeners() {
				return new Promise(resolve => {
					var player = this.player;
					player.on('error', this.handleError)
					player.on('stateChange', this.handleStateChange)
					player.on('ready', this.handleReady)
					resolve()
				})
			},
			handleReady(resolve) {
				console.log('handleReady');
				this.unMuteProvider();
			},
			handleError(event) {
				console.log('handleError:event')
				console.log({youtubeError: event})
				this.$emit('playNextTrack');
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
				console.log('handleStateChange', id, name, event)

				const actions = {
					'-1': () => {},
					0: () => this.$emit('playNextTrack'),
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
			setTrackOnProvider(track) {
				const ytid = track.ytid;
				this.player.loadVideoById({
					'videoId': ytid
				}).then(this.playProvider())
			},
			playProvider() {
				this.player.playVideo()
			},
			pauseProvider() {
				this.player.pauseVideo()
			},
			muteProvider() {
				this.player.mute();
			},
			unMuteProvider() {
				this.player.unMute()
				this.player.setVolume(100)
			}
		}
	}
</script>

<style scoped>
	#YoutubePlayer {
		position: relative;
		background-color: black;
		height: 25vh;
		overflow: hidden;
	}
	.Ratio {
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
		padding-bottom: calc(9/16*100%);
	}
</style>

<style>
	#YoutubePlayer iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

