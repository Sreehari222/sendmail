const express =require('express');
const app =express();
const port = process.env.port || 3000;

//creat the middileware for the parsing required bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//define to the server that the static files are stored inside the public folder.
app.use(express.static('public'));

//definethe root homepage
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/send-mail.html');
});

const nodemailer =require('nodemailer');
const transporter = nodemailer.createTransport({
    service :'gmail',
    auth :{
        user:'harilalkannan92@gmail.com',
        pass:'rjme jetd qrum bzji'
    }
});

//create the route
app.post('/send-mail',(req,res)=>{
    const {to,subject,message}=req.body;

    const mailOptions ={
        to,
        subject,
        message
    };

    transporter.sendMail(mailOptions,(error,infor)=>{
        if(error){
            console.error(error);
            res.status(500).send('error in sending mail');
        }else{
            console.log('email sent:'+ infor.response);
            res.send('email sent successfully');
        }
    });
    
});
//start  the server with specic port
app.listen(port,()=>{
    console.log(`server is running on port${port}`)
});