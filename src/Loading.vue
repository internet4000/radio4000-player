<template>
	<div class="Loading"
			 v-bind:class="{ isAnimated }">
		<span v-if="message">{{message}}…</span>
	</div>
</template>

<script>
	export default {
		props: ['message'],
		computed: {
			isAnimated: function() {
				return !Boolean(this.message)
			}
		}
	}
</script>

<style scoped>
	.Loading {
		
	}
	.Loading.isAnimated {
		display: block;
	}
	.Loading.isAnimated::before {
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
	.TrackList .Loading {
    padding: 0 0.5rem;
    font-size: 0.9rem;
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
