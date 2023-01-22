const fs = require('fs');
const path = require('path');
const imageThumbnail = require('image-thumbnail');

const imagesDirectory = 'assets/images/gallery';
const supportedExtensions = [
    'jpg'
];
const thumbnailOptions = { 
    // width: 100, 
    height: 400, 
}

const isCorrectFormatAndNotThumbnail = (imagePath) => {
    isSupportedExtension = false;
    supportedExtensions.forEach(supportedExtension => {
        isSupportedExtension |= imagePath.endsWith('.' + supportedExtension);
    });
    return isSupportedExtension && !imagePath.includes('.thumb.')
};


const images = fs.readdirSync(imagesDirectory).filter(isCorrectFormatAndNotThumbnail);

images.forEach(image => {
    let thumbnailName = path.parse(image).name + '.thumb' + path.parse(image).ext;
    let thumbnailPath = path.join(imagesDirectory, thumbnailName);
    imageThumbnail(path.join(imagesDirectory, image), thumbnailOptions)
        .then(thumbnail => { 
            fs.writeFileSync(thumbnailPath, thumbnail);
        })
        .catch(err => console.error(err));
});




