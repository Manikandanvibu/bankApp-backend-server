// import db.js
const db = require('./db')

// import jwt(json web token)
const jwt = require('jsonwebtoken')


//database
// userDetails = {
//   1000: { acno: 1000, username: "anu", password: 123, balance: 0, transcation: [] },
//   1001: { acno: 1001, username: "amal", password: 123, balance: 0, transcation: [] },
//   1002: { acno: 1002, username: "arun", password: 123, balance: 0, transcation: [] },
//   1003: { acno: 1003, username: "mega", password: 123, balance: 0, transcation: [] },
// }
// arrow function is only allowed in a express server 


register = (acno, uname, psw) => {

  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: 'user alredy exsist'
      }
    }
    else {
      const newuser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transcation: []
      })
      // to save the data in databse command is
      newuser.save()
      return {
        statusCode: 200,
        status: true,
        message: 'registration success'
      }
    }
  })
}

//   if(acno in userDetails){
//     return {
//       statusCode:401,
//       status:false,
//       message:'user alredy exsist'
//     }
//   }
//   else{
//     userDetails[acno]={acno,username:uname,password:psw,balance:0,transcation:[]}
//     return {
//       statusCode:200,
//       status:true,
//       message:'registration success'
//     }
//   }
// }

// login function
login = (acno, psw) => {
  // if(acno in userDetails){
  //   if(psw==userDetails[acno]["password"]){

  //     // token generatrion
  //     const token=jwt.sign({currentAcno:acno},'secretKey123')
  //       return {
  //         statusCode:200,
  //         status:true,
  //         message:'login success',
  //         token
  //       }
  //   }
  //   else{
  //     return {
  //       statusCode:401,
  //       status:false,
  //       message:'incorrect password '
  //     }
  //   } 
  // }
  // else{
  //   return {
  //     statusCode:401,
  //       status:false,
  //       message:'incorrect acc no:'
  //   }
  // }

  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      const token = jwt.sign({ currentAcno: acno }, 'secretKey123')

      return {
        statusCode: 200,
        status: true,
        message: 'login success',
        currentAcno:acno,
        currentUser:user.username,
        token
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password or acno'
      }
    }
  })
}
// deposit function
deposit = (acno, password, amount) => {

  // var amnt=parseInt(amount)
  // if(acno in userDetails){
  //   if(password==userDetails[acno]["password"]){
  //     userDetails[acno]["balance"]+=amnt
  //     userDetails[acno]['transcation'].push({type:'CREDIT',amount:amnt})
  //     return {
  //       statusCode:200,
  //       status:true,
  //       message:`credit : balance ${userDetails[acno]["balance"]}`
  //   }
  // }
  //  else{
  //     return {
  //       statusCode:401,
  //       status:false,
  //       message:'incorrect password'
  //     }
  //   }
  // }
  // else{
  //   return {
  //     statusCode:401,
  //     status:false,
  //     message:'incorrect accno:'
  //   }
  // }

  var amnt = parseInt(amount)
  return db.User.findOne({ acno, password }).then(user => {
    if (user) {

      user.balance += amnt
      user.transcation.push({ type: 'CREDIT', amount: amnt })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: `${amnt} credited and balance is ${user.balance}`
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password or acno'
      }
    }
  })
}

// withdraw function
withdraw = (acno, password, amount) => {

  var amntt = parseInt(amount)
  return db.User.findOne({ acno, password }).then(user => {
    if (user) {
      if (amntt < user.balance) {
        user.balance -= amntt
        user.transcation.push({ type: 'DEBIT', amount: amntt })
        user.save()
        return {
          statusCode: 200,
          status: true,
          message: `${amntt} debited and balance is ${user.balance}`
        }
      }
      else {
        return {
                  statusCode:401,
                  status:false,
                  message:"insufficient balance"
                }
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "incorrect acno or password"
      }
    }
  })

  // if(acno in userDetails){
  //   if(password==userDetails[acno]["password"]){
  //     if(amntt<=userDetails[acno]["balance"]){
  //       userDetails[acno]["balance"]-=amntt
  //       userDetails[acno]['transcation'].push({type:'DEBIT',amount:amntt})
  //       return{
  //         statusCode:200,
  //         status:true,
  //         message:`debit : balance ${userDetails[acno]["balance"]}`
  //       } 
  //     }
  //     else{
  //       return {
  //         statusCode:401,
  //         status:false,
  //         message:"insufficient balance"
  //       }
  //     }
  //   }
  //   else{
  //     return {
  //       statusCode:401,
  //         status:false,
  //         message:"incorrect password"
  //     }
  //   }
  // }
  // else{
  //   return {
  //     statusCode:401,
  //         status:false,
  //         message:"incorect ac no"
  //   }
  // }
}
// transcation history
gettranscation = (acno) => {
  // if (acno in userDetails) {
  //   return {
  //     statusCode: 200,
  //     status: true,
  //     message: userDetails[acno]["transcation"]
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 401,
  //     status: false,
  //     message: "incorect ac no"
  //   }
  // }
  return db.User.findOne({acno}).then(user => {
    if(user){
      return {
            statusCode: 200,
            status: true,
            message: user.transcation
          }
    }
    else{
      return {
            statusCode: 401,
            status: false,
            message: "incorect ac no"
          }
    }
  })
}

acdelete = (acno) =>{
return db.User.deleteOne({acno}).then(user =>{
  if(user){
    return{
      statusCode: 200,
      status: true,
      message: `account number ${acno} deleted`
    }
  }
  else{
    return{
      statusCode: 401,
      status: false,
      message: " incorrect acc no "
    }
  }
})
}
//   to export method register for index.js
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettranscation,
  acdelete
}