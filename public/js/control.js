function changeReadyToStartAJAX() {

  let request = $.getJSON('https://dsmbot.herokuapp.com/changeReadyToStart?value=true', () => {
    console.log('requested');
  })
  .done((data)=>{

    console.log(data);
    setTimeout(()=>{
      updateStatus()
    }, 700)

  })
  .fail(()=>{
    console.log(error);
  })

}


function updateStatus() {

  let request = $.getJSON('https://dsmbot.herokuapp.com/getAllStatus', () => {
    console.log('requested');
  })
  .done((data)=>{

    console.log(data);

    // ready
    if(data.readyToStart) {
      $("#ready").html("YES")
      $("#ready").css('color', '#00ff00')
    }
    else {
      $("#ready").html("NO")
      $("#ready").css('color', 'red')
    }

    //enter status
    if(data.enterTime) {
      $("#enterStatus").html("OPEN")
      $("#enterStatus").css('color', '#00ff00')
    }
    else {
      $("#enterStatus").html("CLOSE")
      $("#enterStatus").css('color', 'red')
    }

    //isQuizOnline
    if(data.isQuizOnline) {
      $("#quizOnlineStatus").html("ONLINE")
      $("#quizOnlineStatus").css('color', '#00ff00')
    }
    else {
      $("#quizOnlineStatus").html("OFFLINE")
      $("#quizOnlineStatus").css('color', 'red')
    }

    //quizReadyStatus
    if(data.quizReady) {

      $("#quizReadyStatus").empty()
      $("#quizReadyStatus").append("<br><br>")
      data.quizReady.forEach((quiz, index)=>{
        let elem = ""

        if(quiz) elem = `${index+1}. <span id=\`q${index+1}Status\` style="color: #00ff00"><strong>false</strong></span><br>`
        else elem = `${index+1}. <span id=\`q${index+1}Status\` style="color: #ff0000"><strong>false</strong></span><br>`

        $("#quizReadyStatus").append(elem)

      })
    }

  })
  .fail((error)=>{
    console.log(error);
  })

}
