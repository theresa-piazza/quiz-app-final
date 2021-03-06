// question database
const STORE = [
{
  question: 'Which local New York poet was instrumental in the construction of Fort Greene Park?',

  options: [
    'Walt Whitman', 
    'Marianne Moore', 
    'Edna St. Vincent Millay', 
    'Frank O’Hara',
    ],

  correctAnswer: 'Walt Whitman'
  },

{
  question: 'What are the names of the stone lions outside the New York City Public Library?',

  options: [
    'Honor & Gratitude', 
    'Eloise & Gertrude', 
    'Patience & Fortitude', 
    'Thomas & Reginald',
    ],
  correctAnswer: 'Patience & Fortitude'
},

{ 
  question: 'What is the reason behind the name of the Brooklyn neighborhood, Sheepshead Bay?',

  options: [
    'Sheep were once grazed on farmland in the area', 
    'Sheep escaped a barn that caught on fire and drowned in the bay', 
    '“Sheepshead” is a type of fish found in the bay', 
    'It was named for a kind of fuzzy woolen hat often worn by locals'
    ],
  correctAnswer: '“Sheepshead” is a type of fish found in the bay'
},
{
  question: 'New York City’s first official bike lane was built in 1894. Where was it located?',

  options: [
    'In Riverside Park, along the West Side of Manhattan', 
    'Along Ocean Parkway, from Prospect Park to Coney Island', 
    'The paved loop running through Central Park', 
    'The bike path that runs alongside Jamaica Bay in Queens'
    ],
  correctAnswer: 'Along Ocean Parkway, from Prospect Park to Coney Island'
},

{
  question: 'Who spearheaded the effort to save Grand Central Terminal, when it was on the cusp of being torn down and replaced by an office building?',

  options: [
    'Jane Jacobs', 
    'Billy Joel', 
    'Jacqueline Kennedy Onassis', 
    'Andy Warhol'
    ],
  correctAnswer: 'Jacqueline Kennedy Onassis'
}
];


/* variables to store the quiz score and question number information */
let score = 0;
let questionCounter = 0;


// to display the question
function renderAQuestion() {
$('.question-and-score').removeClass('hidden');
$('.js-start-button').hide();
$('.js-quiz').show();
$('.js-quiz').html(questionHtml);
}

function questionHtml () {
  return `<form id="questions">
          <fieldset>
          <div class="questionHere">
          ${STORE[questionCounter].question}
          </div><div class="submitHere">
          ${renderOptions()}
          <button type="submit" id="answer" class="submit-button">Submit</button></div>
          </fieldset>
          </form>`;
}

function renderOptions () {
  let options = "";
  let answers = STORE[questionCounter].options;

  for (let i = 0; i < answers.length; i++) {
    options += `
    <div class="optionsHere">
    <input required type="radio" class="selection" name="selection" id="options${i}" value="${STORE[questionCounter].options[i]}"></>
    <label for="options${i}">
     ${STORE[questionCounter].options[i]}
     </label>
    </div>`;
    
  }
  console.log("renderOptions ran");
  return options;
}


// click start button to begin quiz
function handleStartClick ( ) {
$('.js-start-button').on('click', function (event) {
  console.log("handleStartClick ran");
  $('.js-quiz').html(renderAQuestion);
  updateQuestionAndScore();
});
}


  
// clicking an answer, shows correct or incorrect, offers correct answer
function answerQuestions () {
$('.js-quiz').on('click', '#answer', function (event) {
  event.preventDefault();
  
  $('.response').show();
  console.log('answerQuestion ran')
  

  let realResponse = $('input:checked').val();
  console.log(realResponse);

  if( realResponse === undefined ){
    $( '.errorMessage').append( '<p> Please select an option! </p> ')
  }
  else{
    $( '.errorMessage').empty();
    let correct = STORE[questionCounter].correctAnswer;
    console.log(correct);

      if (realResponse === correct) {
      $('.js-quiz').html(correctAnswer);
      score ++;
      updateQuestionAndScore();
      console.log("this is the correct answer")
    
    } else {
      $('.js-quiz').html(wrongAnswer);
      console.log("wrong answer")
      $('.response').show();
    } 
  }
  
  }); 

};


// updates what number question of the quiz you're on
function updateQuestionAndScore() {
  const questionAndScore = 
$(`<ul>
      <li class="answered">Question: ${questionCounter + 1}/${STORE.length}</li>
      <li id="js-score">Score: ${score}/${STORE.length}</li>
    </ul>`);
  $(".question-and-score").html(questionAndScore);
  return questionAndScore;
};

function finalResult () {
$('#next-question').hide();
$('.js-quiz').hide();
$('.finalMessage').html(endOfQuiz);
$('.finalMessage').show();
};

function endOfQuiz () { 
return $(`<div class="finalScreen">
          <h2>You have completed the quiz!</h2> <p>Your score was ${score} out of ${questionCounter}<br><br>
          Want to try again? 
          <button type="submit" id="restart" class="submit-button">restart the quiz!</button> </p></div>`);
};


function restartQuiz () {
$('.finalMessage').on('click', '#restart', function (event) {
  event.preventDefault();
  console.log('restartQuiz ran')
  questionCounter = 0;
  score = 0;
  updateQuestionAndScore();
  $('.js-quiz').html(renderAQuestion);
  $('.finalMessage').hide();
 
});  
};



function nextQuestion () {
  $('.js-quiz').on('click', '#next-question', function (event) {
  event.preventDefault();
   console.log('nextQuestion() ran');
   questionCounter ++;
   if( questionCounter >= STORE.length ){
     finalResult().show;
     
    
   }
   else{
     updateQuestionAndScore();
     $('.js-quiz').html(renderAQuestion);
   }
  
});
}


function correctAnswer () {
  return `<div class="responseHere">
            <h2>Your answer is correct! </h2>
            <p>Congratulations!</p>
            <button type="button" id="next-question" class="next-button"> 
              Next Question, Please!
            </button>
          </div>`;  
  
}

function wrongAnswer () {
  return `<div class="responseHere">
            <h2>Your response is incorrect. </h2>
            <p>The answer is: ${STORE[questionCounter].correctAnswer}</p>
            <button type="button" id="next-question" class="next-button"> 
              Next Question, Please!
            </button>
          </div>`;

}



function init(){
  handleStartClick(); 
  answerQuestions();
  nextQuestion();
  restartQuiz();
}

$(init);

