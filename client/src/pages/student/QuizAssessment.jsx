import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Target,
} from "lucide-react";
import "./QuizAssessment.css";

function QuizAssessment({ quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return null;
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const score = questions.reduce((total, question) => {
    return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);
  const passMark = quiz.passMark ?? 70;
  const passed = percentage >= passMark;

  function selectAnswer(optionIndex) {
    if (submitted) return;

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: optionIndex,
    }));
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((currentIndex) =>
      Math.max(0, currentIndex - 1)
    );
  }

  function goToNextQuestion() {
    setCurrentQuestionIndex((currentIndex) =>
      Math.min(totalQuestions - 1, currentIndex + 1)
    );
  }

  function handleSubmit() {
    if (answeredCount !== totalQuestions) return;
    setSubmitted(true);
  }

  function handleRetry() {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
  }

  return (
    <section className="quiz-assessment" id="knowledge-quiz">
      <div className="quiz-heading">
        <div className="quiz-heading-icon">
          <ClipboardCheck size={25} />
        </div>

        <div>
          <p className="quiz-eyebrow">KNOWLEDGE ASSESSMENT</p>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
      </div>

      {!submitted ? (
        <article className="quiz-card">
          <div className="quiz-topline">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>

            <span>
              {answeredCount}/{totalQuestions} answered
            </span>
          </div>

          <div
            className="quiz-progress"
            role="progressbar"
            aria-label="Quiz questions progress"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={currentQuestionIndex + 1}
          >
            <div
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            />
          </div>

          <div className="quiz-question-content">
            <h3>{currentQuestion.question}</h3>

            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => {
                const selected = answers[currentQuestion.id] === index;

                return (
                  <button
                    type="button"
                    key={`${currentQuestion.id}-${index}`}
                    className={`quiz-option${selected ? " selected" : ""}`}
                    onClick={() => selectAnswer(index)}
                    aria-pressed={selected}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="quiz-option-text">{option}</span>

                    {selected && (
                      <CheckCircle2
                        className="quiz-option-check"
                        size={19}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-navigation">
            <button
              type="button"
              className="quiz-secondary-button"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft size={17} />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                className="quiz-primary-button"
                onClick={handleSubmit}
                disabled={answeredCount !== totalQuestions}
              >
                Submit Quiz
                <CheckCircle2 size={17} />
              </button>
            ) : (
              <button
                type="button"
                className="quiz-primary-button"
                onClick={goToNextQuestion}
              >
                Next Question
                <ArrowRight size={17} />
              </button>
            )}
          </div>

          {answeredCount !== totalQuestions && isLastQuestion && (
            <p className="quiz-helper-text">
              Answer all {totalQuestions} questions to submit. You have{" "}
              {totalQuestions - answeredCount} unanswered.
            </p>
          )}
        </article>
      ) : (
        <article className="quiz-results-card">
          <div className={`quiz-result-icon${passed ? " passed" : " failed"}`}>
            {passed ? (
              <CheckCircle2 size={36} />
            ) : (
              <Target size={36} />
            )}
          </div>

          <p className="quiz-eyebrow">YOUR RESULTS</p>

          <h3>{passed ? "Well done! You passed." : "Keep learning and try again."}</h3>

          <p className="quiz-result-description">
            {passed
              ? "You have reached the required pass mark for this assessment."
              : "Review the explanations below, then retry the quiz to improve your result."}
          </p>

          <div className="quiz-score-summary">
            <div className="quiz-score-circle">
              <strong>{percentage}%</strong>
              <span>Score</span>
            </div>

            <div className="quiz-score-details">
              <div>
                <span>Correct answers</span>
                <strong>
                  {score}/{totalQuestions}
                </strong>
              </div>

              <div>
                <span>Pass mark</span>
                <strong>{passMark}%</strong>
              </div>

              <div>
                <span>Result</span>
                <strong className={passed ? "quiz-pass-text" : "quiz-fail-text"}>
                  {passed ? "Passed" : "Not passed"}
                </strong>
              </div>
            </div>
          </div>

          <div className="quiz-review">
            <h4>Review your answers</h4>

            {questions.map((question, index) => {
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;

              return (
                <div
                  className={`quiz-review-item${isCorrect ? " correct" : " incorrect"}`}
                  key={question.id}
                >
                  <div className="quiz-review-question">
                    <span className="quiz-review-number">
                      {index + 1}
                    </span>

                    <div>
                      <h5>{question.question}</h5>
                      <span className={isCorrect ? "quiz-pass-text" : "quiz-fail-text"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                  </div>

                  <p>
                    <strong>Your answer:</strong>{" "}
                    {selectedAnswer === undefined
                      ? "Not answered"
                      : question.options[selectedAnswer]}
                  </p>

                  {!isCorrect && (
                    <p>
                      <strong>Correct answer:</strong>{" "}
                      {question.options[question.correctAnswer]}
                    </p>
                  )}

                  <p className="quiz-explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="quiz-primary-button quiz-retry-button"
            onClick={handleRetry}
          >
            <RotateCcw size={17} />
            Retry Quiz
          </button>
        </article>
      )}
    </section>
  );
}

export default QuizAssessment;
