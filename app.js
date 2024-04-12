// Define the Question class
class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}

// Define the Quiz class
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.questionElement = document.getElementById('question');
    this.optionsElement = document.getElementById('options');
    this.nextButton = document.getElementById('next-btn');
    this.nextButton.addEventListener('click', () => this.nextQuestion());
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionElement.innerHTML = `<strong>${currentQuestion.question}</strong>`;
    this.optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('input');
      optionElement.type = 'radio';
      optionElement.name = 'option';
      optionElement.value = option;
      optionElement.id = `option${index}`;
      const labelElement = document.createElement('label');
      labelElement.textContent = option;
      labelElement.setAttribute('for', `option${index}`);
      this.optionsElement.appendChild(optionElement);
      this.optionsElement.appendChild(labelElement);
    });
  }

  checkAnswer(selectedOption) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      this.score++;
    }
  }

  nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      this.checkAnswer(selectedOption.value);
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.displayQuestion();
      } else {
        this.showResult();
      }
    } else {
      alert('Please select an option');
    }
  }

  showResult() {
    const resultMessage = `<strong>Quiz Completed!<strong> Your Score: ${this.score}/${this.questions.length}`;
    this.questionElement.innerHTML = resultMessage;
    this.optionsElement.innerHTML = '';
    this.nextButton.style.display = 'none';
  }
}

// Define the array of questions
const questions = [
  new Question("What is the capital of France?", ["Paris", "London", "Berlin", "Rome"], "Paris"),
  new Question("Which planet is known as the Red Planet?", ["Earth", "Mars", "Venus", "Mercury"], "Mars"),
  new Question("What is the largest mammal?", ["Elephant", "Girrafe", "Blue Whale", "Lion"], "Blue Whale"),
  new Question("What is the tallest mountain in the world?", ["K2", "Mount Everest", "Mount Kangchenjunga", "Mount Dhaulagiri"], "Mount Everest")
  // Add more questions here
];

// Initialize the quiz with the questions array
const quiz = new Quiz(questions);
