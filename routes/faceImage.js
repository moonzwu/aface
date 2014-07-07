var $p = require('procstreams');
function FaceImage() {

    this.render = function(clientSize, imagePath, renderPage) {
        console.log(imagePath);
        $p('identify ' + imagePath).data(function(err, stdout, stderr) {
            var properties = ('' + stdout).split(' ');
            var imageInfo = {
                'path': properties[0],
                'type': properties[1],
                'width': properties[2].split('x')[0],
                'hight': properties[2].split('x')[1],
                'depth': properties[3],
                'class': properties[4],
                'size' : properties[5],
            };
            var thumbnailSize = calcThumbnailSize(clientSize, imageInfo);
            createThumbnail(imagePath, thumbnailSize, renderPage);
        });
    }

    function calcThumbnailSize(clientSize, imageInfo) {
        clientSize.width = parseInt(clientSize.hight * imageInfo.width / imageInfo.hight);
        return clientSize;
    }

    function createThumbnail(imagePath, size, renderPage) {
        var scaleImageCmd = 'java -jar ../aface/lib/scaleimg.jar ';        
        $p(scaleImageCmd + imagePath + ' ' + size.width + ' ' + size.hight)
            .data(function(err, stdout, stderr) {
                if (err) {
                    console.log(err.code, err.signal);
                } else {
                    thumbnailName = 'thumbnail.' + imagePath.replace(/^.*[\\\/]/, '');
                    console.log(thumbnailName);
                    renderPage({
                        imageName: thumbnailName,
                        clientWidth: size.width,
                        clientHight: size.hight
                    });
                }
            });
    }
};

module.exports = FaceImage;
