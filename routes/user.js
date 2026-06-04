var express=require('express');
var mysql=require('mysql2');
const { route } = require('./admin');
var router=express.Router();

var conn=mysql.createConnection({
    host:"biqs381m0xwf5dv2ejdk-mysql.services.clever-cloud.com",
    user:"u0oxppu8ua5mkopa",
    password:"L5Hzg7qNFqNxROf4jarR",
    database:"biqs381m0xwf5dv2ejdk"
})

router.get('/',(req,res)=>{
    var sql=`select * from contact_details`;
    conn.query(sql,(err,result)=>{
        // res.send(result[0]);

        res.render('user/index.ejs',{data:result[0]});
    })
    
})

router.get('/page',(req,res)=>{
    // res.send('Welcome Sai');
    var sql=`select * from contact_details`;
    conn.query(sql,(err,result)=>{
        var sql2=`select * from about`;
        conn.query(sql2,(err2,result2)=>{
            var sql3=`select * from blog`;
            conn.query(sql3,(err3,result3)=>{
                // res.send(result);
                // res.send(result2);
                // res.send(result3);
                
                res.render('user/index.ejs',{data:result,data2:result2,data3:result3});
            })
        })
    })
})

router.post('/appointment_save',(req,res)=>{
    
    var {adepa,aname,alastname,amobile,aemail,adate} = req.body;

    var sql = `insert into appointment
    (adepa,aname,alastname,amobile,aemail,adate)
    VALUES ('${adepa}',
    '${aname}',
    '${alastname}',
    '${amobile}',
    '${aemail}',
    '${adate}')`;

    conn.query(sql,(err,result)=>{
        if(err) throw err;

        res.redirect('/');
    });
});

module.exports=router;