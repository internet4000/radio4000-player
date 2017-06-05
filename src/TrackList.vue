<template>
	<div id="TrackList"
			 class="TrackList">

		<aside v-if="tracks.length"
					 class="TrackList-controls">
			<button class="Btn"
							@click="locateCurrentTrack"
							title="Locate current track">◎</button>
		</aside>

		<Loading v-if="!tracks.length"/>
		<ol class="TrackList-list">
			<li v-for="(track, index) in tracks">
				<track-item :track="track"
										:class="{ active : currentTrackIndex === index }"
										v-on:select="select"></track-item>
			</li>
		</ol>
		
	</div>
</template>

<script>
	import TrackItem from './TrackItem.vue'
	import Loading from './Loading.vue'
	export default {
		name: 'track-list',
		props: ['tracks', 'track'],
		components: { TrackItem, Loading },
		computed: {
			currentTrackIndex() {
				var index = this.tracks.indexOf(this.track)
				return index < 0 ? 0 : index
			}
		},
		methods: {
			select(track) {
				this.$emit('select', track)
			},
			locateCurrentTrack() {
				const $container = document.querySelector('.TrackList .TrackList-list');
				const $tracks = $container.children
				const $activeTrack = $tracks[this.currentTrackIndex];
				$container.scrollTop = $activeTrack.offsetTop - 4;
			}
		}
	}
</script>

<style scoped>
	.TrackList {
		position: relative;
	}
	.TrackList-controls {
		position: absolute;
		bottom: 0.2rem;
		right: 1.2rem;
		z-index: 2;
	}
	.TrackList-list {
		overflow-y: scroll;
		overflow-x: hidden;
		margin: 0;
		padding: 0.6rem;
		font-size: 0.8125em;
		line-height: 1.7;
		list-style: none;
		counter-reset: tracks;
		flex: 1;
		transition: max-height 400ms ease-in-out;
		transform: translateZ(0);
		height: 8rem;
	}
	.TrackList--isActive .TrackList-list {
	}
	li {
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
