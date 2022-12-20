// Global Variables
var quiz = [
    {
        "question": "Commonly used data types DO NOT include:", 
        "choice": ["strings", "booleans", "alerts", "numbers"],
        "answer": 2,
    },
    {
        "question": "The condition in an if / else statement us enclosed within ____.", 
        "choice": ["quotes", "curly braces", "parentheses", "square brackets"],
        "answer": 2,
    },
    {
        "question": "Arrays in JavaScript can be used to store ____.", 
        "choice": ["numbers and strings", "other arrays", "booleans", "all of the above"],
        "answer": 3,
    },
    {
        "question": "String values must be enclosed within ____ when being assigned to variables.", 
        "choice": ["commas", "curly braces", "quotes", "parentheses"],
        "answer": 2,
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is:", 
        "choice": ["JavaScript", "terminal / bash", "for loops", "console log"],
        "answer": 3,
    },
];
var counter = 60;
var i = 0;
var score = 0;
var interval = "";

/* Timer 
 * * Displays a countdown timer based on 'counter' global variable
 */
function timer() {
    interval = setInterval(function() {
        counter--;
        // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
            clearInterval(interval);
            $('#time').html("Times Up!");
            endQuiz();
            return;
        } else {
            $('#time').text(counter);
        }
    }, 1000);
}

/* showQuestion
 * * Renders question from an array of objects
 * @number - Which question to show
 */
function showQuestion(number) {
    $("#quiz-form").show();
    $("#question").html(quiz[i].question);
    $("#button0").html("1. " + quiz[i].choice[0]);
    $("#button1").html("2. " + quiz[i].choice[1]);
    $("#button2").html("3. " + quiz[i].choice[2]);
    $("#button3").html("4. " + quiz[i].choice[3]);
}

$(function() {
    let startButton = $("#start-button");
    startButton.on("click", function() {
        // Start timer
        timer();

        // Hide #intro
        $("#intro").hide();

        // Show questions
        showQuestion(i);
    });

    // Handle answers
    $(".choice").on("click", function(event) {
        if ($(this).data("val") === quiz[i].answer) {
            $("#result").html("Correct!");
            score++;
        } else {
            $("#result").html("Wrong!");
            counter -= 10;
        }
        $(this).blur();
        i++;
        if (i >= quiz.length) {
            // End quiz
            clearInterval(interval);
            endQuiz();
        } else {
            showQuestion(i);
        }
        return false;
    });

    $("#store-initials").on("click", function(){
        let initials = $("#initials").val();
        storeScore(initials, score);
        $("#end-quiz").hide();
        showScores();
    });

    $("#try-again").on("click", function() {
        location.reload();
    })
});

function endQuiz() {
    $("#quiz-form").hide();
    $("#end-quiz").show();
    $("#final-score").html(score);
}

// Stores the objects as an array
function getScores() {
    return JSON.parse(localStorage.getItem("scores"));
}

// Stores scores in Local Storage
function storeScore(initials,thisScore) {
    let scores = getScores();
    let lastScore = [{"initials": initials, "score": thisScore}];
    if (scores == null) { 
        localStorage.setItem("scores", JSON.stringify(lastScore));
    } else {
        let allScores = lastScore.concat(scores);
        localStorage.setItem("scores", JSON.stringify(allScores));
    }
}

// Displays Score in #high-score-list
function showScores() {
    $("#high-scores").show();
    $("#end-quiz").hide();
    $("#quiz-form").hide();
    let scores = getScores();
    scores.sort(compare);
    $("#high-score-list").html("<tr><th></th><th>Initials</th><th>Score</th></tr>");
    for (j = 0; j < scores.length; j++) {
        $("#high-score-list").append("<tr><td>" + (j+1) + ". </td><td>" + scores[j].initials + "</td><td>" + scores[j].score + "</td></tr>");
    }
    return false;
}


// Sort High Scores
function compare(a,b) {
    if (a.score < b.score){
      return 1;
    }
    if (a.score > b.score){
      return -1;
    }
    return 0;
  }
