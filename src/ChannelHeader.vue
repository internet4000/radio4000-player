<template>
	<div class="Header">
		<a :href="href" class="Header-image" :title="channelDescription">
			<img v-if="image" :src="image" alt="">
			<loading v-else/>
		</a>
		<div v-if="channel.title">
			<p class="Header-title" :title="channelDescription"><strong>{{channel.title}}</strong></p>
			<marquee class="Header-playing" :title="[track.body ? track.body : '']">{{track.title}}</marquee>
		</div>
		<loading v-else/>
		<a :href="href" target="_blank" title="Open this radio on Radio4000.com">
			<R4Logo></R4Logo>
		</a>
	</div>
</template>

<script>
	import Loading from './Loading.vue'
	import R4Logo from './R4Logo.vue'
	export default {
		name: 'channel-header',
		props: [
			'channel',
			'track',
			'image',
			'r4Url'
		],
		components: { Loading, R4Logo },
		computed: {
			href: function () {
				const root = this.r4Url ? '/' : 'https://radio4000.com'
				const slug = this.channel.slug
				return slug === undefined ? root : root + slug
			},
			channelDescription () {
				const { title = '', slug = '', body = ''} = this.channel;
				return `[ ${title}, @${slug} ] ${body}`
			}
		}
	}
</script>

<style scoped>
	.Header {
		position: relative;
		min-height: 2.75em;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.Header > div {
		flex: 1;
		line-height: 1.4;
	}
	.Header-title {margin-left: 0.3em;}
	.R4 {
		position: absolute;
		top: 0.2em;
		right: 0.2em;
		opacity: 0.1;
		transition: opacity 100ms;
	}
	.R4:hover {opacity: 1;}
	p,
	marquee {
		margin: 0;
		font-size: 0.8125em;
	}
	marquee {
		display: block;
		min-height: 1em; /* avoid jumps */
	}
	.Header-image {
		position: relative;
		width: 2.75em;
		height: 2.75em;
	}
	.Header-image img {
		display: inline-block;
		vertical-align: top;
		width: 100%;
	}
</style>
