<template>
	<div>
		<marquee>
			<strong>
				<a v-bind:href="'https://radio4000.com/' + channel.slug">
					{{channel.title}}
				</a>
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
		props: ['channel', 'track']
	}
</script>

<style scoped>
	div {
		display: flex;
		flex-direction: column;
		font-size: 0.875em;
		padding: 0.46rem 0 0.5em;
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

