<template>
	<div class="Radio4000Player">
		<header>
			<channel-header
				:channel="channel"
				:track="track"></channel-header>
		</header>

		<aside>
			<youtube-player
				:video-id="track.ytid"
				:volume="volume"
				@error="onPlayerError"
				@ready="onPlayerReady"
					@ended="onPlayerEnded"></youtube-player>

			<youtube-controls v-if="controls"
			:player="player"
			:masterVolume="volume"></youtube-controls>
		</aside>

		<main>
			<track-list
				:tracks="tracks"
				@select="selectTrack"></track-list>
		</main>
	</div>
</template>

<script>
import Vue from 'vue'
import ChannelHeader from './ChannelHeader.vue'
import TrackList from './TrackList.vue'
import YoutubePlayer from './YoutubePlayer.vue'
import YoutubeControls from './YoutubeControls.vue'
import store from './store'

export default {
	name: 'radio4000-player',
	props: {
		slug: String,
		volume: Number
	},
	data () {
		return {
			channel: {
				title: 'Loading Radio4000...'
			},
			tracks: [],
			track: {}
		}
	},
	components: {
		ChannelHeader,
		TrackList,
		YoutubePlayer,
YoutubeControls
	},
	created() {
		this.model()
	},
	methods: {
		selectTrack(track) {
			this.cueTrack(track)
			/* Vue.nextTick(this.player.playVideo)*/
		},
		cueTrack(track) {
			this.tracks.forEach(t => {t.active = false})
			track.active = true
			this.track = track
		},
		// runs once on load when yt-iframe is ready
		onPlayerReady(player) {
			/* if (!player) {
				 throw new Error(`YouTube API wasn't loaded correctly. Sorry`)
				 }
				 this.player = player*/
		},
		onPlayerError(event) {
			console.log({youtubeError: event.data})
		},
		onPlayerEnded(event) {
			let index = this.tracks.indexOf(this.track);
			this.cueTrack(this.tracks[index + 1]);
		},
		model() {
			let slug = this.slug
			if (!slug) return

			store.findChannelBySlug(slug).then(channel => {
				this.channel = channel

				const imageId = Object.keys(channel.images)[0]
				if (imageId) {
					store.findImage(imageId).then(image => {
						this.channel.image = image.src
					})
				}

				store.findTracks(channel.id).then(tracks => {
					// Define an extra `active` prop. Otherwise Vue won't detect changes.
					tracks.forEach(t => t.active = false)
					this.tracks = tracks
					this.afterModel()
				})
			})
		},
		afterModel() {
			this.cueTrack(this.tracks[0])
		},
	}
}
</script>

<style scoped>
	.Radio4000Player {
		display: flex;
		flex-direction: column;
		max-width: 320px;
		height: 500px;
		max-height: 95vh;
		border: 2px solid;
		border-right-width: 4px;
		border-bottom-width: 4px;
		background-color: hsla(260, 10%, 92%, 1);
		font-family: 'system-ui', sans-serif;
		font-size: 1em;
	}
	header {
		border-bottom: 1px solid hsla(0, 0%, 0%, 0.8);
	}
	aside {}
	main {
		flex: 1;
		overflow-y: scroll;
	}
</style>
