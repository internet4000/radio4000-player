<template>
	<a :href="href" class="TrackItem" @click.prevent="$emit('select')">
		<p class="TrackItem-title">{{track.title}}</p>
		<p v-if="track.body" class="TrackItem-body">{{track.body}}</p>
	</a>
</template>

<script>
export default {
	name: 'track-item',
	props: {
		track: Object,
		channelSlug: String
	},
	computed: {
		href() {
			// If slug is defined it means we're dealing with an R4 channel.
			if (this.channelSlug) {
				return `https://radio4000.com/${this.channelSlug}/tracks/${this.track.id}`
			} else {
				return this.track.url
			}
		}
	}
}
</script>

<style scoped>
	.TrackItem {
		display: block;
		padding: 0.4em 0.6em;
		color: initial;
		text-decoration: none;
	}
	.TrackItem-title,
	.TrackItem-body {
		margin: 0;
		padding-left: 0.3em;
		padding-right: 0.3em;
		word-break: break-all;
	}
	.TrackItem-title {
		display: inline-block; /* for .active styles */
		font-size: 0.8125em; /* 13/16 */
		line-height: 1.4;
	}
	.TrackItem-body {
		font-size: 0.75em; /* 12/16 */
		color: #696969;
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
