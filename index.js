$(document).ready(persistData);

var newCard = function(card) {
    $('.bottom-box').prepend(`<div class="card-container" data-id=${card.key}>
        <h2 class="title-of-card" contenteditable="true" onfocusout="changeLocalCard(event)">${card.title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card" contenteditable="true" onfocusout="changeLocalCard(event)">${card.body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality"> quality: <span class="qualityVariable">${card.quality}</span></p>
        <hr>
      </div>`);
    storeLocalCard(card);
    $(".downvote").on('click', changeQualityVariable);
    $(".upvote").on('click', changeQualityVariable);
    $(".delete-button").on('click', deleteCard);
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

var changeQualityVariable = function(event) {
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

var deleteCard = function(event) {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML.prop('dataset').id;
        localStorage.removeItem(cardHTMLId);
    }
}     

//Search Bar//

$('#search-input').on('keyup', searchCards);

function searchCards(e) {
    var searchBarValue = $('#search-input').val().toLowerCase();
    var cardContainer = $('.card-container');
    cardContainer.filter(function (){
        var titleLetters = $(this).children('h2').text().toLowerCase();
        var bodyLetters = $(this).children('p').text().toLowerCase();
        if(titleLetters.indexOf(searchBarValue) != -1 || bodyLetters.indexOf(searchBarValue) != -1) {
            $(this).show();
        }else {
            $(this).hide();
        }
    });

    console.log(cardContainer)
    console.log(searchBarValue);

};
