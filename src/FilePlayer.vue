<template>
	<div class="FilePlayer">
		<audio
      controls
      :src="mediaUrl">
      Your browser does not support the <code>audio</code> element.
    </audio>
	</div>
</template>

<script>
	export default {
		name: 'file-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			mediaUrl: String,
			volume: Number
		},
		computed: {			 
		}
	}
</script>

<style>

</style>
