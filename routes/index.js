var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
const Duplex = require('stream').Duplex;
const { check } = require('express-validator');
var figurki = require('../src/figurki.js');
var letters = require('../src/letters.js');
var letters_all = require('../src/letters_all.js');
var numbers_all = require('../src/numbers_all.js');
var slogs = require('../src/slogs.js');

var FILES_DIR = path.join(__dirname, '../public/pdfs/')
console.log('FILES_DIR:'+FILES_DIR)


var app = express();
app.use(express.static('public', { index: 'index.html' }))

app.use(express.urlencoded({extended: false}));

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/figures",function(req,res){
  console.log('FIG_GET',req.body) 
});

router.post("/figures", [ check('width').isNumeric().trim().escape(),
                          check('height').isNumeric().trim().escape(),
                          check('imgB1').isString().isIn(['YES','NO']),
                          check('imgB2').isString().isIn(['YES','NO']),
                          check('imgB3').isString().isIn(['YES','NO']),
                          check('imgB4').isString().isIn(['YES','NO']),
                          check('imgB5').isString().isIn(['YES','NO']),
                          check('imgB6').isString().isIn(['YES','NO']),
                          check('imgB7').isString().isIn(['YES','NO']),
                          check('imgB8').isString().isIn(['YES','NO']),
                          check('imgB9').isString().isIn(['YES','NO']),
                          check('imgB10').isString().isIn(['YES','NO']),
                          check('imgB11').isString().isIn(['YES','NO']),

] ,async function(req,res){ 
  console.log(req.body.height)
  console.log(req.body.width)
  console.log(req.body.imgB1)

  var useImages = [req.body.imgB1,req.body.imgB2,req.body.imgB3,req.body.imgB4,req.body.imgB5,req.body.imgB6,req.body.imgB7,req.body.imgB8,req.body.imgB9,req.body.imgB10,req.body.imgB11];

 var fileData = await figurki(useImages,req.body.width,req.body.height);

  console.log('path:'+path)

  // res.setHeader('Content-Type', 'application/pdf');

  // var stat = fs.statSync(FILES_DIR+'SampleDocument.pdf');
  // res.setHeader('Content-Length', stat.size);

  // fileName='SampleDocument.pdf'
  const options = {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'inline; filename="test.pdf"',
      'Content-Length': fileData.length,
    }
  };

  console.log(JSON.stringify(options, null, 4));
  
  console.log('SENDING.....')
  
  bufferToStream(fileData).pipe(res)
  // res.send(fileData);

//   res.sendFile(FILES_DIR+'SampleDocument.pdf', options, function (err) {
//     if (err) {
//         console.error('Error sending file:', err);
//     } else {
//         console.log('Sent:', fileName);
//     }
// });
return;

  res.sendFile(FILES_DIR+fileName, function (err) {
      if (err) {
          console.error('Error sending file:', err);
      } else {
          console.log('Sent:', fileName);
      }
  });
  
}); 

function bufferToStream(buffer) {  
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}


router.post("/letters", [ check('width').isNumeric().trim().escape()] ,async function(req,res){ 
console.log(req.body.width)

var fileData = await letters(req.body.width);

const options = {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-disposition': 'inline; filename="test.pdf"',
    'Content-Length': fileData.length,
  }
};

bufferToStream(fileData).pipe(res)

}); 

router.post("/letters_all", [ check('width').isNumeric().trim().escape()] ,async function(req,res){ 
  console.log(req.body.width)
  
  var fileData = await letters_all(req.body.width);
  
  const options = {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'inline; filename="test.pdf"',
      'Content-Length': fileData.length,
    }
  };
  
  bufferToStream(fileData).pipe(res)
  
  }); 

  router.post("/numbers_all", [ check('width').isNumeric().trim().escape()] ,async function(req,res){ 
    console.log(req.body.width)
    
    var fileData = await numbers_all(req.body.width);
    
    const options = {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'inline; filename="test.pdf"',
        'Content-Length': fileData.length,
      }
    };
    
    bufferToStream(fileData).pipe(res)
    
}); 

router.post("/slogs", [ check('width').isNumeric().trim().escape()] ,async function(req,res){ 
  console.log(req.body.width)
  
  var fileData = await slogs(req.body.width);
  
  const options = {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'inline; filename="test.pdf"',
      'Content-Length': fileData.length,
    }
  };
  
  bufferToStream(fileData).pipe(res)
  
}); 


    
module.exports = router;
