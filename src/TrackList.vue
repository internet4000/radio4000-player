<template>
	<div class="Tracklist">
		<Loading v-if="!hasTracks"></Loading>

		<ol class="Tracklist-list">
			<li v-if="query" class="Tracklist-query">
				<a v-if="queryPermalink"
					:href="queryPermalink"
					target="_self"
					title="Open this radio on Radio4000.com"
				>
					Playing selection <em>"{{query}}"</em>
				</a>
				<span v-else
					title="Current player selection (filter global list from selection)"
				>
					Playing selection <em>"{{query}}"</em>
				</span>
			</li>
			<li v-for="(track, index) in tracks" :key="track.uid" class="Tracklist-item">
				<track-item
					:track="track"
					:channelSlug="channelSlug"
					:class="{active : currentTrackIndex === index}"
					@select="$emit('select', track)"></track-item>
			</li>
		</ol>

		<div v-if="hasTracks" class="Tracklist-controls">
			<button class="Btn Btn--locateTrack" title="Locate current track" @click="locateCurrentTrack">◎</button>
		</div>

	</div>
</template>

<script>
import TrackItem from './TrackItem.vue'
import Loading from './Loading.vue'
import R4Logo from './R4Logo.vue'

export default {
	name: 'tracklist',
	props: {
		tracks: Array,
		track: Object,
		channelSlug: String,
		currentTrackIndex: Number,
		query: String,
		queryPermalink: String,
		platform: Boolean,
		isOnline: Boolean
	},
	components: {
		Loading,
		TrackItem,
		R4Logo
	},
	computed: {
		hasTracks() {
			return this.tracks && this.tracks.length > 0
		}
	},
	watch: {
		// When the `tracks` array is changed, scroll to current track.
		tracks() {
			this.$nextTick(this.locateCurrentTrack)
		}
	},
	methods: {
		locateCurrentTrack() {
			if (isNaN(this.currentTrackIndex)) return
			const container = this.$el.querySelector('.Tracklist-list')
			const tracks = this.$el.querySelectorAll('li')
			const activeTrack = tracks[this.currentTrackIndex]
			if (!activeTrack) return
			container.scrollTop = activeTrack.offsetTop - 4
		}
	}
}
</script>

<style scoped>
	.Tracklist-list {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: tracks;
		transform: translateZ(0);
	}
	.Tracklist-item {
		position: relative;
		border-bottom: 1px solid #e0e0e0;
	}
	.Tracklist-item:last-child {
		border-bottom: 0;
	}
	.Tracklist-item::after {
		content: counter(tracks) "";
		counter-increment: tracks;
		color: #696969;
		font-size: 0.5em;
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
	.Tracklist-query {
		background-color: lightgray;
		padding: 0.5em;
		font-size: 0.75em;
		text-align: center;
		position: sticky;
		top: 0;
		z-index: 1;
	}
	.Tracklist-controls {
		position: absolute;
		bottom: -0.1em;
		right: 1.5em;
		z-index: 1;
		opacity: 0.6;
	}
	.Tracklist-controls:hover {
		opacity: 1;
	}
	.Btn--locateTrack {
		padding: 0.9em;
		margin: 0;
		line-height: 1;
		border: 1px solid #999;
		background-color: hsl(0, 0%, 96%);
		border-radius: 3px;
	}
</style>
