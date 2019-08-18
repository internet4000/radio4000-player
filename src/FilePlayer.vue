<template>
	<audio class="FilePlayer"
		controls
		:autoplay="false"
		:src="url"
		:volume="providerVolume">
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
			isPlaying: Boolean,
			url: String,
			volume: Number
		},
		watch: {
			url() {
				if (this.isPlaying) {
					this.$nextTick(() => {
						this.$el.play()
					})
				}
			},
			isPlaying(isPlaying) {
				if (isPlaying) {
					this.$el.play().catch(this.handleEnded)
				} else {
					this.$el.pause()
				}
			},
			volume(vol) {
				if (vol === this.$el.volume * 100) return
				this.$el.volume = vol / 100
			}
		},
		computed: {
			providerVolume() {
				return this.volume / 100
			}
		},
		mounted() {
			this.initPlayer(this.$el, this.isPlaying)
		},
		beforeDestroy() {
			this.unmountPlayer(this.$el)
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
			initPlayer($el, isPlaying) {
				// Set up events
				// $el.addEventListener('playing', () => this.$emit('playing'))
				$el.addEventListener('loadeddata', this.handleLoadedData)
				$el.addEventListener('play', this.handlePlay)
				$el.addEventListener('pause', this.handlePause)
				$el.addEventListener('ended', this.handleEnded)
				$el.addEventListener('error', this.handleError)
				$el.addEventListener('volumechange', this.handleVolumeChange)

				if (isPlaying) {
					this.$el.play()
					this.$el.volume = this.volume / 100
				}
			},

			/* Event handlers */
			handlePause() {
				this.$emit('paused')
			},
			handlePlay() {
				if (this.isPlaying) {
					this.$emit('playing')
				}
			},
			handleEnded() {
				this.$emit('ended')
				// it seems the element emits pause at the end of a track
				// so if we are in pause when ended is handled, we should play!
				if (!this.isPlaying) {
					this.$emit('playing')
				}
			},
			handleVolumeChange(event) {
				this.$root.$emit('setVolume', event.target.volume * 100)
			},
			handleLoadedData() {
				this.$emit('ready')
			},
			handleError(event) {
				// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error 
				let error = this.$el.error
				console.log('FilePlayer error', error)
				if (error.code === 4) {
					this.$emit('mediaNotAvailable')
				} 
				this.$emit('ended')
			}			
		}
	}
</script>
