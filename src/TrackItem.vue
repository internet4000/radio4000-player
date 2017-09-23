<template>
	<div class="TrackItem" :class="{active: active}" @click="select">
		<p class="TrackItem-title">{{track.title}}</p>
		<p v-if="track.body" class="TrackItem-body">{{track.body}}</p>
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
		width: 100%;
		padding: 0.4em 0.6em;
		cursor: pointer;
	}
	.TrackItem-title,
	.TrackItem-body {
		margin: 0;
		padding-left: 0.3em;
		padding-right: 0.3em;
		word-break: break-word;
	}
	.TrackItem-title {
		display: inline-block; /* for .active styles */
		font-size: 0.8125em; /* 13/16 */
		line-height: 1.4;
	}
	.TrackItem-body {
		font-size: 0.75em; /* 12/16 */
		color: #737373;
	}
	.TrackItem:hover,
	.TrackItem.active {
		background-color: hsla(0, 0%, 100%, 0.2);
	}
	.TrackItem.active .TrackItem-title {
		background-color: #5e1ae6;
		color: white;
	}
</style>
