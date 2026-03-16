import { useState } from "react"
import { questions } from "./questions"
import "./index.css"

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQuestion]

  function nextQuestion() {
    if (selectedAnswer === null) return

    // Verifica se a resposta está correta e atualiza o score
    const isCorrect = selectedAnswer === question.answer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    // Avança para a próxima ou finaliza
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setFinished(true)
    }
  }

  function getRank() {
    const percent = (score / questions.length) * 100

    if (percent <= 25) return "Junior"
    if (percent <= 50) return "Pleno"
    if (percent <= 80) return "Senior"
    return "Archmage do Código"
  }

  function resetQuiz() {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="app">
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
        <div className="grid-overlay"></div>

        <div className="quiz-panel result-panel">
          <h1>Resultado Final</h1>
          <h2>
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong>
          </h2>
          <h3>Seu rank: {getRank()}</h3>

          <button className="next-button" onClick={resetQuiz}>
            Fazer Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="grid-overlay"></div>

      <div className="quiz-panel">
        <h1>Quiz da Tecnologia</h1>

        <p className="question-count">
          Pergunta <strong>{currentQuestion + 1}</strong> de {questions.length}
        </p>

        <h2>{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={
                selectedAnswer === index ? "option selected" : "option"
              }
              onClick={() => setSelectedAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
        </button>
      </div>
    </div>
  )
}