<template>
	<div class="Layout">
		<div class="Layout-header">
			<channel-header
				:channel="channel"
				:image="image"
				:r4Url="r4Url"
				:track="currentTrack"></channel-header>
		</div>
		<div class="Layout-section">
			<div class="Layout-aside">
				<provider-player
					:autoplay="autoplay"
					:isMuted="isMuted"
					:isPlaying="isPlaying"
					:track="currentTrack"
					:volume="volume"
					@play="play"
					@pause="pause"
					@trackEnded="trackEnded"></provider-player>
			</div>
			<div class="Layout-main">
				<track-list
					:currentTrackIndex="currentTrackIndex"
					:channelSlug="channel.slug"
					:track="currentTrack"
					:tracks="tracksPool"
					:query="channel.query"
					@select="playTrack"></track-list>
			</div>
		</div>
		<div class="Layout-footer">
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
	</div>
</template>

<script>
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
		originTrack: Object,
		autoplay: Boolean,
		r4Url: Boolean,
		shuffle: Boolean,
		volume: Number,
		query: String
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
		if (Object.keys(this.originTrack).length !== 0) {
			this.playTrack(this.originTrack)
		}
	},
	computed: {
		isMuted: {
			get() {
				return this.volume === 0
			},
			set(newValue) {
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
		shuffle(shuffle) {
			this.isShuffle = shuffle
		},
		originTrack(track) {
			this.playTrack(track)
		},
		tracks(tracks) {
			this.newTracksPool()
			const noTrack = Object.keys(this.currentTrack).length === 0
			if (noTrack) this.playNextTrack()
		}
	},
	methods: {
		playTrack(track) {
			const previousTrack = this.currentTrack
			this.currentTrack = track
			this.$emit('trackChanged', {
				track,
				previousTrack
			})
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
			this.$emit('trackEnded', {
				track: this.currentTrack
			})
			this.playNextTrack()
		}
	}
}
</script>

<style>
/* Box sizing for all elements of the web component in non scoped style */

radio4000-player {
	box-sizing: border-box;
}

radio4000-player *,
radio4000-player *:before,
radio4000-player *:after {
	box-sizing: inherit;
}

radio4000-player {
	display: flex;
	width: 100%;
	/* youtube requirements */
	min-width: 200px;
	/* min and max heights need to be on root elemenet aka <radio4000-player> */
	/* header+aside+footer height */
	min-height: calc(3.5em + 200px + 2.75em);
	/* don't expand the viewport */
	max-height: 100vh;
	/* default height */
	height: 500px;
	height: calc(3.5em + 400px + 2.75em);
	background-color: hsl(260, 10%, 92%);
	color: hsl(0, 0%, 10%);
	font-size: 16px;
}
radio4000-player,
radio4000-player .Btn {
	font-family: 'Maison Neue', 'maisonneue', 'system-ui', sans-serif;
}
</style>

<style scoped>
.Layout {
	/* expand to container */
	flex: 1;
	/* allow scrolling */
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border: 1px solid hsl(0, 0%, 70%);
}

.Layout-header {
	flex-shrink: 0;
	min-height: 3.5em;
}

.Layout-footer {
	flex-shrink: 0;
	min-height: 2.75em;
	display: flex;
}

.Layout-aside > *,
.Layout-footer > * {
	flex: 1;
}

.Layout-section {
	flex: 1;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	min-height: 0;
	/* allow scrolling in FF */
	overflow: hidden;
}

.Layout-section>* {
	flex-grow: 1;
}

.Layout-aside {
	min-height: 200px;
	/* youtube requirements */
	display: flex;
	/* allow child to expand */
}

.Layout-main {
	flex-basis: 20em;
	min-height: 200px;
	/* this is where it breaks into two columns */
	max-width: 30rem;
	position: relative;
}
</style>
