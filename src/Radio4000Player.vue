<template>
	<article>

		<!-- <header>
				 <channel-header
				 :channel="channel"
				 :image="image"
				 :track="track"></channel-header>
				 </header> -->

		<aside>
			<youtube-player
					:track="currentTrack"
					:autoplay="autoplay"
					:playing="playing"
					:volume="volume"
					@playNextTrack="playNextTrack"></youtube-player>
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
					@select="playTrack"></track-list>
		</main>

		<footer>
			<player-controls
					v-if="playerReady"
					:player="player"
					:playing="playing"
					@play="play"
					@pause="pause"
					@next="next"></player-controls>
		</footer>
	</article>
</template>

<script>
	import Vue from 'vue'
	import ChannelHeader from './ChannelHeader.vue'
	import TrackList from './TrackList.vue'
	import YoutubePlayer from './YoutubePlayer.vue'
	import PlayerControls from './PlayerControls.vue'

	export default {
		name: 'radio4000-player',
		components: {
			ChannelHeader,
			TrackList,
			YoutubePlayer,
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
				playing: false,
				currentTrack: {},
				tracksPool: []
			}
		},
		computed: {
			playlist: function() {
				return this.tracks.reverse()
			}
		},
		watch: {
			track: function(track) {
				this.playTrack(track);
				return track;
			},
			tracks: function(tracks) {
				this.newTracksPool(tracks);
				return tracks;
			}
		},
		methods: {
			playTrack(track) {
				this.currentTrack = track;
			},
			newTracksPool(tracks) {
				this.tracksPool = tracks;
			},
			playNextTrack() {
				const track = this.getNextTrack()
				if (!track) {
					return
				}
				this.playTrack(track)
			},
			getNextTrack() {
				const pool = this.tracksPool
				const index = pool.indexOf(this.currentTrack)
				return pool[index + 1]
			}
		}
	}
</script>

<style>
	radio4000-player {
		display: block;
		width: 352px; /* wide enough to show youtube time */
		max-width: 100%;
		height: 400px;
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
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	header {}
	aside {}
	main {
		flex: 1;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	footer {}
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

