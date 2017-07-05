<template>
	<div class="TrackItem"
		:class="{active: active}"
		@click="select">
		<p class="TrackItem-title">{{track.title}}</p>
		<p class="TrackItem-body">{{track.body}}</p>
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
		margin-bottom: 0.4rem;
	}
	.TrackItem-title,
	.TrackItem-body {
		word-break: break-word;
		line-height: 1.2;
		margin-top: 0;
		margin-bottom: 0;
	}
	.TrackItem-title {
		padding: 0.2rem 0.3rem;
	}
	.TrackItem-body {
		display: block;
		/* v1 */
		/* margin-left: 1.2rem; */
		/* v2 */
		margin-left: 0.4rem;
    border-left: 2px solid #cecece;
    padding-left: 0.4rem;
	}
	.TrackItem.active .TrackItem-title {
		background-color: #5e1ae6;
		color: white;
	}
</style>
