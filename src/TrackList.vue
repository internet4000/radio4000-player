<template>
	<ol class="TrackList">
		<li v-for="track in tracks">
			<track-item :track="track" v-on:select="select"></track-item>
		</li>
	</ol>
</template>

<script>
import TrackItem from './TrackItem.vue'
export default {
	name: 'track-list',
	props: ['tracks'],
	components: {TrackItem},
	methods: {
		select(track) {
			this.$emit('select', track)
		}
	}
}
</script>

<style scoped>
	ol {
		margin: 0.6em 0 0;
		padding: 0;
		font-size: 0.8125em;
		line-height: 1.7;
		counter-reset: tracks;
	}
	li {
		padding: 0 0.6em;
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
