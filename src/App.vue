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
				v-on:ready="onPlayerReady"></youtube-player>
		</aside>
		<main>
			<track-list
				:tracks="tracks"
				v-on:select="selectTrack"></track-list>
		</main>
	</div>
</template>

<script>
import Vue from 'vue'
import ChannelHeader from './ChannelHeader.vue'
import TrackList from './TrackList.vue'
import YoutubePlayer from './YoutubePlayer.vue'
import store from './store'

export default {
	name: 'radio4000-player',
	props: ['slug'],
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
		ChannelHeader, TrackList, YoutubePlayer
	},
	created() {
		this.model()
	},
	methods: {
		model() {
			let slug = this.slug
			if (!slug) return

			store.findChannelBySlug(slug).then(channel => {
				this.channel = channel

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
		selectTrack(track) {
			this.cueTrack(track)
			Vue.nextTick(this.player.playVideo)
		},
		cueTrack(track) {
			this.tracks.forEach(t => {t.active = false})
			track.active = true
			this.track = track
		},
		onPlayerReady(player) {
			this.player = player
		}
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

	a {
		color: blue;
	}
</style>

