



$(function () {
  const today = dayjs();
  const dateFormat = today.format('dddd, MMMM D');
  $('#currentDay').text(dateFormat);

    function saveToLocalStorage(button) {
      let textArea = $(button).siblings('.description');
      let id = textArea.parent().attr('id'); 
      let userInput = textArea.val().trim();
 
      localStorage.setItem(id, userInput);
      $('#appointmentDiv').css('visibility', 'visible')
      appTimer()
    }

    function appTimer() {
      let time = 3;
      let answerIntervalId = setInterval(function () {
        time--;
        if (time <= 0) {
            clearInterval(answerIntervalId);
            $('#appointmentDiv').css('visibility', 'hidden')
        }
      }, 1000);
    }
  

    $('.saveBtn').on('click', function() {
      saveToLocalStorage(this);
    });
  
  
    function loadFromLocalStorage() {
      $('.time-block').each(function() {
        let id = $(this).attr('id'); 
        let userInput = localStorage.getItem(id);
  
        if (userInput !== null) {
          $(this).find('.description').val(userInput);
        }
      });
    }
  
    loadFromLocalStorage();

    let currentHour = dayjs().format('H');

    $('[id^="hour-"]').each(function() {
      let hourID = parseInt($(this).attr('id').split('-')[1]);
  
      if (currentHour > hourID) {
        $(this).removeClass('present future').addClass('past');
      } else if (currentHour == hourID) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
});