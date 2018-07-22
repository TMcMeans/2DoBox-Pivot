var title = $('#title-input').val();
var body = $('#task-input').val();
var numCards = 0;
var qualityVariable = "swill";

var newCard = function(id , title , body , quality) {
    return '<div id="' + id + '"class="card-container"><h2 class="title-of-card" onfocusout="changeLocalTitle()" contenteditable="true">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card" onfocusout="changeLocalBody()" contenteditable="true">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>';
};

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#task-input').val(),
        quality: qualityVariable
    };
}

//////// Fix persistence issue //////////// 
// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

// save button event listener //
$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('#title-input').val() === "" || $('#task-input').val() === "") {
       return false;
    };  
    numCards++;
    $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#task-input').val(), qualityVariable)); 
    localStoreCard();
    $('form')[0].reset();
});

///// Figure out why getlocalcard is UNDEFINED and make localStorage editing work ///// 
var getlocalCard = function(event) {
    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);
    changeLocalQuality(cardObjectInJS, cardHTMLId);
    changeLocalTitle(cardObjectInJS, cardHTMLId);
    changeLocalBody(cardObjectInJS, cardHTMLId);
}

var changeLocalQuality = function(object, key) {
    object.quality = qualityVariable;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(key, newCardJSON);
}

var changeLocalTitle = function(object, key, event) {
    object.title = event.target.innerText;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(key, newCardJSON);
}

var changeLocalBody = function(object, key, event) {
    object.body = event.target.innerText;
    var newCardJSON = JSON.stringify(object);
    localStorage.setItem(key, newCardJSON);
}

var changeQualityVariable = function() {
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;
        switch (event.target.className === "upvote" || event.target.className === "downvote") {
            case (event.target.className === "upvote" && currentQuality === "plausible"): 
                qualityVariable = "genius";
                $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
                break;
            case (event.target.className === "upvote" && currentQuality === "swill"): 
                qualityVariable = "plausible";
                $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
                break;
            case (event.target.className === "downvote" && currentQuality === "plausible"):
                qualityVariable = "swill"
                $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
                break;
            case (event.target.className === "downvote" && currentQuality === "genius"):
                qualityVariable = "plausible"
                $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
                break;
            case (event.target.className === "downvote" && currentQuality === "swill"):
                qualityVariable = "swill";
                break;
            case (event.target.className === "upvote" && currentQuality === "genius"): 
                qualityVariable = "genius";
                break;
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
    changeQualityVariable();
    getLocalCard(event);
    deleteCard();
});      
  






