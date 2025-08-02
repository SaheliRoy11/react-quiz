export default function NextButton({dispatch, answer, index, numQuestions}) {
    if (answer === null) return null;//if only the question has been answered then display the next button

    if(index < numQuestions - 1)//if this is not the last question  
        return <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>Next</button>

    if(index === numQuestions - 1)//if this is the last question  
        return <button className="btn btn-ui" onClick={() => dispatch({type: 'finish'})}>Finish</button>
}