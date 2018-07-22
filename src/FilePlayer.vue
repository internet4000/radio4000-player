<template>
	<audio class="FilePlayer"
		controls
		:src="mediaUrl"
		:autoplay="autoplay">
		Your browser does not support the <code>audio</code> element.
	</audio>
</template>

<script>
	/* 
		 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		 https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
	 */
	
	export default {
		name: 'file-player',
		props: {
			autoplay: Boolean,
			isPlaying: Boolean,
			mediaUrl: String,
			volume: Number
		},
		data() {
			return {
				continousPlay: true
			}
		},
		watch: {
			isPlaying(isPlaying) {
				if (isPlaying) {
					this.$el.play().catch(this.handleEnded)
				} else {
					this.$el.pause()
				}
			}
		},
		mounted() {
			this.initPlayer(this.$el);
		},
		beforeDestroy() {
			this.unmountPlayer(this.$el);
		},
		methods: {
			unmountPlayer($el) {
				$el.removeEventListener('loadeddata', this.handleLoadedData)
				$el.removeEventListener('play', this.handlePlay)
				$el.removeEventListener('pause', this.handlePause)
				$el.removeEventListener('ended', this.handleEnded)
				$el.removeEventListener('error', this.handleError)
				$el.removeEventListener('volumechange', this.handleVolumeChange)
			},
			initPlayer($el) {
				// Set up events
				// $el.addEventListener('playing', () => this.$emit('playing'))
				$el.addEventListener('loadeddata', this.handleLoadedData)
				$el.addEventListener('play', this.handlePlay)
				$el.addEventListener('pause', this.handlePause)
				$el.addEventListener('ended', this.handleEnded)
				$el.addEventListener('error', this.handleError)
				$el.addEventListener('volumechange', this.handleVolumeChange)
			},

			/* Event handlers */
			handlePause() {
				this.$emit('paused')
			},
			handlePlay() {
				this.$emit('playing')
			},
			handleEnded() {
				this.$emit('ended')
			},
			handleVolumeChange() {
				console.log('event volumechange', arguments)
			},
			handleLoadedData() {
				if(this.continousPlay) {
					this.$el.play();					
				} else {
					this.$el.pause();					
				}
			},
			/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error */
			handleError(event) {
				let error = this.$el.error
				console.log('FilePlayer error', error)

				if (error.code === 4) {
					this.$emit('mediaNotAvailable')
				}
				this.handleEnded()
			}			
		}
	}
</script>
