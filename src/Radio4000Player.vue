<template>
	<div class="Layout" v-if="canLoad">
		<FetchData
			v-if="isOnline"
			:channelId="channelId"
			:channelSlug="channelSlug"
			:trackId="trackId"
			:currentChannel="channel"
			:currentTracks="tracks"
			@afterFetch="updateData">
		</FetchData>

		<div class="Layout-header">
			<channel-header
				:isOnline="isOnline"
				:channel="channel"
				:image="image"
				:r4Url="r4Url"
				:track="track"></channel-header>
		</div>
		<div class="Layout-section">
			<div class="Layout-aside">
				<provider-player
					:autoplay="autoplay"
					:isMuted="isMuted"
					:isPlaying="isPlaying"
					:track="track"
					:volume="internalVolume"
					@play="play"
					@pause="pause"
					@mediaNotAvailable="mediaNotAvailable"
					@trackEnded="trackEnded"></provider-player>
			</div>
			<div class="Layout-main">
				<track-list
					:currentTrackIndex="currentTrackIndex"
					:channelSlug="channel.slug"
					:track="track"
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
	<div v-else class="Console">
		<p>Radio4000-player is ready to start playing:
			<a href="https://github.com/internet4000/radio4000-player-vue">documentation</a>
		</p>
	</div>
</template>

<script>
	import debounce from 'lodash.debounce'
	import { mediaUrlParser } from 'media-url-parser'
	import { shuffleArray } from './utils/shuffle-helpers'

	import FetchData from './FetchData.vue'
	import ChannelHeader from './ChannelHeader.vue'
	import TrackList from './TrackList.vue'
	import ProviderPlayer from './ProviderPlayer.vue'
	import PlayerControls from './PlayerControls.vue'

	export default {
		components: {
			FetchData,
			ChannelHeader,
			TrackList,
			ProviderPlayer,
			PlayerControls
		},

		// Top level properties are also exposed as attributes on the web component.
		props: {
			channelSlug: String,
			channelId: String,
			trackId: String,
			autoplay: Boolean,
			r4Url: {
				type: Boolean,
				default: false
			},
			volume: {
				type: Number,
				default: 100
			},
			shuffle: Boolean,
			query: String
		},

		data () {
			return {
				channel: {},
				image: '',
				tracks: [],
				track: {},
				tracksPool: [],
				isPlaying: false,
				isShuffle: this.$props.shuffle
			}
		},

		created() {
			this.$root.$on('setVolume', debounce(vol => {
				this.internalVolume = vol
			}, 100))

			if (this.autoplay) {
				this.play()
			}
		},

		computed: {
			isOnline() {
				return window.navigator.onLine
			},
			// When either of these is set, it means we can load and show the player.
			canLoad() {
				return this.channel || this.channelSlug || this.channelId || this.trackId
			},
			currentTrackIndex() {
				let index = this.tracksPool.findIndex(track => track.uid === this.track.uid)
				// if there is no index, find a possible match
				// the use case is on r4-cms. When we load the player,
				// starting from `one specific track`, it is serialized outside the `track list`,
				// therefore its uid, is different from the uid of the same track in the `track list`.
				if (index < 0) {
					index = this.tracksPool.findIndex(track => {
						if (!track.id || !this.track.id) {
							return false
						} else {
							return track.id === this.track.id
						}
					})
				} 
				return index 
			},
			internalVolume: {
				get() {
					return this.volume
				},
				set(volume) {
					const el = this.$root.$el.parentNode
					el.setAttribute('volume', volume)
				}
			},
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
			}
		},

		watch: {
			shuffle(shuffle) {
				this.shuffle = shuffle
			},
			tracks(tracks) {
				this.newTracksPool()
				const noTrack = Object.keys(this.track).length === 0
				if (noTrack) {
					if ( this.isPlaying) {
						this.playNextTrack()
					} else {
						this.loadNextTrack()
					}
				}
			}
		},

		methods: {
			serializeTracks(tracks) {
				return tracks.map(this.serializeTrack)
			},
			serializeTrack(track) {
				const randomString = window.crypto.getRandomValues(new Uint32Array(1))[0]
				let parsed;

				try {
					parsed = mediaUrlParser(track.url.trim())
				} catch(e) {
					console.error('Broken track', track)
				}

				if (!parsed) {
					return {
						id: track.id,
						uid: randomString,
						url: track.url,
						title: `(bad url) ${track.title}`,
						body: track.body
					}
				}
				// id = original id of the track, untouched when given to the player
				// (it is also unsused, in this app, just given back in the events
				// that this player emits to outside apps. Ex: radio4000 when a track changes)
				// uid = unique id, each track has semi-random id just for itself
				// pid = id given by the provider for this media (youtube.com/:video-id)
				return {
					uid: parsed.id + randomString,
					id: track.id,
					pid: parsed.id,
					provider: parsed.provider,
					url: parsed.url,
					title: track.title,
					body: track.body
				}
			},
			updateData(newData) {
				if (newData.channel) this.channel = newData.channel
				if (newData.image) this.image = newData.image
				if (newData.tracks) {
					this.tracks = this.serializeTracks(newData.tracks)
				}
				if (newData.track) {
					// Don't set track directly.
					this.playTrack(this.serializeTrack(newData.track))
				}
			},
			newTracksPool() {
				var pool = this.tracks.slice().reverse()
				if (this.isShuffle) {
					const currentTrackArray = pool.splice(this.currentTrackIndex, 1)
					const shuffledArray = shuffleArray(pool)
					this.tracksPool = [...currentTrackArray, ...shuffledArray]
				} else {
					this.tracksPool = pool
				}
			},
			loadTrack(track) {
				const previousTrack = this.track
				this.track = track
				this.$emit('trackChanged', {
					track, previousTrack
				})
			},
			playTrack(track) {
				this.loadTrack(track)
				// force play when asking to play a track
				// also solves mediaNotAvailable putting pause
				this.play()
			},
			playNextTrack() {
				const track = this.getNextTrack()
				if (!track) return
				this.playTrack(track)
			},
			loadNextTrack() {
				const track = this.getNextTrack()
				if (!track) return
				this.loadTrack(track)
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

			/**
			 * Public methods
			 */

			// As an alternative to letting the player load the right data for you, you can pass a "playlist" object.
			updatePlaylist(playlist) {
				//  Reset tracks and image to show loading UX immediately.
				this.tracks = []
				this.image = ''
				
				this.channel = playlist
				if (playlist.image) this.image = playlist.image
				if (playlist.tracks.length) {
					const serializedTracks = this.serializeTracks(playlist.tracks)
					this.tracks = serializedTracks
				}
			},

			/**
			 * Public events
			 */

			trackEnded() {
				this.$emit('trackEnded', {
					track: this.track
				})
				this.playNextTrack()
			},
			mediaNotAvailable() {
				this.$emit('mediaNotAvailable', {
					track: this.track
				})
				this.trackEnded()					
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
	.Console {
		font-family: monospace;
		padding: 0 1em;
		line-height: 1.4;
	}

	.Layout {
		transition: border-color 500ms ease-in-out;
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
		position: relative;
	}
</style>
