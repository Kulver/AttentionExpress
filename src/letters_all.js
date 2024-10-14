const PDFDocument = require('pdfkit');
const fs = require('fs');


module.exports = async function (width) {
    console.log('Hello, PDF letters', width);
  
    var pdfDoc = new PDFDocument({ size: 'A4' });

    const pdfBuffer = await new Promise(resolve => {
  
    var stratX = 40;
    var startY = 40;
    var offsetX = 6;
    var offsetY = 4;
    var letterW = 20;    

    var A4W = 595
  
    // const prng = splitmix32((Math.random()*2**32)>>>0)
    // const rnd = Math.floor(prng() * filteredImgs.length)
    

    const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЬЪЮЯ';
    const charactersLength = characters.length;
    let chrs = [];

    // while( chrs.length < width ){
    //     var chr = characters.charAt(Math.floor(Math.random() * charactersLength));
    //     if( !chrs.includes(chr)) chrs.push(chr);
    // }

    pdfDoc.font('public/fonts/a_AvanteBs_Regular.ttf')
    pdfDoc.fontSize(12);

for ( jj = 0; jj < 15; jj++) {

    const stX = 90;
    const stY = 100 + jj* (25);
    const LtNum = 20;

    for( i = 0; i < LtNum; i++) {
        var chr = characters.charAt(Math.floor(Math.random() * charactersLength));
        pdfDoc.text(chr, stX + i*letterW + offsetX, stY+offsetY);                  
    }


}

      pdfDoc.end();

      let buffers = []
      pdfDoc.on("data", buffers.push.bind(buffers))
      pdfDoc.on("end", () => {
        let pdfData = new Uint8Array(Buffer.concat(buffers))
        resolve(pdfData)
      })
  
    })
  
    return pdfBuffer
  
  }
  