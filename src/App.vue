<template>
	<div>
		<p>
			<label>
				<input type="checkbox" v-model="isDark">
				use dark skin
			</label>
		</p>

		<div class="Radio4000Player" :class="{dark: isDark}">
		<header>
			<channel-header
				:channel="channel"
				:track="track"></channel-header>
		</header>
		<aside>
			<youtube-player
				:video-id="track.ytid"
				:volume="volume"
				v-on:ready="onPlayerReady"></youtube-player>
		</aside>
		<main>
			<track-list
				:tracks="tracks"
				v-on:select="selectTrack"></track-list>
		</main>
	</div>
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
			track: {},
			isDark: true
		}
	},
	components: {
		ChannelHeader,
		TrackList,
		YoutubePlayer
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
			if (!player) {
				throw new Error(`YouTube API wasn't loaded correctly. Sorry`)
			}
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
</style>

<style>
	.Radio4000Player.dark {
		background-color: hsl(0, 0%, 10%);
		color: hsl(0, 0%, 75%);
		border: 0;
	}
	.Radio4000Player.dark .active {
		color: hsl(0, 0%, 100%);
	}
	.Radio4000Player.dark .TrackList li:before {
		color: hsl(0, 0%, 75%);
	}
	.Radio4000Player.dark button {
		background-color: hsl(0, 0%, 10%);
		border: 0;
		color: hsl(0, 0%, 75%);
	}
	/* Dark scrollbars for later.
	::-webkit-scrollbar {
		background-color: hsla(0, 0%, 50%, 0.4);
		width: 0.75em;
	}
	::-webkit-scrollbar:hover {
		background-color: hsla(0, 0%, 50%, 0.6);
	}
	::-webkit-scrollbar-thumb {
		background-color: hsla(0, 0%, 50%, 0.4);
	}
	::-webkit-scrollbar-thumb:active {
		background: rgba(0,0,0,0.61); 
	}
	*/
</style>

