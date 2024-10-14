const PDFDocument = require('pdfkit');
const fs = require('fs');

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


module.exports = async function (slogsNum) {
    console.log('Hello, PDF letters', slogsNum);
  
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
    

let slogs = [ 'БА','БЯ','БУ','БЮ','БО','БЁ','БЭ','БЕ','БЫ','БИ','БЬ',
                'ВА','ВЯ','ВУ','ВЮ','ВО','ВЁ','ВЭ','ВЕ','ВЫ','ВИ','ВЬ',
                'ГА','ГЯ','ГУ','ГЮ','ГО','ГЁ','ГЭ','ГЕ','ГЫ','ГИ','ГЬ',
                'ДА','ДЯ','ДУ','ДЮ','ДО','ДЁ','ДЭ','ДЕ','ДЫ','ДИ','ДЬ',
                'ЖА',     'ЖУ','ЖЮ','ЖО','ЖЁ','ЖЭ','ЖЕ',     'ЖИ','ЖЬ',
                'ЗА','ЗЯ','ЗУ','ЗЮ','ЗО','ЗЁ','ЗЭ','ЗЕ','ЗЫ','ЗИ','ЗЬ',
                'ЙА','ЙУ','ЙО','ЙЭ',
                'КА','КЯ','КУ','КЮ','КО','КЁ','КЭ','КЕ','КЫ','КИ','КЬ',
                'ЛА','ЛЯ','ЛУ','ЛЮ','ЛО','ЛЁ','ЛЭ','ЛЕ','ЛЫ','ЛИ','ЛЬ',
                'МА','МЯ','МУ','МЮ','МО','МЁ','МЭ','МЕ','МЫ','МИ','МЬ',
                'НА','НЯ','НУ','НЮ','НО','НЁ','НЭ','НЕ','НЫ','НИ','НЬ',
                'ПА','ПЯ','ПУ','ПЮ','ПО','ПЁ','ПЭ','ПЕ','ПЫ','ПИ','ПЬ',
                'РА','РЯ','РУ','РЮ','РО','РЁ','РЭ','РЕ','РЫ','РИ','РЬ',
                'СА','СЯ','СУ','СЮ','СО','СЁ','СЭ','СЕ','СЫ','СИ','СЬ',
                'ТА','ТЯ','ТУ','ТЮ','ТО','ТЁ','ТЭ','ТЕ','ТЫ','ТИ','ТЬ',
                'ФА','ФЯ','ФУ','ФЮ','ФО','ФЁ','ФЭ','ФЕ','ФЫ','ФИ','ФЬ',
                'ХА','ХЯ','ХУ','ХЮ','ХО','ХЁ','ХЭ','ХЕ','ХЫ','ХИ',
                'ЦА',     'ЦУ',     'ЦО',          'ЦЕ','ЦЫ','ЦИ',
                'ЧА',     'ЧУ',     'ЧО','ЧЁ',      'ЧЕ',     'ЧИ','ЧЬ',
                'ША',     'ШУ','ШЮ','ШО','ШЁ',      'ШЕ',     'ШИ','ШЬ',
                'ЩА',     'ЩУ',          'ЩЁ',      'ЩЕ',     'ЩИ','ЩЬ' ];




    const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЬЪЮЯ';
    const charactersLength = characters.length;
    let chrs = [];

    // while( chrs.length < width ){
    //     var chr = characters.charAt(Math.floor(Math.random() * charactersLength));
    //     if( !chrs.includes(chr)) chrs.push(chr);
    // }

    pdfDoc.font('public/fonts/a_AvanteBs_Regular.ttf')
    pdfDoc.fontSize(12);
    const LtNum = 18;
    const LineNum = 15;

    let SLG_arr = Array.from(Array(LineNum), () => new Array(LtNum));
    let forDeletion = [];
    // arr[0][0] = 'foo';
    // console.info(arr);
    const elem = slogsNum.split(',');
    for( x = 0 ; x <  elem.length; x+=2){
      console.log(elem[x],'->',elem[x+1])
      const slg = elem[x];
      const slg_num = elem[x+1];

      forDeletion.push[slg];

      const prng = splitmix32((Math.random()*2**32)>>>0)
      // Math.floor(prng() * filteredImgs.length
      let cnt = 0;

      while( cnt < slg_num) {
         const rndX = Math.floor(prng() * LtNum );
         const rndY = Math.floor(prng() * LineNum );

         if ( SLG_arr[rndY][rndX]  === undefined ) {
          SLG_arr[rndY][rndX] = slg;
          cnt++;
         }

      }

    }

    console.info(SLG_arr);


    slogs = slogs.filter(item => !forDeletion.includes(item))


  for ( jj = 0; jj < LineNum; jj++) {

    const stX = 40;
    const stY = 100 + jj* (25);

    for( i = 0; i < LtNum; i++) {

      let chr = '';

      if( SLG_arr[jj][i] !== undefined) {
        chr = SLG_arr[jj][i];
      } else {
        const prng = splitmix32((Math.random()*2**32)>>>0)
        chr = slogs[Math.floor(prng() * slogs.length )];
      }


        // var chr = characters.charAt(Math.floor(Math.random() * charactersLength));
        pdfDoc.text(chr, stX + i*letterW + offsetX + 5*i, stY+offsetY);                  
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
  