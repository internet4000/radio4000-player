<template>

	<div class="TrackList">
		<ol v-if="tracks.length">
			<li v-for="track in tracks">
				<track-item :track="track" v-on:select="select"></track-item>
			</li>
		</ol>
		<loading v-else message="Loading tracks"/>
	</div>
	
</template>

<script>
import TrackItem from './TrackItem.vue'
import Loading from './Loading.vue'
export default {
	name: 'track-list',
	props: ['tracks'],
	components: { TrackItem, Loading },
	methods: {
		select(track) {
			this.$emit('select', track)
		}
	}
}
</script>

<style scoped>
	.TrackList {
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
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
