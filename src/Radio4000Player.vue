<template>
	<article class="Player">
		<header>
			<channel-header
					:channel="channel"
					:image="image"
					:track="currentTrack"></channel-header>
		</header>

		<aside>
			<provider-player
					:volume="volume"
					:track="currentTrack"
					:isPlaying="isPlaying"
					:isMute="isMute"
					:autoplay="autoplay"
					@play="play"
					@pause="pause"
					@playNextTrack="playNextTrack"></provider-player>
		</aside>

		<main v-if="showTrack">
			<track-current
					v-if="tracksPool"
					:track="currentTrack"></track-current>
		</main>

		<main v-if="showTracks">
			<track-list
					v-if="tracksPool"
					:tracks="tracksPool"
					:track="currentTrack"
					@select="playTrack"></track-list>
		</main>

		<footer>
			<player-controls
					:isPlaying="isPlaying"
					:volume="volume"
					:isNotFullVolume="isNotFullVolume"
					:isMute="isMute"
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
	import { shuffleArray } from './utils/shuffle-helpers';

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
			showCurrentTrack: Boolean,
			showTracks: Boolean,
			volume: Number
		},
		data () {
			return {
				playerReady: false,
				autoplay: false,
				loop: false,
				isPlaying: false,
				isMute: false,
				isShuffle: false,
				currentTrack: {},
				tracksPool: []
			}
		},
		computed: {
			isNotFullVolume: function() {
				return this.volume < 100
			}
		},
		watch: {
			track: function(track) {
				this.playTrack(track);
				return track;
			},
			tracks: function(tracks) {
				this.newTracksPool();
				return tracks;
			},
			volume: function(volume) {
				if(volume <= 0) {
					this.mute()
				}
				this.unMute();
			}
		},
		methods: {
			playTrack(track) {
				this.currentTrack = track;
			},
			newTracksPool() {
				if(this.isShuffle) {
					this.tracksPool = shuffleArray(this.tracks);
				} else {
					this.tracksPool = this.tracks;
				}
			},
			playNextTrack() {
				const track = this.getNextTrack()
				console.log('playNextTrack:track', track)
				if (!track) {
					return
				}
				this.playTrack(track)
			},
			getNextTrack() {
				const pool = this.tracksPool
				const index = pool.indexOf(this.currentTrack)
				return pool[index + 1]
			},
			play() {
				this.isPlaying = true;
			},
			pause() {
				this.isPlaying = false;
			},
			toggleMute() {
				if(this.isMute) {
					this.isMute = false
				} else {
					this.isMute = true
				}
			},
			toggleShuffle() {
				if(this.isShuffle) {
					this.isShuffle = false
				} else {
					this.isShuffle = true
				}
				this.newTracksPool();
			}
		}
	}
</script>

<style>
	radio4000-player {
		display: block;
		width: 100%;
		max-width: 352px; /* wide enough to show youtube time */
		overflow: hidden;
		border: 1px solid hsl(0, 0%, 60%);
		background-color: hsl(260, 10%, 92% );
		color: hsl(0, 0%, 10%);
		font-family: 'maisonneue', 'system-ui', sans-serif;
		font-size: 1em;
		box-sizing: border-box;
	}
</style>

<style scoped>
	.Player {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>

<style id="Radio4000-mini">
	/* Mini skin. Hides track list and "play/pause" button */
	radio4000-player.mini {max-width: 320px; height: auto !important;}
	radio4000-player.mini main {display: none;}
	radio4000-player.mini menu {border-top: 0;}
	radio4000-player.mini menu button:first-child {display: none;}
	radio4000-player.mini footer {margin-top:auto}
</style>

<style id="Radio4000-dark">
	radio4000-player.dark,
	radio4000-player.dark button {
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 90%);
	}
	radio4000-player.dark {
		border-color: hsl(0, 0%, 0%);
	}
	radio4000-player.dark .TrackList li:before {
		color: hsla(0, 0%, 100%, 0.5);
	}
	radio4000-player.dark .Header-playing,
	radio4000-player.dark .active {
		color: hsl(0, 0%, 100%);
	}
	radio4000-player.dark .R4 {
		fill: hsla(0, 0%, 100%, 0.3);
	}
</style>

