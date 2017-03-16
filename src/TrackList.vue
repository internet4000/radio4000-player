<template>
	<ol class="TrackList" > 
		<li v-for="track in tracks">
			<track-item :track="track" v-on:select="select" />
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
	margin: 0;
	padding: 0;
	font-size: 0.875em;
	line-height: 2;
}
li {
	border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
	padding: 0 0.6em;
}
</style>
