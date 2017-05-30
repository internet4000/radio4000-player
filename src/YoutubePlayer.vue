<template>
	<div id="YoutubePlayer">
		<div class="Ratio"></div>
		<div class="ytplayer"></div>
	</div>
</template>

<script>
	// This component uses https://github.com/gajus/youtube-player
	// to abstract the youtube iframe api.
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
			volume(vol) {
				this.isMute(false);
				this.setVolume(vol)
				console.log(vol)
				if(vol = 0) {
					this.isMute(true);
				}
			},
			isPlaying(isPlaying) {
				if(isPlaying) {
					this.playProvider();
				} else {
					this.pauseProvider();
				}
			},
			isMute(isMute) {
				if(isMute) {
					this.muteProvider();
				} else {
					this.unMuteProvider();
				}
			}
		},
		methods: {
			initPlayer() {
				return new Promise(resolve => {
					const playerExists = this.player.hasOwnProperty('getIframe')

					if(playerExists) {
						return resolve();
					}
					
					const el = this.$el.querySelector('.ytplayer')
					this.player = YouTubePlayer(el, {
						playerVars: this.playerVars
					})
					this.setVolume(this.volume)
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
			setVolume(vol) {
				if (this.player && vol !== undefined) {
					this.player.setVolume(vol)
				}
			},
			handleReady(resolve) {
				console.log('handleReady');
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
				/* console.log('handleStateChange', id, name, event)*/

				const actions = {
					'-1': () => this.$emit('pause'),
					0: () => this.$emit('playNextTrack'),
					1: () => this.$emit('play'),
					2: () => this.$emit('pause')
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
				this.setVolume(0)
			},
			unMuteProvider() {
				this.setVolume(100)
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

