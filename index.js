import { globSync } from 'glob'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs'

async function compress() {
  try {
    const srcDir = 'img/src'
    const distDir = 'img/dist'
    const quality = 80

    if (!fs.existsSync(srcDir)) {
      console.error(`Source directory "${srcDir}" not found!`)
      return
    }

    const files = globSync(`${srcDir}/**/*`).filter(file => fs.statSync(file).isFile())

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    const imageFiles = files.filter(file =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    )

    if (imageFiles.length === 0) {
      console.log('No supported images found in img/src/')
      return
    }

    console.log(`Found ${imageFiles.length} images to compress...`)

    for (const file of imageFiles) {
      const relativePath = path.relative(srcDir, file)
      const outputPath = path.join(distDir, relativePath)

      const outputDir = path.dirname(outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      try {
        await sharp(file)
          .jpeg({ quality: quality, mozjpeg: true })
          .png({ quality: quality })
          .webp({ quality: quality })
          .toFile(outputPath)

        console.log(`Compressed: ${relativePath} → ${outputPath}`)
      } catch (err) {
        console.error(`Error compressing ${relativePath}:`, err.message)
      }
    }

    console.log('✅ Compression completed!')
  } catch (err) {
    console.error('❌ Fatal error:', err)
  }
}

compress()
