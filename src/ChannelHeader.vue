<template>
	<header :class="layoutClass">
		<a class="Header-logo"
			:href="playlistPermalink"
			:target="linkTarget"
			:rel="linkRel"
			title="Open this radio on Radio4000.com"
		>
			<R4Logo :isOnline="isOnline"></R4Logo>
		</a>

		<a
			v-if="image"
			:href="playlistPermalink"
			:target="linkTarget"
			:rel="linkRel"
			class="Header-media"
			title="Open this radio on Radio4000.com"
		>
			<img :src="image" alt="">
		</a>

		<div
			class="Header-body"
			v-if="channel.title"
		>
			<p class="Header-channel" :title="channelDescription">
				<strong>{{channel.title}}</strong>
			</p>
			<marquee class="Header-track" :title="[track.body ? track.body : '']">{{track.title}}</marquee>
		</div>
		<loading v-else/>
	</header>
</template>

<script>
import Loading from './Loading.vue'
import R4Logo from './R4Logo.vue'
export default {
	name: 'channel-header',
	props: {
		isOnline: Boolean,
		channel: Object,
		track: Object,
		image: String,
		playlistPermalink: String,
		platform: Boolean
	},
	components: { Loading, R4Logo },
	computed: {
		layoutClass() {
			if (this.isOnline) {
				return 'Header Header--isOnline'
			} else {
				return 'Header Header--isOffline'
			}
		},
		linkTarget() {
			return this.platform ? '' : '_blank'
		},
		linkRel() {
			return this.platform ? '' : 'noopener'
		},
		channelDescription() {
			const { title = '', slug = '', body = ''} = this.channel
			return `[ ${title}, @${slug} ] ${body}`
		}
	}
}
</script>

<style scoped>
	.Header {
		position: relative;
		display: flex;
		height: 100%;
		flex-wrap: nowrap;
		align-items: center;
		background-color: hsl(0, 0%, 96%);
		border-bottom: 1px solid hsl(0, 0%, 70%);
	}
	.Header-media {
		position: relative;
		width: 1em;
		height: 1em;
		font-size: 3.5em;
	}
	.Header-media img {
		display: inline-block;
		vertical-align: top;
		width: 100%;
	}
	.Header-body {
		flex: 1;
		line-height: 1.4;
	}
	.Header-channel {
		margin-left: 0.3em;
		margin-bottom: 0;
		margin-top: 0;
	}
	.Header-track {
		font-size: 0.9375em; /* 15/16 */
		margin: 0;
	}
	marquee {
		display: block;
		min-height: 1em; /* avoid jumps */
	}
	.Header-logo {
		position: absolute;
		top: 0.2em;
		right: 0.2em;
		opacity: 0.1;
		transition: opacity 100ms;
	}
	.Header-logo:hover {
		opacity: 1;
	}
	.Header--isOffline .Header-logo {
		opacity: 1;
	}
</style>
