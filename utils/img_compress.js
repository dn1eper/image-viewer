var gm = require('gm'),
    fs = require('fs');

var workDir = process.env.INIT_CWD + "/public/photo/",
    compressed = fs.readdirSync(workDir + 'compressed/'),
    count = 0;

/* Сжимает изображения до нужного размера, 
 * imgs - массив имен изображений в папке photo
 * size - до какого размера сжать изображения
 * callback - функция, которая будет вызвана по завершении минификации
 */
function img_compress(imgs, size, callback) {
  if (imgs.length) {
    var img = imgs.pop(),
        name = img.split("."),
        newName = name[0] + "_" + size + "." + name[1];

    if (!compressed.includes(newName) && name != name[0]) {
      gm(workDir + name[0] + "." + name[1])
      .resize(size)
      .autoOrient()
      .write(workDir + 'compressed/' + newName, (err) => {
        if (err) console.log(err);
        else {
          console.log("created " + newName);
          count++;
        }
        img_compress(imgs, size, callback);
      });
    }
    else img_compress(imgs, size, callback);
  }
  else callback();
}

// Если модуль запущен напрямую, то проверяем все ли изображения сжаты,
// и если нет, то запускаем для них сжатие 500px
if (!module.parent) {
  img_compress(fs.readdirSync(workDir), 500, () => {
    if (count) console.log(count + " images compressed!");
    else console.log("Nothing to do");
  });
}

module.exports = img_compress;