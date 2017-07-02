import 'whatwg-fetch'

const host = 'https://radio4000.firebaseio.com'

// Utilities for working with Firebase REST API.
const parse = res => res.json()
const getFirst = arr => arr[0]
const toArray = firebaseObj => {
	return Object.keys(firebaseObj).map(id => {
		return Object.assign(firebaseObj[id], {id})
	})
}
const toObject = (firebaseObj, id) => {
	firebaseObj.id = id
	return firebaseObj
}

export function findChannelBySlug(slug) {
	const url = `${host}/channels.json?orderBy="slug"&startAt="${slug}"&endAt="${slug}"`
	return fetch(url).then(parse).then(toArray).then(getFirst)
}
export function findChannelById(id) {
	const url = `${host}/channels/${id}.json`
	return fetch(url).then(parse).then(obj => toObject(obj, id))
}

export function findChannelTracks(id) {
	const url = `${host}/tracks.json?orderBy="channel"&startAt="${id}"&endAt="${id}"`
	return fetch(url).then(parse).then(toArray)
}
export function findTrack(id) {
	const url = `${host}/tracks/${id}.json`
	return fetch(url).then(parse)
}
export function findChannelImage(channel) {
	if (!channel || !channel.images) return
	const url = `${host}/images.json?orderBy="channel"&startAt="${channel.id}"&endAt="${channel.id}"&limitToLast=1`
	return fetch(url).then(parse).then(toArray).then(getFirst).then(img => {
		const rootURL = 'https://res.cloudinary.com/radio4000/image/upload/'
		const transforms = `q_50,w_200,h_200,c_thumb,c_fill,fl_lossy`
		return `${rootURL}/${transforms}/${img.src}`
	})
}

