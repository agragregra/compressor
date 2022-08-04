import pkg from 'gulp'
const { src, dest } = pkg

import changed    from 'gulp-changed'
import responsive from 'gulp-image-resize'

function compress() {
	return src('img/src/**/*')
	.pipe(changed('img/dist'))
	.pipe(responsive({ width: '1920', quality: 1 }))
	.pipe(dest('img/dist/'))
}

export {compress}
export default compress
