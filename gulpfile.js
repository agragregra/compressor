import glob from 'glob'
import path from 'path'
import sharp from 'sharp'

async function compress() {
	let files = glob.sync('img/src/**/*')
	files.forEach(function (file) {
		let filename = path.basename(file)
		sharp(file)
			.resize({ width: 1920 })
			.withMetadata()
			.toFile(`img/dist/${filename}`)
			.catch((err) => { console.log(err) })
	})
}

export {compress}
export default compress
