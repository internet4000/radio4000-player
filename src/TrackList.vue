<template>
	<div class="TrackList">
		<Loading v-if="!tracks || !tracks.length" />
		<ol class="TrackList-list">
			<li v-for="(track, index) in tracks" class="TrackList-item">
				<track-item :track="track"
					:class="{ active : currentTrackIndex === index }"
					@select="select"></track-item>
			</li>
		</ol>
		<div v-if="tracks && tracks.length" class="TrackList-controls">
			<button class="Btn" title="Locate current track"
				@click="locateCurrentTrack">◎</button>
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
			const container = this.$el.querySelectorAll('.TrackList-list');
			const tracks = this.$el.querySelectorAll('li');
			const activeTrack = tracks[this.currentTrackIndex]
			if (!activeTrack) return
				container.scrollTop = activeTrack.offsetTop - 4
			}
		}
	}
</script>

<style scoped>
	.TrackList {
		display: flex;
		position: relative;
		max-width: 40rem;
	}
	.TrackList-list {
		overflow-y: scroll;
		margin: 0;
		padding: 0;
		line-height: 1.7;
		list-style: none;
		counter-reset: tracks;
		transform: translateZ(0);
	}
	.TrackList-item {
		font-size: 0.777em;
		padding-right: 0.6rem;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
	}
	.TrackList-item::after {
		content: counter(tracks) "";
		counter-increment: tracks;
		color: #737373;
		font-size: 0.6rem;
		padding-left: 0.4rem;
	}
	
	.TrackList-controls {
		position: absolute;
		bottom: 0.3rem;
		right: 0.3rem;
		z-index: 1;
		opacity: 0.5;
	}
	.TrackList-controls:hover {
		opacity: 1;
	}
</style>
