// global variables //
var title = $('#title-input').val();
var body = $('#task-input').val();
var numCards = 0;
var qualityVariable = "swill";

// New card's inner html //
var newCard = function(id , title , body , quality) {
    return '<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};

// A constructor object to populate new cards //
function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#task-input').val(),
        quality: qualityVariable
    };
}

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

function enableSave(event) {
  var saveBtn = $('.save-btn')
  if ($('#title-input').val().length > 0 && $('#task-input').val().length > 0) {
       saveBtn.prop('disabled', false);
  }
}
function save(event) {
  event.preventDefault();
  numCards++;
  $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#task-input').val(), qualityVariable)); 
  localStoreCard();
  $('form')[0].reset();
  $('.save-btn').prop('disabled', true);
}

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

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
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


  






