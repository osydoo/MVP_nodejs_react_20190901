var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'test';  
//mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://${server}`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('MongoDB Connected!');
});
var client = mongoose.Schema({
    name : 'String',
    phone : 'number',
    mail : 'String',
    getway : 'String',
    state : 'String',
    address: 'String',
    zonecode: 'number'
});
/*
var client = mongoose.Schema({
    managerId : 'String',//Objectid
    name : 'String',client
    phone : 'number'client
    mail : 'String',
    getway : 'String',
    state : 'String',
    deposit : 'Array',//냇다 안냇다, 횟수
    whatLink : 'String',
    settime : 'Date',
    endtime : 'Date',
    product : 'String',//Objectid
    formReqTime : 'Date',
    deleteData : 'Boolean',
    prLink : 'String',
});
*/

var Client = mongoose.model('clienttwo', client);
/*
var temoClient = new Client({ ManagerId: '1', Name: '윤동우', Phone: '01052892755', Mail: 'osydooo@naver.com', Deposit: ['True','1'], WhatLink: 'www.naver.com', Settime: '2019-08-09', Endtime: '2019-09-09', Product: '100', FormReqTime: '2019-08-09', DeleteData: false, PRLink: 'www.google.com' });
*/

router.get('/datawatch', (req, res) => {
    //let { ownerId, pageId } = req.body;
    //console.log(req.params)
  //let ownerId = req.query['ownerId']
  //let pageId = req.query['pageId']

  Client.find(/*{ManagerId: ownerId, Product: pageId},*/ function(error, clients){
    console.log('--- Read all ---');

    if(error){
        console.log(error);
    }else{
        console.log("db의 학생관련 정보 :" + clients);
        return res.json(clients);
    }
  })
})

router.post('/datainsert', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;

   // const { Name, Phone, Mail} = req.body;
    console.log("DB에 직접 입력 : " + name, phone, email)
   // const { ManagerId, Name, Phone, Mail, Deposit, WhatLink, Settime, Endtime, Product, FormReqTime, DeleteData, PRLink } = req.body;
    //var newClient = new Client({ ManagerId: ManagerId, Name: Name, Phone: Phone, Mail: Mail, Deposit: Deposit, WhatLink: WhatLink, Settime: Settime, Endtime: Endtime, Product: Product, FormReqTime: FormReqTime, DeleteData: DeleteData, PRLink: PRLink });
    var newClient = new Client({    
        name : name,
        phone : phone,
        mail : email,
        getway : '',
        state : '',
        address: '',
        zonecode: '' 
    });
    newClient.save(function(error, data){
      if(error){
        console.log(error);
      }else{
        console.log('DB에 데이터 추가 완료')
      }
    });
    return res.json( {success : true});
})


router.post('/csvinsert', async (req, res) => {
    var file = req.body.file;
    var Client = mongoose.model('clienttwo', client);
    var i = 0;
    console.log(file)
    console.log("csvinsert입니다")
    for(i ; i< file.length ; i++){
        console.log(file[i].name)
        console.log(file[i].phone)
        console.log(file[i].get)
        console.log(file[i].state)
        const name = file[i].name;
        const phone = file[i].phone;
        const email = "osydooo@naver.com";
        const getway = file[i].get;
        const state = file[i].state;
        const address = '';
        const zonecode = '';
    // const { ManagerId, Name, Phone, Mail, Deposit, WhatLink, Settime, Endtime, Product, FormReqTime, DeleteData, PRLink } = req.body;
        //var newClient = new Client({ ManagerId: ManagerId, Name: Name, Phone: Phone, Mail: Mail, Deposit: Deposit, WhatLink: WhatLink, Settime: Settime, Endtime: Endtime, Product: Product, FormReqTime: FormReqTime, DeleteData: DeleteData, PRLink: PRLink });

   //  setTimeout(function(){
        var newClient = new Client({         
            name : name,
            phone : phone,
            mail : email,
            getway : getway,
            state : state,
            address: address,
            zonecode: zonecode
         });
        
        await Client.findOne({name: name, phone: phone}, function(err, data){
         if(err) console.log(err);
         else{
            if(data){
                console.log(data)
                console.log("이미 중복된 데이터가 존재합니다.");
            }else{ 
                newClient.save(function(error){
                   if(error){
                       console.error(error);
                   }else{
                       console.log('csv파일 DB에 저장 완료')
                   }
               });
            }
         }
     })    
  //  },1000)
    }
    return res.json( {success : true});
})

router.post('/addData', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let name = req.body.name;
    let phone = req.body.phone;
    let getway = req.body.getway;
    let state = req.body.state;
   // const { Name, Phone, Mail} = req.body;
    console.log("테이블에서 DB 입력 : " + name, phone, getway, state)
   // const { ManagerId, Name, Phone, Mail, Deposit, WhatLink, Settime, Endtime, Product, FormReqTime, DeleteData, PRLink } = req.body;
    //var newClient = new Client({ ManagerId: ManagerId, Name: Name, Phone: Phone, Mail: Mail, Deposit: Deposit, WhatLink: WhatLink, Settime: Settime, Endtime: Endtime, Product: Product, FormReqTime: FormReqTime, DeleteData: DeleteData, PRLink: PRLink });
    var newClient = new Client({             
        name : name,
        phone : phone,
        mail : email,
        getway : getway,
        state : state,
        address: '',
        zonecode: '' 
    });
    Client.findOne({name: name, phone: phone}, function(err, data){
        if(err){
            console.log(err);
        } 
        if(data){
            console.log("이미 중복된 데이터가 존재합니다.");
        }else{
           newClient.save(function(error, data){
               if(error){
                   console.log(error);
                }else{
                   console.log('회원정보 저장 완료');
               }
           });
        }
    })
    return res.json({success : true});
})

router.post('/updateData', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let oldname = req.body.oldname;
    let oldphone = req.body.oldphone;
    let oldgetway = req.body.oldgetway;
    let oldstate = req.body.oldstate;
    let newname = req.body.newname;
    let newphone = req.body.newphone;
    let newgetway = req.body.newgetway;
    let newstate = req.body.newstate;
    console.log("테이블에서 DB 업데이트 : " + newname, newphone, newgetway, newstate)
    Client.findOneAndUpdate({name : oldname, phone : oldphone, getway : oldgetway, state : oldstate}, {$set:{name : newname, phone : newphone, getway : newgetway, state : newstate}}, function(error, data){
        if(error){
            console.log(error);
        }else{
            console.log('회원정보 업데이트 완료');
        }
    });
    return res.json({success : true});
})

router.post('/deleteData', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let name = req.body.name;
    let phone = req.body.phone;
    let getway = req.body.getway;
    let state = req.body.state;
    console.log("테이블에서 DB 삭제 : " + name, phone, getway, state);
    var query = {name: name};
    Client.deleteMany(query, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log('회원정보 삭제 완료');
            console.log(result);
        }
    });
    return res.json({success : true});
});

router.get('/getdata', (req, res) => {
  Client.find(function(error, clients){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log("db의 학생관련 정보 :" + clients);
        return res.json(clients);
    }
  })

})

module.exports = router;

