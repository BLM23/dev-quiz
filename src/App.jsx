import { useState } from "react";
import { questions } from "./questions";
import "./index.css";

// 1. MOVA O BACKGROUND PARA FORA PARA EVITAR ERROS DE RE-RENDER
const Background = ({ children }) => (
  <div className="app">
    <div className="bg-glow glow-1"></div>
    <div className="bg-glow glow-2"></div>
    <div className="grid-overlay"></div>
    {children}
  </div>
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Verificação de segurança: se o array de perguntas não existir ou estiver vazio
  if (!questions || questions.length === 0) {
    return <Background><h1>Erro ao carregar perguntas</h1></Background>;
  }

  const question = questions[currentQuestion];

  function handleNext() {
    if (selectedAnswer === null) return;

    if (selectedAnswer === question.answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  }

  function getRank() {
    const percent = (score / questions.length) * 100;
    if (percent <= 25) return "Junior";
    if (percent <= 50) return "Pleno";
    if (percent <= 80) return "Senior";
    return "Archmage do Código";
  }

  function resetQuiz() {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  // --- TELA 1: INICIAL ---
  if (!started) {
    return (
      <Background>
        <div className="quiz-panel result-panel">
          <h1>Quiz da Tecnologia</h1>
          <p className="question-count">Desafio de Conhecimentos Gerais</p>
          <h2 style={{ marginBottom: "30px" }}>Pronto para descobrir seu Rank?</h2>
          <button className="next-button" onClick={() => setStarted(true)}>
            Iniciar Jornada
          </button>
        </div>
      </Background>
    );
  }

  // --- TELA 2: RESULTADO ---
  if (finished) {
    return (
      <Background>
        <div className="quiz-panel result-panel">
          <h1>Resultado Final</h1>
          <h2 style={{ color: "var(--cyan)", fontSize: "3rem" }}>{score} / {questions.length}</h2>
          <p>Seu nível atual:</p>
          <h3 style={{ fontSize: "2rem", marginBottom: "30px" }}>{getRank()}</h3>
          <button className="next-button" onClick={resetQuiz}>
            Voltar ao Início
          </button>
        </div>
      </Background>
    );
  }

  // --- TELA 3: O QUIZ ---
  return (
    <Background>
      <div className="quiz-panel">
        <header>
          <h1>Tecnologia</h1>
          <p className="question-count">
            Pergunta <strong>{currentQuestion + 1}</strong> de {questions.length}
          </p>
        </header>

        <h2>{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedAnswer === index ? "selected" : ""}`}
              onClick={() => setSelectedAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima Pergunta"}
        </button>
      </div>
    </Background>
  );
}