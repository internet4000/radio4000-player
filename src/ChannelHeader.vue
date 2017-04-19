<template>
	<div class="Header">
		<a class="Logo" :href="href" target="_blank">
			<img v-if="channel.image" :src="channel.image" alt="">
		</a>
		<div>
			<p>
			<strong>&nbsp;&nbsp;{{channel.title}}</strong><br>
			</p>
		<marquee>
			<transition name="fade">
				<span v-if="track.title">{{track.title}}</span>
			</transition>
		</marquee>
		</div>
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
		min-height: 2.75em;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.Header > div {
		flex: 1;
	}
	p,
	marquee {
		margin: 0;
		font-size: 0.8125em;
	}
	marquee {
		display: block;
	}
	img {
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
