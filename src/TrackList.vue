<template>
	<div class="TrackList">
		<Loading v-if="!tracks || !tracks.length"></Loading>
		<ol class="TrackList-list">
			<li v-for="(track, index) in tracks" :key="track.id" class="TrackList-item">
				<track-item
					:track="track"
					:channelSlug="channelSlug"
					:class="{active : currentTrackIndex === index}"
					@select="select"></track-item>
			</li>
		</ol>
		<div v-if="tracks && tracks.length" class="TrackList-controls">
			<button class="Btn Btn--locateTrack" title="Locate current track" @click="locateCurrentTrack">◎</button>
		</div>
	</div>
</template>

<script>
import TrackItem from './TrackItem.vue'
import Loading from './Loading.vue'
export default {
	name: 'track-list',
	props: {
		tracks: Array,
		track: Object,
		channelSlug: String,
		currentTrackIndex: Number
	},
	components: {
		Loading,
		TrackItem
	},
	watch: {
		tracks() {
			this.$nextTick(this.locateCurrentTrack)
		}
	},
	methods: {
		select(track) {
			this.$emit('select', track)
		},
		locateCurrentTrack() {
			if (isNaN(this.currentTrackIndex)) return
			const container = this.$el.querySelector('.TrackList-list');
			const tracks = this.$el.querySelectorAll('li');
			const activeTrack = tracks[this.currentTrackIndex]
			if (!activeTrack) return
			container.scrollTop = activeTrack.offsetTop - 4
		}
	}
}
</script>

<style scoped>
	.TrackList-list {
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
	.TrackList-item {
		position: relative;
		border-bottom: 1px solid #e0e0e0;
	}
	.TrackList-item:last-child {
		border-bottom: 0;
	}
	.TrackList-item::after {
		content: counter(tracks) "";
		counter-increment: tracks;
		color: #737373;
		font-size: 0.5em;
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
	.TrackList-controls {
		position: absolute;
		bottom: 0.5em;
		right: 1.3em;
		z-index: 1;
		opacity: 0.6;
	}
	.TrackList-controls:hover {
		opacity: 1;
	}
	.Btn--locateTrack {
		padding: 0.5em;
		margin: 0;
		line-height: 1;
		border: 1px solid #999;
	}
</style>
