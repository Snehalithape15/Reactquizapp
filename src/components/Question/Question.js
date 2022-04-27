import { Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [checkedOption, setChecked] = useState();
  const [checkedPress, setCheckedPress] = useState(false);
  const history = useHistory();





  const handleSelect = (i) => {

    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };
  const handleOptionSelect = (i) => {
    if (checkedOption === i) return "optionSelected"
  }
  const handleCheck = (i) => {
    if (checkedOption) {
      setSelected(i);
      setChecked();
      if (i === correct) setScore(score + 1);
      setError(false);
      setCheckedPress(true)
    }
    else setError("Please select an option first");
  };

  const handleReset = (i) => {
    if (checkedPress) {
      console.log("asdasdasdads0  " + i)
      console.log("asdasdasdads0  " + correct)
      if (selected === correct) setScore(score - 1);
    }
    setCheckedPress(false);
    setChecked();
    setSelected();
    document.getElementById("radioOption").reset()
  }

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
      setCheckedPress(false);
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
    setCheckedPress(false);
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <table >
          <tr>
            <th>{questions[currQues].question}</th>

          </tr>
          {/* <h2>{questions[currQues].question}</h2> */}
          <div className="options">

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form id="radioOption">
              {options &&
                options.map((i) => (
                  <tr>
                    <td>
                      <div className="singleOptionDiv">
                        {/* <button
                          className={`singleOption  ${selected && handleSelect(i)} ${checked && handleOptionSelect(i)}`}
                          key={i}
                          onClick={() => setChecked(i)}
                          disabled={selected}
                        >
                          {i}
                        </button> */}
                        <div className={`singleOption  ${selected && handleSelect(i)} `}>
                          <label>

                            <input

                              type="radio"
                              name="opt"
                              onChange={() => setChecked(i)}
                              disabled={selected}
                            //checked={setChecked(i)}
                            />

                            {i}
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </form>
          </div>
        </table>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{
              width: 185,
              backgroundColor: 'forestgreen'
            }}


            onClick={() => handleCheck(checkedOption)}>Show Answer


          </Button>






          <Button
            variant="contained"
            // color="secondary"
            size="large"
            style={{
              width: 185,
              backgroundColor: 'red'
            }}


            onClick={() => handleReset(checkedOption)}>Reset

          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
