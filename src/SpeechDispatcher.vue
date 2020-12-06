<template></template>

<script>
	export default {
		props: {
			track: Object,
			isPlaying: Boolean
		},

		watch: {
			track: { immediate: true, handler: 'trackChanged' }
		},

		data() {
			return {
				textToSpeachTag: '#text2speech'
			}
		},

		methods: {
			speak(text) {
				const synth = window.speechSynthesis
				const voices = synth.getVoices()

				/* no voices are installed for using speech synthesis */
				if (!voices.length) return

				var utterThis = new SpeechSynthesisUtterance(text)
				utterThis.voice = voices[0]
				synth.speak(utterThis)
			},
			
			trackChanged(track) {
				if (!this.isPlaying || !track || !track.body) return

				const trackHasSpeechTag = track.body.includes(this.textToSpeachTag)

				if (!trackHasSpeechTag) return
				
				const textToSpeachRegex = new RegExp(this.textToSpeachTag, 'g')
				const textToSpeach = track.body.replace(textToSpeachRegex, '')
				this.speak(textToSpeach)
			}
		}
	}
</script>

