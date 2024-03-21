const Question = ({ question, onSelectAnswer }) => (
    <div>
      <h2>{question.title}</h2>
      <ul>
        {question.answers.map(answer => (
          <li key={answer.id} onClick={() => onSelectAnswer(answer.id)}>
            {answer.text}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default Question;