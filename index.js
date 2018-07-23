var title = $('#title-input').val();
var body = $('#task-input').val();
var numCards = 0;
var qualityVariable = "swill";

var newCard = function(id , title , body , quality) {
    return '<div id="' + id + '"class="card-container"><h2 class="title-of-card" onfocusout="getLocalCard(event, id)" contenteditable="true">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card" onfocusout="getLocalCard(event, id)" contenteditable="true">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};

// function cardObject() {
//     return {
//         title: $('#title-input').val(),
//         body: $('#task-input').val(),
//         quality: qualityVariable
//     };
// }
function Card(title, body, key) {
  this.title = title;
  this.body = body;
  this.key = Date.now();
}

for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var cardData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    numCards++;
    $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
}

var storeLocalCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#task-input').val() === "") {
       return false;
    };  
    numCards++;
    storeLocalCard();
    $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#task-input').val(), qualityVariable)); 
    $('form')[0].reset();
});

var getLocalCard = function(event, key) {
    var cardHTML = $(event.target).closest('.card-container');
    var key = cardHTML.id;
    console.log(cardHTML);
    var cardObjectInJSON = localStorage.getItem(key);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);
    changeLocalQuality(cardObjectInJS, key);
    changeLocalTitle(event, key);
}



var changeLocalQuality = function(object, key) {
    // object.quality = qualityVariable;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(key, newCardJSON);
}

var changeLocalTitle = function(object, key) {
    // console.log(object);
    object.title = object.target.innerText;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(key, newCardJSON);
}

var changeLocalBody = function(object, key) {
    object.body = object.target.innerText;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(object.key, newCardJSON);
}

var changeQualityVariable = function(event) {
    var possibleQualities = ['swill', 'plausible', 'genius'];
    var currentQuality = $(event.target).siblings('.quality').children().text();
    var qualityVariable;
    for (var i = 0; i < possibleQualities.length; i++) {
        if ((currentQuality === possibleQualities[i]) && ($(event.target).hasClass('upvote'))) {
            $(event.target).siblings('.quality').children().text(possibleQualities[i + 1]);
        } else if (currentQuality === possibleQualities[i]) {
             $(event.target).siblings('.quality').children().text(possibleQualities[i - 1]);
        }
    }  
};

var deleteCard = function() {
    if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
}

$(".bottom-box").on('click', function(event) {
    // changeQualityVariable();
    // getLocalCard(event);
    // deleteCard();
});      
  
$(".downvote").on('click', changeQualityVariable);
$(".upvote").on('click', changeQualityVariable);
$(".delete-button").on('click', deleteCard);




