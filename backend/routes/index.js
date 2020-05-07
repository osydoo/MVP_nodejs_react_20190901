var express = require('express');
var router = express.Router();
var request = require('request');
const csvjson = require('csvjson');//csv -> json
const fs = require('fs');
var path = require('path'); 
const multer = require('multer');
const appkey = "https://text.com"
//파일 저장
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/data/')//실제 경로?  가상경로?
    },
    filename: function (req, file, cb) {
      cb(null, 'file.csv');//file.originalname )
    }
})
  
var upload = multer({ storage: storage })
  
router.post('/upload', upload.single('file'), function(req, res) { 
  var data = fs.readFileSync(path.join(__dirname, `../public/data/file.csv`), { encoding : 'utf8'});
  var options = {
  delimiter : ',', // optional
  quote     : '"' // optional
  };
  const jsonObj = csvjson.toObject(data, options);
  console.log(jsonObj[0].name);
  console.log("json 파일 보냄 : " + jsonObj[0].name); 
  return res.json({ success: true, data: jsonObj });  
});
//파일 저장 끝

//router사용 -> /api/putData로 보낼 시 이곳이 처리가됨
router.use('/putData', (req, res) => {
  var i = 0;
  const { name, phone, text } = req.body;//배열로 넘어옴
  console.log("text 내용  : " + text);
  console.log("phone 내용  : " + phone);
  for(; i < name.length; i++){//배열로 넘어온 변수들(name, phone)들을 일일이 처리해주기 위해 사용
    request({
        uri: appkey,//appKey번호 민감 데이터 삭제
        method: "POST",  
        json:{//json파일로 만들어서 보내야만 문자가 보내짐
            body: `${text}`,
            sendNo:"01012341234",
            recipientList:[
                {
                recipientNo: `0${phone[i]}`,
                }
            ]
        }
      })
  }
  console.log("문자 " + i + " 회 전송 완료"); 
  return res.json( { success:true } );
});

router.use('/sendMessageOne', (req, res) => {
  const { name, phone, text } = req.body;//배열로 넘어옴
  console.log("text 내용  : " + text);
  console.log("phone 내용  : " + phone);
    request({
      uri: appkey,//appKey번호 민감 데이터 삭제
      method: "POST",  
        json:{//json파일로 만들어서 보내야만 문자가 보내짐
            body: `${text}`,
            sendNo:"01012341234",
            recipientList:[
                {
                recipientNo: `0${phone}`,
                }
            ]
        }
      })
  return res.json( { success:true } );
});

router.get('/getData', (req, res)=>{
  var data = fs.readFileSync(path.join(__dirname, '../public/data/file.csv'), { encoding : 'utf8'});
   var options = {
    delimiter : ',', // optional
    quote     : '"' // optional
    };
    const jsonObj = csvjson.toObject(data, options);
    console.log("json 파일 보냄" + jsonObj[0].name); 
    return res.json({ success: true, data: jsonObj });  
})

router.get('/test', (req, res)=>{
  console.log('연결은 잘됨')
  console.log("url : " + req.url)

  return res.json({ success: true, data: 'aaa' });
})

module.exports = router;
