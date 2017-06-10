import 'whatwg-fetch'

const host = 'https://api.radio4000.com/v1'
const parse = res => res.json()


export function findChannelBySlug(slug) {
	const url = `${host}/channels?slug=${slug}`
	return fetch(url).then(parse)
									 .then(data => data[0])
}
export function findChannelById(id) {
	const url = `${host}/channels/${id}`
	return fetch(url).then(parse)
}
export function findChannelTracks(id) {
	const url = `${host}/channels/${id}/tracks`
	return fetch(url).then(parse)
}
export function findTrack(id) {
	const url = `${host}/tracks/${id}`
	return fetch(url).then(parse)
}
export function findChannelImage(channel) {
	// If there's an image, fetch and embed it on the channel.
	// This can be removed once new r4 api is deployed.
	const id = Object.keys(channel.images)[0]
	if (!id) {
		return
	}
	const url = `${host}/images/${id}`
	return fetch(url).then(parse)
}

