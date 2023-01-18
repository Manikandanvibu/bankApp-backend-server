// import cors client server integration
const cors=require('cors')
// import dataservice folder from service folder
const dataservice=require('./service/dataservice')
// import jwt(json web token)
const jwt=require('jsonwebtoken')
// import  express
const express=require('express')
const { json } = require('express')

// using express create app
const app=express()

// connect front end should always give after creating app
app.use(cors({origin:'http://localhost:4200'}))

// to convert json data to js when coming to js file
app.use(express.json())


// // get
// // '/' indicate index page is need to present
// app.get('/',(req,res)=>{
//    res.send('get method checking .....') 
// })

// // post
// app.post('/',(req,res)=>{
//     res.send('post method checking .....') 
//  })
// //  put
// app.put('/',(req,res)=>{
//     res.send('put method checking .....') 
//  })
// //  patch
// app.patch('/',(req,res)=>{
//     res.send('patch method checking .....') 
//  })
// //  delete
// app.delete('/',(req,res)=>{
//     res.send('delete method checking .....') 
//  })


// middle ware for vrifying token so that deposit withdraw get transcation work
const jwtmiddleware=(req,res,next)=>{
console.log(".....router specific middle ware....")
try{
// to get token from client
const token=req.headers.token
const data=jwt.verify(token,"secretKey123")
//  now call this middle ware in function where we needed
// after completing the code mention next it is essentail to get outside of this code otherwise code stucks eg: app.post('/deposit',jwtmiddleware,(req,res)=>{
next()
}
// if try no verified catch work
catch{
    // return chayanda things object ayi kodaka
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"plzz login first"
    })
}
}


//  request to create
// register
app.post('/register',(req,res)=>{
    // // importing function
    // // register method evada use chyanam engil athina avadana export chyanam
    // const result=dataservice.register(req.body.acno,req.body.uname,req.body.psw)
    // // .json is given becasuse it is need to present in a screen so we need to conert to json so that front end can understand
    // res.status(result.statusCode).json(result)

    // storing in asychronus data register
    dataservice.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result) 
    })
})

// login

app.post('/login',(req,res)=>{
    // const result=dataservice.login(req.body.acno,req.body.psw)
    // res.status(result.statusCode).json(result)

    dataservice.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result) 
    })

})

// deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{
    // const result=dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
    // res.status(result.statusCode).json(result)

    dataservice.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result) 
    })
})

// withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    // const result=dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
    // res.status(result.statusCode).json(result)

    dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result) 
    })

})
// transcation history
app.post('/transcation_history',jwtmiddleware,(req,res)=>{
    // const result=dataservice.gettranscation(req.body.acno)
    // res.status(result.statusCode).json(result)
    dataservice.gettranscation(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result) 
    })
})
// delete
app.delete('/deleteAccount/:acno',jwtmiddleware,(req,res)=>{
    // delete chayanda acc no body la kudayo header kudayam vantia karyam illaya athaina params kuda send chayanam/:acno'
    dataservice.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)  
    })
})

// to set port number to app
app.listen(3000,()=>{
    console.log("server started at prt number 3000");
})

