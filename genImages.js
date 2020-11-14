const fs = require("fs");
const path = require(`path`);
const sharp = require(`sharp`);

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const sizes = require(`./sizes.json`).sizes;

const srcPath = `src/assets/img/`;
const distPath = `dist/assets/img/`;

(async () => {
	const files = await imagemin([`${srcPath}*.{jpg,png}`], {
		destination: srcPath,
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});
})().then(() => {
	fs.readdirSync(path.join(__dirname, srcPath))
  .filter((file) => file !== '.DS_Store')
  .map((file) => {
	const fileName = file.toString();
	const name = fileName.substring(0, fileName.indexOf("."));
	const ext = fileName.substring(fileName.indexOf("."), fileName.length);
	
	sizes.forEach(size => {
		sharp(`${srcPath}${name}${ext}`)
		//enkel width
		.resize(size)
		.toFile(`${distPath}${name}_${size}${ext}`, (err, info) => { /*console.log("info", info);*/ });
		
		sharp(`${srcPath}${name}${ext}`)
		//enkel width
		.resize(size)
		.toFile(`${distPath}${name}_${size}.webp`, (err, info) => { /*console.log("info", info);*/ });
	});
  });
});
