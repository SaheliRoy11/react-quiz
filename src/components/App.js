import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  //to tell the user the status of our app at the moment, in the beginning the app will be in the loading state. The app can be in any of the following statuses, those are 'loading', 'error', 'ready' (once data has arrived), 'active' (quiz is running), 'finished' (quiz completed).
  status: "loading",
  index: 0, //keeps track of currently displayed question
  answer: null, //stores the answer selected by the user, initially no answer is selected so the value is null, then when the user selects the option for answering the question, the state is updated.It stores the index of the answer in options.
  points: 0, //store total points user scored while playing the quiz
  highscore: 0 //store highest score of the user
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.index]; //current question

      return {
        //notice that here we are not updating the status because our app is still in 'active' status as the quiz is running.The newAnswer case is to update the state,thus to re-render the component and reflect the necessary changes to show whether the chosen answer by the user is correct or not, and depending on that there are certain changes on points, color of options and next button.
        ...state,

        answer: action.payload, //store the index of chosen option.

        //update the points when a question has been answered, hence doing it inside this case itself
        points:
          //check if the answered option's index is same as the correctOption of the question, if so it means the answer is correct then update points by adding the points of the question, otherwise keep it the same as it means the answer was wrong
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {...state, status: "finished", 
        highscore: state.points > state.highscore ? state.points : state.highscore
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  //fetch data from API
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer} //prop drilling, the Options component will need this to reflect color of options, depending on the correct and wrong answer
            />

            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
          </>
        )}
        {
          status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />
        }
      </Main>
    </div>
  );
}
