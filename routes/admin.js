var express=require('express');

var router=express.Router();
var mysql=require('mysql2');
var path=require('path');
var fs = require('fs');

var session=require('express-session');

// mysql connect
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root",
    database:"soulmedic"
})

router.use(session({
    secret:'a2zithub',
    resave:false,
    saveUninitialized:true
}))

function Check_l_details(req,res,next){
    if(req.session.lid){
        next();
    }else{
        res.redirect('/admin');
    }
}

router.get('/',(req,res)=>{
    // res.send('login');
    // res.redirect('admin/index');
    res.render('admin/login.ejs');
})

router.post('/login_check',(req,res)=>{
    // res.send('Login Check');
    var {username,password}=req.body;

    var sql=`select * from login where username='${username}'
    and password='${password}'`;
    conn.query(sql,(err,result)=>{
        // res.send(result);
        if (result[0]){
            // res.send(result);

            // session
            req.session.lid=result[0].lid;
            req.session.admin_name=result[0].admin_name;
            // res.send(req.session);
            res.redirect('/admin/index');
        }
    })

    // res.send(password);
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/admin');
})

router.get('/index',Check_l_details,(req,res)=>{
    res.render('admin/index.ejs');
})

router.get('/contactus',(req,res)=>{
    // res.send('Contact Us');
    var sql=`select * from contact_details`;
    conn.query(sql,(err,result)=>{
        //   res.send(result[0]);
         res.render('admin/contactus.ejs',{data:result[0]});

    })
   
})

router.post('/contactus_update',(req,res)=>{
    // res.send(req.body);
    // res.send(req.files);

    var {logo_old,email,mobile,address,map}=req.body;

    if(req.files){
        var f=req.files.logo;
        var logoname=Date.now()+f.name;
        var pathlogo=path.join(__dirname,'../','public',logoname);
        f.mv(pathlogo,(err)=>{})
        var logopath=path.join(__dirname,'../public',logo_old);
        fs.unlink(logopath,(err)=>{});
    }else{
        var logoname=logo_old;
    }
    var sql=`update contact_details set
    logo='${logoname}',
    email='${email}',
    mobile='${mobile}',
    address='${address}',
    map='${map}' where sid='1'`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/contactus');
    })
})

router.get('/aboutus',(req,res)=>{
    var sql=`select * from about`;
    conn.query(sql,(err,result)=>{
        res.render('admin/aboutus.ejs',{data:result});
    })
    
})

router.post('/aboutus_save',(req,res)=>{
    // res.send(req.body);
    var {icon,title,desc}=req.body;
    var sql=`insert into about (icon,title,description)
    values ('${icon}','${title}','${desc}')`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/aboutus');
    })
})

router.get('/faq',(req,res)=>{
    var sql=`select * from faq`;
    conn.query(sql,(err,result)=>{
        res.render('admin/faq.ejs',{data:result});
    })
})

router.post('/faq_save',(req,res)=>{
    // res.send(req.body);
    var{f_que,f_ans}=req.body;
    var sql=`insert into faq (f_que,f_ans)
    values('${f_que}','${f_ans}')`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/faq');
    })
})

router.get('/whyus',(req,res)=>{
    var sql=`select * from why`;
    conn.query(sql,(err,result)=>{
        res.render('admin/whyus.ejs',{data:result});
    })
})

router.post('/whyus_save',(req,res)=>{
    // res.send(req.body);
    var {icon,title,desc}=req.body;
    var sql=`insert into why (icon,title,description)
    values ('${icon}','${title}','${desc}')`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/whyus');
    })
})

router.get('/blog',(req,res)=>{
    var sql=`select * from blog`;
    conn.query(sql,(err,result)=>{
        res.render('admin/blog.ejs',{data:result});
    })
})

router.post('/blog_save',(req,res)=>{
    // res.send(req.body);
    var{bimage,bdate,btitle,bauthor,bdesc}=req.body;

    if(req.files){
        var f=req.files.bimage;
        var bimagename=Date.now()+f.name;
        var pathbimage=path.join(__dirname,'../','public',bimagename);
        f.mv(pathbimage,(err)=>{})
    }

    var sql=`insert into blog (bimage,bdate,btitle,bauthor,bdesc)
    values('${bimagename}','${bdate}','${btitle}','${bauthor}','${bdesc}')`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/blog');
    })
})

router.get('/patner',(req,res)=>{
    var sql=`select * from patner`;
    conn.query(sql,(err,result)=>{
        res.render('admin/patner.ejs',{data:result});
    })
})

router.post('/patner_save',(req,res)=>{
    // res.send(req.body);
    var{pimage}=req.files;

    if(req.files){
        var f=req.files.pimage;
        var pimagename=Date.now()+f.name;
        var pathpimage=path.join(__dirname,'../','public',pimagename);
        f.mv(pathpimage,(err)=>{})
    }

    var sql=`insert into patner (pimage)
    values('${pimagename}')`;
    conn.query(sql,(err,result)=>{
        res.redirect('/admin/patner');
    })
})

router.get('/appointment',(req,res)=>{
    var sql=`select * from appointment`;
    conn.query(sql,(err,result)=>{
        res.render('admin/appointment.ejs',{data:result});
    })
})




module.exports=router;