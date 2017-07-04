<template>
	<div class="Loading" :class="{ 'Loading--hasNoMessage' : !message }">
		<span v-if="message">{{message}}</span>
		<span v-else></span>
	</div>
</template>

<script>
	export default {
		props: ['message']
	}
</script>

<style scoped>
	.Loading {
		font-size: 0.9rem;
		position: relative;
	}
	.Loading span::before {
		display: block;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 10rem;
		height: 0.2rem;
		background: linear-gradient( to right, #a7a7a7, rgba(255, 255, 255, 0));

		animation-name: Loading;
		animation-duration: 4s;
		animation-direction: alternate;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}
	.Header-image .Loading {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
	@keyframes Loading {
		0% {
			width: 10%;
		}
		100% {
			width: 100%;
		}
	}
</style>
