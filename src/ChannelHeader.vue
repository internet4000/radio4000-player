<template>
	<div class="Header">
		<a :href="href" target="_blank" title="Check this radio on Radio4000">
			<img v-if="channel.image" :src="channel.image" alt="">
		</a>
		<div>
			<p class="Header-title">
				<strong>{{channel.title}}</strong><br>
			</p>
			<marquee class="Header-playing">
				<transition name="fade">
					<span v-if="track.title">{{track.title}}</span>
				</transition>
			</marquee>
		</div>
		<a :href="href" target="_blank" title="Check this radio on Radio4000">
			<svg class="R4" width="150" height="130" viewBox="0 0 150 130" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:figma="http://www.figma.com/figma/ns"><title>Radio4000</title><g figma:type="frame"><use xlink:href="#a" transform="translate(62.367 18.91)" fill="#FFF" figma:type="vector-operation"/><use xlink:href="#b" fill="#FFF" figma:type="vector-operation"/></g><defs><path id="a" fill-rule="evenodd" d="M54.51 89.487H0v-19.92L42.15 0h32.486v69.724H87.63v19.763H74.636v21.187H54.51V89.487zm5.866-53.654l-28.71 40h28.99v-40h-.28z"/><path id="b" fill-rule="evenodd" d="M7.818 91.806H0V0h40.76c23.284 0 37.878 8.13 37.878 26.624 0 16-12.626 24.132-29.516 26.1l25.91 39.082h-12.3L37.645 54.38H7.818v37.426zM7.59 25.248v21.05h27.14c12.387 0 23.66-2.438 23.66-10.49 0-8.05-10.3-10.56-23.938-10.56H7.592z"/></defs></svg>
		</a>
	</div>
</template>

<script>
export default {
	name: 'channel-header',
	props: ['channel', 'track'],
	computed: {
		href: function () {
			return `https://radio4000.com/${this.channel.slug}`
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
	.Header-title {
		margin-left: 0.3em;
	}
	.R4 {
		position: absolute;
		top: 0.2em;
		right: 0.2em;
		width: 1.2em;
		height: 1.2em;
		/*fill: hsla(0, 0%, 100%, 0.9);*/
		fill: hsla(0, 0%, 30%, 0.1);
	}
	.R4 * {
		fill: inherit;
	}
	p,
	marquee {
		margin: 0;
		font-size: 0.8125em;
	}
	marquee {
		display: block;
		min-height: 1em; /* avoid jumps */
	}
	img {
		width: 2.75em;
		height: 2.75em;
		vertical-align: top;
		display: block;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 500ms;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
