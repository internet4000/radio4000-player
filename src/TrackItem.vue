<template>
	<div class="TrackItem"
			 v-bind:class="{active: active}"
			 v-on:click="select">
		<span>{{track.title}}</span>
	</div>
</template>

<script>
	export default {
		name: 'track-item',
		props: ['track', 'active'],
		methods: {
			select() {
				this.$emit('select', this.track)
			}
		}
	}
</script>

<style scoped>
	.TrackItem {
		display: inline-block;
		cursor: pointer;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
	}
	.TrackItem span {
		display: flex;
	}
	.active {
		background-color: #5e1ae6;
		color: white;
	}
</style>
