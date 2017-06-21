<template>
	<div>
		<Loading v-if="!tracks || !tracks.length" />
		<ol class="TrackList">
			<li v-for="(track, index) in tracks">
				<track-item
					:track="track"
					:class="{ active : currentTrackIndex === index }" 
					@select="select"></track-item>
			</li>
		</ol>
		<div v-if="tracks && tracks.length" class="TrackListControls">
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
			const $container = this.$el.querySelector('ol')
			const $tracks = $container.children
				const $activeTrack = $tracks[this.currentTrackIndex]
				if (!$activeTrack) return
				$container.scrollTop = $activeTrack.offsetTop - 4
			}
		}
	}
</script>

<style scoped>
	.TrackListControls {
		position: absolute;
		bottom: 0.2rem;
		right: 1rem;
		z-index: 2;
		opacity: 0.5;
	}
	.TrackListControls:hover {
		opacity: 1;
	}
	ol {
		box-sizing: border-box;
		margin: 0;
		padding: 0.6rem;
		line-height: 1.7;
		list-style: none;
		counter-reset: tracks;
		transition: max-height 400ms ease-in-out;
		transform: translateZ(0);
	}
	li {
		font-size: 0.8125em;
		padding: 0 0.3em;
		display: flex;
	}
	li::before {
		content: counter(tracks) ".";
		counter-increment: tracks;
		float: left;
		margin-right: 0.4em;
	}
</style>
