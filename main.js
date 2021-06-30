const projectName = "random-quotes";
let quotesData;

var colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#fb6964",
    "#342224",
    "#472e32",
    "#007aff",
    "#73a857"
];

var currentQuote = "",
    currentAuthor = "";

function getQuotes() {
    return $.ajax( {
        headers: {
            Accept: "application/json"
        },
        url:
        "https://raw.githubusercontent.com/afrizalyogi/random-quote/deployment/quotes.json",
        success: function(jsonQuotes) {
            if ( typeof jsonQuotes === "string" ) {
                quotesData = JSON.parse(jsonQuotes);
                console.log("quotesData");
                console.log(quotesData);
            }
        }
    } );
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor( Math.random() * quotesData.quotes.length )
    ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
    
    $(".quote-text").animate( { opacity: 0 }, 500, function() {
        $(this).animate( { opacity: 1 }, 500 );
        $("#text").text(randomQuote.quote);
    } );

    $(".quote-author").animate( { opacity: 0 }, 500, function() {
        $(this).animate( { opacity: 1 }, 500 );
        $("#author").html(randomQuote.author);
    } );

    var color = Math.floor( Math.random() * colors.length );
    $("html body").animate( {
        backgroundColor: colors[color],
        color: colors[color]
    }, 1000 );
    $(".button").animate( {
        backgroundColor: colors[color]
    }, 1000 );
}

$(document).ready( function() {
    getQuotes().then( () => {
        getQuote();
    } );

    $("#new-quote").on("click", getQuote);
} );
