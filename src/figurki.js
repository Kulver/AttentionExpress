
const PDFDocument = require('pdfkit');
const fs = require('fs');

const imgPaths = [
  'public/images/b1.png',
  'public/images/b2.png',
  'public/images/b3.png',
  'public/images/b4.png',
  'public/images/b5.png',
  'public/images/b6.png',
  'public/images/b7.png',
  'public/images/b8.png',
  'public/images/b9.png',
  'public/images/b10.png',
  'public/images/b11.png'

];


let imgW = 40;
let imgH = 40;


function splitmix32(a) {
  return function() {
    a |= 0;
    a = a + 0x9e3779b9 | 0;
    let t = a ^ a >>> 16;
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ t >>> 15;
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
   }
 }


module.exports = async function (useImages, width, height) {
  console.log('Hello, PDF', useImages);

  let filteredImgs = imgPaths.filter((img, idx) => {
    return useImages[idx] === 'ON';
  });

  console.log(filteredImgs);



  var pdfDoc = new PDFDocument({ size: 'A4' });

  const pdfBuffer = await new Promise(resolve => {
    // const writableStream = fs.createWriteStream('public/pdfs/SampleDocument.pdf');

    // pdfDoc.pipe(writableStream);

    // pdfDoc.fontSize(24);
    // pdfDoc.font('public/fonts/a_AvanteBs_Regular.ttf').text("Закрасте фигурки", 200, 10);
    // // pdfDoc
    //     .fillColor('red')
    //     .fontSize(17)
    //     .text("20%", 305, 150);

    var stratX = 60;
    var startY = 90;
    var offset = 5;

    var A4W = 595
    var allLN = filteredImgs.length;
    var stX = A4W / 2 - allLN * (imgW + offset) / 2;
    console.log('A4W:', A4W / 2);
    console.log('off:', allLN * (imgW + offset) / 2);

    console.log('stX:', stX);

    console.log('stX:', stX);

    for (var i = 0; i < filteredImgs.length; i++) {
      pdfDoc.image(filteredImgs[i], stX + i * imgW + i * offset, 20, {fit: [40, 40]} ); // {width: imgW , height: imgH }
    }

    imgW = 45;
    imgH = 45;

    const prng = splitmix32((Math.random()*2**32)>>>0)

    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++) {
        pdfDoc.image(filteredImgs[Math.floor(prng() * filteredImgs.length)], stratX + i * imgW + i * offset, startY + j * imgH + j * offset, {fit: [40, 40]});
      }

    }

    // pdfDoc.flushPages();
    pdfDoc.end();
    // writableStream.end();
    //   writableStream.on('finish', () => {
    //     console.log(`You have successfully created a SampleDocument.pdf.`);
    // })

    //Finalize document and convert to buffer array
    let buffers = []
    pdfDoc.on("data", buffers.push.bind(buffers))
    pdfDoc.on("end", () => {
      let pdfData = new Uint8Array(Buffer.concat(buffers))
      resolve(pdfData)
    })

  })

  return pdfBuffer

}

