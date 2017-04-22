import 'whatwg-fetch'

const host = 'https://api.radio4000.com/v1'
const parse = res => res.json()

export default {
	findChannelBySlug(slug) {
		const url = `${host}/channels?slug=${slug}`
		return fetch(url).then(parse)
			.then(data => data[0])
	},
	findTracks(id) {
		const url = `${host}/channels/${id}/tracks`
		return fetch(url).then(parse)
	},
	findImage(id) {
		const url = `${host}/images/${id}`
		return fetch(url).then(parse)
	},
	async findAll(slug) {
		let channel = await this.findChannelBySlug(slug)

		let tracks = await this.findTracks(channel.id)

		let imageId = Object.keys(channel.images)[0]
		let image
		if (imageId) {
			image = await this.findImage(imageId)
		}

		channel = {
			title: channel.title,
			slug: channel.slug,
			body: channel.body
		}

		if (image) {
			channel.image = image.src
		}

		return {
			channel,
			tracks
		}
	}
}

