const fs = require('fs');
const path = require('path');
const mover = (sourceDir , destinationDir , imageName)=>{


const sourceImagePath = path.join(sourceDir, imageName);
const destinationImagePath = path.join(destinationDir, imageName);

fs.rename(sourceImagePath, destinationImagePath, (err) => {
  if (err) {
    console.error('Error moving the image:', err);
  } else {
    console.log('Image moved successfully!');
  }
});
}

module.exports ={mover}