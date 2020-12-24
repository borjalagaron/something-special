const quizData = [
  {
    question: "Brohss?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "a",
  },
  {
    question: "Q2?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "b",
  },
  {
    question: "Q3?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "d",
  },
  {
    question: "Q4?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "a",
  },
];
const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const quizHeader = document.getElementById("quiz-header");
const questionEl = document.getElementById("question_text");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.getElementById("submit");

const progress_text = document.getElementById("progress_text");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const quiz = quizData[currentQuestion];
  progress_text.innerHTML = currentQuestion + 1 + "/" + quizData.length;
  questionEl.innerHTML = quiz.question;
  a_text.innerHTML = quiz.a;
  b_text.innerHTML = quiz.b;
  c_text.innerHTML = quiz.c;
  d_text.innerHTML = quiz.d;
}

function getSelected() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
      return answer;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answerEl.checked = false;
    }
  });
}
submitBtn.addEventListener("click", () => {
  //check to see the answer
  let myString = JSON.stringify(quizData, null, '\t'); // tab
console.log(myString);
  const answer = getSelected();
  console.log(answer);
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      //TODO: Show results
      quiz.innerHTML = `<h2>Congrats!! You answered correctly   </h2> 
      <button onclick="location.reload()">Reload</button>`;

      console.log(score);
    }
  }
});
