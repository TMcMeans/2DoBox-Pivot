
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
  this.quality = 'swill'
}

<<<<<<< HEAD
//Pull from Local Storage//

for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    numCards++;
    $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
}

// stringifies and sets cards in localStorage // 

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

//Save Functions//
=======
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

// save button event listener //
$('.save-btn').prop('disabled', true)
$('#title-input').on('keyup', enableSave)
$('#task-input').on('keyup', enableSave)

>>>>>>> db004cb365eaf78ed530d5163e750efe79d4a1e6

function enableSave(event) {
  var saveBtn = $('.save-btn')
  if ($('#title-input').val().length > 0 && $('#task-input').val().length > 0) {
       saveBtn.prop('disabled', false);
  }
}

<<<<<<< HEAD
// save button event listener //
$('.save-btn').prop('disabled', true)
$('#title-input').on('keyup', enableSave)
$('#task-input').on('keyup', enableSave)
$('.save-btn').on('click', save)

// deletes cards on click //
var deleteCard = function() {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
}

// bottom container event listener //
=======
>>>>>>> db004cb365eaf78ed530d5163e750efe79d4a1e6


var changeQualityVariable = function(event) {
    var possibleQualities = ['swill', 'plausible', 'genius'];
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
<<<<<<< HEAD
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
    deleteCard();
});

//Search Bar//

$('#search-input').on('keyup', searchCards);

function searchCards(e) {
    var searchBarValue = $('#search-input').val().toLowerCase();
    var cardContainer = $('.card-container')
    cardContainer.filter(index) {
        var titleLetters = $(this).children('h2').text().toLowerCase;
        var bodyLetters = $(this).children('p').text().toLowerCase;
        if(titleLetters === searchBarValue || bodyLetters === searchBarValue) {
            
        }

    }
    console.log(searchBarValue);
    console.log(textSearch);
};


  






=======
}

var getLocalCard = function(currentCardID) {
    return JSON.parse(localStorage.getItem(currentCardID));
}

var deleteCard = function() {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
       // TASK//// MAKE SURE ITEM IS DELETED FROM LOCAL STORAGE ///
        // localStorage.removeItem(cardHTMLId);
    }
}     
>>>>>>> db004cb365eaf78ed530d5163e750efe79d4a1e6
