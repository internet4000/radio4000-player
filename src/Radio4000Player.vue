<template>
	<div class="R4PlayerLayout">
		<slot></slot>

		<channel-header
				:channel="channel"
				:image="image"
				:r4Url="r4Url"
				:track="currentTrack"></channel-header>

		<main>	
			<provider-player
					:autoplay="autoplay"
					:isMuted="isMuted"
					:isPlaying="isPlaying"
					:track="currentTrack"
					:volume="volume"
					@play="play"
					@pause="pause"
					@trackEnded="trackEnded"
			></provider-player>

			<track-list
					:currentTrackIndex="currentTrackIndex"
					:track="currentTrack"
					:tracks="tracksPool"
					@select="playTrack"></track-list>
		</main>

		<player-controls
				:isDisabled="!this.tracksPool.length"
				:isMuted="isMuted"
				:isPlaying="isPlaying"
				:isShuffle="isShuffle"
				:volume="volume"
				@play="play"
				@pause="pause"
				@toggleMute="toggleMute"
				@toggleShuffle="toggleShuffle"
				@next="playNextTrack"></player-controls>
	</div>
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
			image: String,
			tracks: Array,
			track: Object,
			autoplay: Boolean,
			r4Url: Boolean,
			shuffle: Boolean,
			volume: Number
		},
		data () {
			return {
				currentTrack: {},
				isPlaying: false,
				isShuffle: this.$props.shuffle,
				loop: false,
				playerReady: false,
				tracksPool: []
			}
		},
		created() {
			if (Object.keys(this.track).length !== 0) {
				this.playTrack(this.track)
			}
		},
		computed: {
			isMuted: {
				get: function() {
					return this.volume === 0 
				},
				set: function(newValue) {
					if (newValue) {
						this.$root.$emit('setVolume', 0)
					} else {
						this.$root.$emit('setVolume', 100)
					}
				}
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
			toggleShuffle() {
				this.isShuffle = !this.isShuffle
				this.newTracksPool()
			},
			toggleMute() {
				this.isMuted = !this.isMuted
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
		/* max-width: 352px; */
		max-height: 90vh;
	}
</style>

<style scoped>
	.R4PlayerLayout {
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
	}
	main {
		display: flex;
		flex-direction: column;
	}
	@media screen and (min-width: 40rem) {
		main {
			flex-direction: row;
		}
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
