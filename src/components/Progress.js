export default function Progress({ index, numQuestions, points, maxPossiblePoints,
  answer }) {

  return (
    <header className="progress">
      <progress //input element
        max={numQuestions} 
        value={index + Number(answer !== null)}//detect if the user has clicked on any of the given options and if so, then move the value forward.If there is no answer then the expression evaluates to false and Number() converts it to 0.And if there is an answer then the expression evaluates to true, and hence it's numerical value is 1, thus adding it to index and forwarding the progress bar, denoting that the question has been answered.
      />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}
