# ImageViewer

Educational project to improve image loading optimization.

## Specifications

1. The main page displays minified images
2. When clicking on the image, the original version is loaded
3. Images loaded as needed, used lazy loading

All source images are saved in _/public/photo_
Minified image versions is placed in _/public/photo/compressed_

## Instalation

Install frontend libs.
```sh
$ cd image-viewer/public
$ bower install jquery lazyloadxt
```

Install the dependencies and start the server.
```sh
$ cd image-viewer
$ npm install
$ npm run server
```

To build missing minified images use
```sh
$ npm run minification
```

## Report

All tests were done on the Regular 4G profile at a speed of 4 Mbit/s.
The site contained about 150 high resolution images.

1. If source images were loaded on main page withiout minification and lazy loading, the page size was 196MB and loaded for 6.6 min.
2. When using minified images, page size reduced to 4.5MB and loaded for 9.3 s.
3. When lazy loading was added, page size reduced to 370KB and loaded for 845 ms.

Conclusion: minification and lazy loading are very userful!

## Built With

* [Node.js](https://nodejs.org/en/docs/) - Server
* [Express](http://expressjs.com/) - Web framework for Node.js 
* [GraphicsMagick](http://aheckmann.github.io/gm/) - [ImageMagick](https://www.imagemagick.org/) module for Node.js
* [EJS](http://ejs.co/#docs) - Embedded JavaScript templating.
* [Jquery](https://jquery.com/) - JavaScript library
* [lazyloadtx](https://github.com/ressio/lazy-load-xt) - jQuery plugin for lazy loading of images/videos
