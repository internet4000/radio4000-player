<template>
	<a :href="href" class="TrackItem" @click="select">
		<p class="TrackItem-title">{{track.title}}</p>
		<p v-if="track.body" class="TrackItem-body">{{track.body}}</p>
	</a>
</template>

<script>
export default {
	name: 'track-item',
	props: [
		'track',
		'channelSlug'
	],
	computed: {
		href: function() {
			return `https://radio4000.com/${this.channelSlug}/${this.track.id}`
		}
	},
	methods: {
		select(event) {
			event.preventDefault()
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
		padding-bottom: 0.3em;
		padding-left: 0.6em;
		color: black;
		text-decoration: none;
	}
	.TrackItem-title,
	.TrackItem-body {
		word-break: break-word;
		line-height: 1.2;
		margin-top: 0;
		margin-bottom: 0;
	}
	.TrackItem-title {
		padding: 0.2rem 0.3em;
		float: left;
	}
	.TrackItem-body {
		display: block;
		clear: both;
		margin-left: 0.4em;
		border-left: 1px solid #cecece;
		padding-top: 0.1em;
		padding-left: 0.4em;
		margin-bottom: 0.3em;
		font-style: italic;
		color: #737373;
	}
	.TrackItem.active .TrackItem-title {
		background-color: #5e1ae6;
		color: white;
	}
	.TrackItem.active .TrackItem-body {
		border-left-color: #5e1ae6;
		transition: 200ms border-left-color cubic-bezier(0.55, 0.09, 0.68, 0.53);
	}
</style>
