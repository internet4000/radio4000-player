<template>
	<div class="TrackItem"
		:class="{active: active}"
		@click="select">
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
		cursor: pointer;
		display: block;
		width: 100%;
	}
	.TrackItem span {
		padding: 0.2rem 0.3rem;
	}
	.TrackItem.active span {
		background-color: #5e1ae6;
		color: white;
	}
</style>
