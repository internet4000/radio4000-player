<template>
	<div id="TrackItem"
		:class="{active: track.active}"
		v-on:click="select">
		{{track.title}}
  </div>
</template>

<script>
export default {
  name: 'track-item',
	props: ['track'],
	methods: {
		select() {
			this.$emit('select', this.track)
		}	
	}
}
</script>

<style scoped>
#TrackItem {
	display: inline-block;
	cursor: pointer;
}
.active {
	color: #5e1ae6;
}
</style>
