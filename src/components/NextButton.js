export default function NextButton({dispatch, answer}) {
    if (answer === null) return null;//if only the question has been answered then display the next button

    return <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>Next</button>
}