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

	const eventsName = {
		'-1': 'unstarted',
		0: 'ended',
		1: 'playing',
		2: 'paused',
		3: 'buffering',
		5: 'cued'
	}

	export default {
		name: 'youtube-player',
		props: [
			'videoId',
			'volume',
			'autoplay',
			'playing',
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
				
				console.log('watch track!!!', track);
				this.initPlayer().then(this.setTrackOnProvider(track))
			},
			volume(vol) {
				this.setVolume(vol)
			}
		},
		methods: {
			initPlayer() {
				return new Promise(resolve => {
					const playerExists = this.player.hasOwnProperty('getIframe')
					if(playerExists) {
						resolve();
					}
					
					const element = this.$el.querySelector('.ytplayer')
					this.player = YouTubePlayer(element)
					this.setVolume(this.volume)
					resolve(this.attachEventListeners())
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
				const id = event.data
				const name = eventsName[id]
				console.log('handleStateChange', id, name, event)
				if (id === 0) {
					this.$emit('playNextTrack');
				}
			},

			// select track to play
			setTrackOnProvider(track) {
				const player = this.player;
				const ytid = track.ytid;
				console.log('setTrackOnProvider:track:', track)
				console.log('setTrackOnProvider:player', player)
				/* player.loadVideoById({
					 'videoId': ytid
					 }).then(player.playVideo())*/
				player.loadVideoById(ytid).then(() => {
					// This extra "play" is needed on at least
					// Chrome on Android 4.2. Otherwise it stays "buffering".
					this.player.playVideo()
					console.log('playVideo');
				}).catch(error => consoloe.log)
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

