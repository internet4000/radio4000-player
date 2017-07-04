<template>
	<article class="R4PlayerLayout">
		<header>
			<channel-header
				:r4Url="r4Url"
				:channel="channel"
				:image="image"
				:track="currentTrack"></channel-header>
		</header>

		<aside>
			<provider-player
				:volume="volume"
				:track="currentTrack"
				:autoplay="autoplay"
				:isPlaying="isPlaying"
				:isMuted="isMuted"
				@play="play"
				@pause="pause"
				@trackEnded="trackEnded"></provider-player>
		</aside>

		<main>
			<track-list
				:tracks="tracksPool"
				:track="currentTrack"
				:currentTrackIndex="currentTrackIndex"
				@select="playTrack"></track-list>
		</main>

		<footer>
			<player-controls
				:isPlaying="isPlaying"
				:volume="volume"
				:isDisabled="!this.tracksPool.length"
				:isNotFullVolume="isNotFullVolume"
				:isMuted="isMuted"
				:isShuffle="isShuffle"
				@play="play"
				@pause="pause"
				@toggleMute="toggleMute"
				@toggleShuffle="toggleShuffle"
				@next="playNextTrack"></player-controls>
		</footer>
	</article>
</template>

<script>
	import Vue from 'vue'
	import ChannelHeader from './ChannelHeader.vue'
	import TrackList from './TrackList.vue'
	import ProviderPlayer from './ProviderPlayer.vue'
	import PlayerControls from './PlayerControls.vue'
	import { shuffleArray } from './utils/shuffle-helpers'

	export default {
		name: 'radio4000-player',
		components: {
			ChannelHeader,
			TrackList,
			ProviderPlayer,
			PlayerControls
		},
		props: {
			channel: Object,
			tracks: Array,
			track: Object,
			image: String,
			autoplay: Boolean,
			r4Url: Boolean,
			shuffle: Boolean,
			volume: Number
		},
		data () {
			return {
				playerReady: false,
				loop: false,
				isPlaying: false,
				isMuted: false,
				isShuffle: this.$props.shuffle,
				currentTrack: {},
				tracksPool: []
			}
		},
		created() {
			if (Object.keys(this.track).length !== 0) {
				this.playTrack(this.track)
			}
		},
		computed: {
			isNotFullVolume: function() {
				return this.volume < 100
			},
			currentTrackIndex() {
				return this.tracksPool.findIndex(track => track.id === this.currentTrack.id)
			}
		},
		watch: {
			shuffle: function(shuffle) {
				this.isShuffle = shuffle
			},
			track: function(track) {
				this.playTrack(track)
			},
			tracks: function(tracks) {
				this.newTracksPool()

				const noTrack = Object.keys(this.currentTrack).length === 0
				if (noTrack) this.playNextTrack()
			},
			volume: function(volume) {
				if (volume <= 0) {
					this.mute()
				}
				this.unMute()
			}
		},
		methods: {
			playTrack(track) {
				this.currentTrack = track
				this.$emit('trackChanged', track)
			},
			newTracksPool() {
				var newTracksPool = this.tracks.slice().reverse()
				if (this.isShuffle) {
					const currentTrackArray = newTracksPool.splice(this.currentTrackIndex, 1)
					const shuffledArray = shuffleArray(newTracksPool)
					this.tracksPool = [...currentTrackArray, ...shuffledArray]
				} else {
					this.tracksPool = newTracksPool
				}
			},
			playNextTrack() {
				const track = this.getNextTrack()
				if (!track) return
				this.playTrack(track)
			},
			getNextTrack() {
				const pool = this.tracksPool
				const index = this.currentTrackIndex
				return pool[index + 1]
			},
			play() {
				this.isPlaying = true
			},
			pause() {
				this.isPlaying = false
			},
			toggleMute() {
				this.isMuted = !this.isMuted
			},
			toggleShuffle() {
				this.isShuffle = !this.isShuffle
				this.newTracksPool()
			},
			trackEnded() {
				this.$emit('trackEnded', this.track)
				this.playNextTrack()
			}
		}
	}
</script>

<style>
	radio4000-player {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid hsl(0, 0%, 60%);
		font-family: 'maisonneue', 'system-ui', sans-serif;
		background-color: hsl(260, 10%, 92% );
		color: hsl(0, 0%, 10%);

		/* Responsive scaling. A min. width of 352px is required to show YouTube volume. */
		font-size: 1em;
		width: 100%;
		max-width: 352px;
		max-height: 100vh;
	}
</style>

<style scoped>
	.R4PlayerLayout {
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
	}
	aside {
		overflow: hidden;
		position: relative;
		min-height: 109px;
		max-height: calc(100vh - 20rem - (2.75rem * 2));
	}
	@media (min-width: 710px) {
		aside {
			/*height: 400px;*/
		}
	}
	aside .FlexEmbed {
		position: static;
	}
	main {
		flex-basis: 20rem;
		flex-grow: 1;
		position: relative;
		display: flex;
		overflow: hidden;
	}
</style>

<style id="Radio4000-mini">
	/* Mini skin. Hides track list and "play/pause" button */
	radio4000-player.mini {max-width: 320px; }
	radio4000-player.mini main {display: none;}
	radio4000-player.mini menu {border-top: 0;}
	radio4000-player.mini menu .PlayerControl-group:nth-child(2) {display: none;}
</style>

<style id="Radio4000-dark">
	radio4000-player.dark,
	radio4000-player.dark .Btn {
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 90%);
	}
	radio4000-player.dark {
		border-color: hsl(0, 0%, 0%);
	}
	radio4000-player.dark .TrackList li:before {
		color: hsla(0, 0%, 100%, 0.5);
	}
	radio4000-player.dark menu {
		border-top-color: hsl(0, 0%, 30%);
	}
	radio4000-player.dark .Header-playing,
	radio4000-player.dark .active {
		color: hsl(0, 0%, 100%);
	}
	radio4000-player.dark .R4 {
		fill: hsla(0, 0%, 100%, 0.3);
	}
</style>
