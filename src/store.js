import fetch from 'unfetch'

// Prioritze the host from R4, then production, then staging.
const getHost = () => {
	if (window && window.r4 && window.r4.databaseURL) {
		return window.r4.databaseURL
	}
	if (process.env.NODE_ENV === 'production') {
		return 'https://radio4000.firebaseio.com'
	}
	return 'https://radio4000-staging.firebaseio.com'
}

const host = getHost()

// Utilities for working with Firebase REST API.
const parse = res => res.json()
const serializeId = (data, id) => Object.assign(data, {id})
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
	return fetch(url).then(parse).then(toArray).then(arr => {
		// Firebase queries through REST are not sorted.
		return arr.sort((a, b) => a.created - b.created)
	})
}
export function findTrack(id) {
	const url = `${host}/tracks/${id}.json`
	return fetch(url).then(parse).then(data => serializeId(data, id))
}
export function findChannelImage(channel) {
	if (!channel || !channel.images) return
	const url = `${host}/images.json?orderBy="channel"&startAt="${channel.id}"&endAt="${channel.id}"&limitToLast=1`
	return fetch(url).then(parse).then(toArray).then(getFirst).then(img => {
		const rootURL = 'https://res.cloudinary.com/radio4000/image/upload/'
		const transforms = `q_100,w_48,h_48,c_thumb,c_fill,fl_lossy`
		return `${rootURL}/${transforms}/${img.src}`
	})
}

