<template>
	<div class="TrackList"
			 v-bind:class="{ 'TrackList--isActive' : tracks.length }">

		<p v-if="tracks.length">currentTrackIndex: {{ this.currentTrackIndex }}</p>
		<ol v-if="tracks.length">
			<li v-for="(track, index) in tracks">
				<track-item :track="track"
										:class="{ active : currentTrackIndex === index }"
										v-on:select="select"></track-item>
			</li>
		</ol>
		<loading v-else/>
		
	</div>
</template>

<script>
	import TrackItem from './TrackItem.vue'
	import Loading from './Loading.vue'
	export default {
		name: 'track-list',
		props: ['tracks', 'track'],
		components: { TrackItem, Loading },
		data() {
			return {
				currentTrackIndex: 0
			}
		},
		watch: {
			tracks: function() {
				this.updateList()
			},
			track: function() {
				this.updateList()
			}
		},
		methods: {
			select(track) {
				this.$emit('select', track)
			},
			updateList() {
				if (!this.tracks || !this.track) return
				this.currentTrackIndex = this.tracks.indexOf(this.track)
			}
		}
	}
</script>

<style scoped>
	.TrackList {
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
		max-height: 0;
		height: 100%;
		transition: max-height 400ms ease-in-out;
		transform: translateZ(0)
	}
	.TrackList--isActive {
		max-height: 9rem
	}
	ol {
		margin: 0;
		font-size: 0.8125em;
		line-height: 1.7;
	}
	li {
		padding: 0 0.3em;
	}

	/* Add counter because it looks slightly better 
		 than the default list numbers.*/
	ol {
		padding: 0;
		list-style: none;
		counter-reset: tracks;
	}
	li {
		display: flex;
	}
	li::before {
		content: counter(tracks) ".";
		counter-increment: tracks;
		float: left;
		margin-right: 0.4em;
	}
	li > div {
		flex: 1;
	}
</style>
