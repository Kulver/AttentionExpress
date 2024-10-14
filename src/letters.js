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

    pdfDoc.moveTo(stratX, startY).lineTo(stratX + width*letterW, startY).stroke();                
    pdfDoc.moveTo(stratX, startY+letterW).lineTo(stratX + width*letterW, startY+letterW).stroke();                
    pdfDoc.moveTo(stratX, startY+letterW*2).lineTo(stratX + width*letterW, startY+letterW*2).stroke();                

    for( i = 0; i <= width; i++) {
        pdfDoc.moveTo(stratX + i*letterW, startY).lineTo(stratX + i*letterW, startY+letterW*2).stroke();                
    }
    

    const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЬЪЮЯ';
    const charactersLength = characters.length;
    let chrs = [];
    let nums = []

    while( chrs.length < width ){
        var chr = characters.charAt(Math.floor(Math.random() * charactersLength));
        if( !chrs.includes(chr)) chrs.push(chr);
    }

    // while( nums.length < 10 ){
    //     var nm = Math.floor(Math.random()*10);
    //     if( !nums.includes(nm)) nums.push(nm);
    // }


    pdfDoc.fontSize(12);
    for( i = 0; i < width; i++) {
        pdfDoc.font('public/fonts/a_AvanteBs_Regular.ttf').text(chrs[i], stratX + i*letterW + offsetX, startY+offsetY);                
        // pdfDoc.text(nums[i].toString(),stratX + i*letterW + offsetX, startY+offsetY+letterW)
    }

    // pdfDoc.font('public/fonts/a_AvanteBs_Regular.ttf').text("Закрасте фигурки", 200, 10);


for ( jj = 0; jj < 6; jj++) {

    const stX = 40;
    const stY = 100 + jj* (50);
    const LtNum = 20;

    pdfDoc.moveTo(stX, stY).lineTo(stX + LtNum*letterW, stY).stroke();                
    pdfDoc.moveTo(stX, stY+letterW).lineTo(stX + LtNum*letterW, stY+letterW).stroke();                
    pdfDoc.moveTo(stX, stY+letterW*2).lineTo(stX + LtNum*letterW, stY+letterW*2).stroke();                

    for( i = 0; i <= LtNum; i++) {
        pdfDoc.moveTo(stX + i*letterW, stY).lineTo(stX + i*letterW, stY+letterW*2).stroke();
    }

    for( i = 0; i < LtNum; i++) {
        var nm = Math.floor(Math.random()*width);
        pdfDoc.text(chrs[nm], stX + i*letterW + offsetX, stY+offsetY);                  
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
  