const fs = require('fs');
const path = require('path');
const imageThumbnail = require('image-thumbnail');
const compress_images = require('compress-images');
const sizeOf = require('image-size');

const outputDirectory = 'src/assets/images/gallery/';
const inputDirectory = 'src/assets/images/gallery/raw';
const supportedExtensions = [
    'jpg'
];
const thumbMaxWidth = 500;
const thumbMaxHeight = 400;

const isCorrectFormatAndNotThumbnail = (imagePath) => {
    isSupportedExtension = false;
    supportedExtensions.forEach(supportedExtension => {
        isSupportedExtension |= imagePath.endsWith('.' + supportedExtension);
    });
    return isSupportedExtension && !imagePath.includes('.thumb.')
};

const createThumbnail = (image) => {
    let filePath = path.join(inputDirectory, image);
    let buf = fs.readFileSync(filePath); 
    const dimensions = sizeOf(buf);

    let thumbnailName = path.parse(image).name + '.thumb' + path.parse(image).ext;
    let thumbnailPath = path.join(outputDirectory, thumbnailName);
    let thumbnailOptions;
    if(dimensions.width >= dimensions.height){
        thumbnailOptions = {
            width: thumbMaxWidth
        }
    }
    else{
        thumbnailOptions = {
            height: thumbMaxHeight
        }
    }
    imageThumbnail(path.join(inputDirectory, image), thumbnailOptions)
        .then(thumbnail => {
            fs.writeFileSync(thumbnailPath, thumbnail);
        })
        .catch(err => console.error(err));
}


// Create Thumbnails
const images = fs.readdirSync(inputDirectory).filter(isCorrectFormatAndNotThumbnail);
images.forEach(image => {
    createThumbnail(image);
});

// Compress images
compress_images(inputDirectory + '/*.jpg', outputDirectory, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
        { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
        { svg: { engine: 'svgo', command: '--multipass' } },
        { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }, function () {
        });




