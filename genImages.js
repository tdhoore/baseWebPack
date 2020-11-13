const fs = require("fs");
const path = require(`path`);
const sharp = require(`sharp`);

fs.readdirSync(path.join(__dirname, `src/assets/img/`))
  .filter((file) => file !== '.DS_Store')
  .map((file) => {
    console.log(file);
    sharp(file)
    //enkel width
      .resize(300)
      .toFile('output.webp', (err, info) => { console.log(info); });
    return path.join(__dirname, `src/assets/img/${file}`)
  });

/*
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
	const files = await imagemin(['images/*.{jpg,png}'], {
		destination: 'build/images',
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});

	console.log(files);
	//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();

*/
