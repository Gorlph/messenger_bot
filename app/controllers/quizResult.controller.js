let firebase = require('../config/firebase.init.js')
let database = firebase.database()

exports.getResult = function(req, res) {

  let result = new Object()
  database.ref('/participants').once('value')
  .then((snapshot)=>{

    let UIDs = snapshot.val()
    for(let i = 0; i < UIDs.length; i++) {
      result[UIDs[i]] = 0
    }

    return database.ref('/quiz').once('value')

  })
  .then((quizSnapshot)=>{

    let quiz = quizSnapshot.val()
    let allCorrectUsers = []

    allCorrectUsers = quiz.map((q)=>{
      return q.correctUsers
    })

    allCorrectUsers.forEach((userByOrder)=>{
      userByOrder.forEach((uid)=>{
        if(result.hasOwnProperty(uid))
          result[uid]++
      })
    })

    console.log(`end result: ${JSON.stringify(result)}`);
    return database.ref('/users').once('value')
  })
  .then((usersChunk)=>{

    let sortedResult = []
    for(let key in result) {
      sortedResult.push({
        'id': key,
        'name': usersChunk[key].firstName + usersChunk[key].lastName,
        'gender': usersChunk[key].gender,
        'profilePic': usersChunk[key].profilePic,
        'point': result[key]
      })
    }

    sortedResult.sort( (a,b)=> { return (a.point > b.point) ? 1 : ( (b.point > a.point) ? -1 : 0 ) })

  })

  res.render("result", {
    a: sortedResult
  })

}
