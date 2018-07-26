$(document).ready(persistData);

$(document).ready(hideContent);

//function dictating when to hide content.
//I have spliced it into some other functions as well to achieve consistency

function hideContent() {
    if($('.card-container').length === 11 && $('.reveal-content').length != true) {
        $('.card-container').slice(10).hide(); 
        $('.bottom-box').append(`<button class="reveal-content">Show More</button>`);
        $('.reveal-content').on('click', revealCards);   
    }else if($('.card-container').length > 10) {
        $('.card-container').slice(10).hide();
    }else{
        $('.card-container').show();
        $('.reveal-content').remove();
    }
}


function revealCards(e) {
    console.log($('.card-container'));
        $('.card-container').show();
}

var newCard = function(card) {
    $('.bottom-box').prepend(`<div class="card-container" data-id=${card.key}>
        <h2 class="title-of-card" contenteditable="true" onfocusout="changeLocalCard(event)">${card.title}</h2>
        <button class="delete-button" onclick="deleteCard(event)"></button>
        <p class="body-of-card" contenteditable="true" onfocusout="changeLocalCard(event)">${card.body}</p>
        <button class="upvote" onclick="changeQualityVariable(event)"></button>
        <button class="downvote" onclick="changeQualityVariable(event)"></button>
        <p class="quality"> quality: <span class="qualityVariable">${card.quality}</span></p>
        <button class="complete-task-btn" onclick="completeTask(event)">Complete Task</button>
        <hr>
      </div>`);
    storeLocalCard(card);
<<<<<<< HEAD
    $(".downvote").on('click', changeQualityVariable);
    $(".upvote").on('click', changeQualityVariable);
    $(".delete-button").on('click', deleteCard); 
    $('.complete-task-btn').on('click', completeTask);
    hideContent();
=======
    $("#title-input").val("");
    $("#task-input").val("");
    // setEventListeners();
>>>>>>> master
};

function Card(title, body, key) {
  this.title = title;
  this.body = body;
  this.key = key;
  this.quality = 'Normal'
}

function persistData() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var cardData = JSON.parse(localStorage.getItem(localStorage.key(i)));
        newCard(cardData);
    }
}

var storeLocalCard = function(object) {
    var key = object.key; 
    var stringyObj = JSON.stringify(object);
    localStorage.setItem(key, stringyObj);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var card = new Card($('#title-input').val(), $('#task-input').val(), Date.now());
    newCard(card);
});

$('.save-btn').prop('disabled', true)
$('#title-input').on('keyup', enableSave)
$('#task-input').on('keyup', enableSave)

function enableSave(event) {
  var saveBtn = $('.save-btn')
  if ($('#title-input').val().length > 0 && $('#task-input').val().length > 0) {
       saveBtn.prop('disabled', false);
  }
}

function changeQualityVariable(event) {
    var possibleQualities = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var currentQuality = $(event.target).siblings('.quality').children().text();
    for (var i = 0; i < possibleQualities.length; i++) {
        if ((currentQuality === possibleQualities[i]) && ($(event.target).hasClass('upvote'))) {
            $(event.target).siblings('.quality').children().text(possibleQualities[i + 1]);
        } else if (currentQuality === possibleQualities[i]) {
             $(event.target).siblings('.quality').children().text(possibleQualities[i - 1]);
        }
    } 
    changeLocalCard(event); 
};

var changeLocalCard = function(event) {
    var currentCard = $(event.target).closest('.card-container');
    var updatedTitle = currentCard.children('.title-of-card').text();
    var updatedBody = currentCard.children('.body-of-card').text();
    var updatedQuality = currentCard.find('.qualityVariable').text();
    var currentCardID = currentCard.prop('dataset').id;
    if (($(event.target).prop('className') === 'upvote') || ($(event.target).prop('className') === 'downvote')) {
       var storedCardObj = getLocalCard(currentCardID);
       storedCardObj.quality = updatedQuality;
       storeLocalCard(storedCardObj);
    } else if ($(event.target).prop('className') === 'title-of-card') {
        var storedCardObj = getLocalCard(currentCardID);
        storedCardObj.title = updatedTitle;
        storeLocalCard(storedCardObj);
    } else {
        var storedCardObj = getLocalCard(currentCardID);
        storedCardObj.body = updatedBody; 
        storeLocalCard(storedCardObj);
    }
}

var getLocalCard = function(currentCardID) {
    return JSON.parse(localStorage.getItem(currentCardID));
}

function deleteCard(event) {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML.prop('dataset').id;
        localStorage.removeItem(cardHTMLId);
        hideContent();
    }
}     

function completeTask(event) {
  $(event.target).closest('.card-container').children('h2, p, .complete-task-btn').toggleClass('strike-out');
}

$('#search-input').on('keyup', searchCards);

function searchCards(e) {
    var searchBarValue = $('#search-input').val().toLowerCase();
    var cardContainer = $('.card-container');
    console.log(cardContainer);
    cardContainer.filter(function (){
        var titleLetters = $(this).children('h2').text().toLowerCase();
        var bodyLetters = $(this).children('p').text().toLowerCase();
        if(titleLetters.indexOf(searchBarValue) != -1 || bodyLetters.indexOf(searchBarValue) != -1) {
            $(this).show();
        }else {
            $(this).hide();
        }
    });
};
