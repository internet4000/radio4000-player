<template>
	<div>
		<a class="Logo" :href="href">
			<img src="https://radio4000.com/apple-touch-icon.png" alt="Radio4000">
			<img v-if="channel.image" :src="channel.image" alt="">
		</a>
		<marquee>
			<strong>
				{{channel.title}}
			</strong>
			<em>{{channel.body}}</em>
			<transition name="fade">
				<span v-if="track.title">{{track.title}}</span>
			</transition>
		</marquee>
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
	div {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 0.875em;
	}
	.Logo {
		display: flex;
		width: 4rem;
		flex-wrap: nowrap;
	}
	img {
		width: 50%;
		height: 2em;
		vertical-align: top;
	}
	a {
		color: black;
		text-decoration: none;
	}
	marquee {
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
