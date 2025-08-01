export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;//store if a question has already been answered

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
            ${
              //class for selected answer by user
              index === answer ? "answer" : ""
            } 
            
            ${
              //class for correct and wrong answer if answer has been selected already
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}

          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}//once an option has been clicked the question has been answered, so don't allow the user to select any option again
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
