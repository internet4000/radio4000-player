import 'whatwg-fetch'

const host = 'https://api.radio4000.com/v1'

const parse = res => res.json()

export default {
	findChannelBySlug(slug) {
		const url = `${host}/channels?slug=${slug}`
		return fetch(url).then(parse).then(data => data[0])
	},
	findTracks(channelId) {
		const url = `${host}/channels/${channelId}/tracks`
		return fetch(url).then(parse)
	}
}

