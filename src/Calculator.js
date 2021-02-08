import React, { useRef, useState, useEffect } from 'react';
import './calculate.css';

function Calculator() {
  const inputs = useRef(null);
  const calculated = useRef(null);
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (value != 0 && value.charAt(0) === "0" && value.charAt(1) !== ".") {
      setValue(value.substring(1));
    }
    inputs.current.focus();
  }, [value]);

  const keyToValue = (action) => {
    console.log("Calculator.keyToValue", action);

    // Detect Zero in Prefix
    if (action == "0" && value == "0") {
      return;
    }

    // Reset calculator
    if (action === "clear") {
      calculated.current = false;
      setValue("0");
      return;
    }

    if (action === "del") {
      let newValue = value.substring(0, value.length - 1);
      setValue(newValue ? newValue : "0");
      return;
    }

    if (action === "equal") {
      // Total from String
      calculated.current = true;
      var strValue = value.replace(/[^-()\d/*+.]/g, '');
      setValue(eval(strValue).toString());
      return;
    }

    if (action === "percent") {
      // Percent Calculate
      var splited = value.split(/[-+]/);
      let number = value + "*0.01";
      if (splited.length >= 2) {
        let percentNumber = splited[splited.length - 1];
        let beforeNumber = splited[splited.length - 2];
        let percentValue = percentNumber * beforeNumber / 100;

        number = value.substring(0, value.length - percentNumber.length) + percentValue;
      }

      var strValue = number.replace(/[^-()\d/*+.]/g, '');
      setValue((eval(strValue)).toString());
      return;
    }

    if (calculated.current) {
      calculated.current = false;
      if (action === "+" || action === "-" || action === "/" || action === "*") {
        setValue(value + action);
      } else {
        setValue(action);
      }

      return;
    }

    // Fill input
    setValue((value + action).replace(/[^-()\d/*+.]/g, ''));
  }

  return (
    <div className="calcalator-container">
      <table>
        <tbody>
          <tr>
            <td colSpan="4" style={{ padding: 0 }}>
              <input type="text" ref={inputs} value={value} onKeyDown={(e) => keyToValue(e)} onChange={(e) => setValue(e.target.value)} />
            </td>
          </tr>

          <tr>
            <td className="light-gray" onClick={() => keyToValue("clear")}>C</td>
            <td className="light-gray" onClick={() => keyToValue("/")}>&#247;</td>
            <td className="light-gray" onClick={() => keyToValue("*")}>&#215;</td>
            <td className="light-gray" onClick={() => keyToValue("del")}>&#8592;</td>
          </tr>
          <tr>
            <td className="number" onClick={() => keyToValue("7")}>7</td>
            <td className="number" onClick={() => keyToValue("8")}>8</td>
            <td className="number" onClick={() => keyToValue("9")}>9</td>
            <td className="light-gray" onClick={() => keyToValue("-")}>&#8722;</td>
          </tr>

          <tr>
            <td className="number" onClick={() => keyToValue("4")}>4</td>
            <td className="number" onClick={() => keyToValue("5")}>5</td>
            <td className="number" onClick={() => keyToValue("6")}>6</td>
            <td className="light-gray" onClick={() => keyToValue("+")}>&#43;</td>
          </tr>

          <tr>
            <td className="number" onClick={() => keyToValue("1")}>1</td>
            <td className="number" onClick={() => keyToValue("2")}>2</td>
            <td className="number" onClick={() => keyToValue("3")}>3</td>
            <td rowSpan="2" className="orange" onClick={() => keyToValue("equal")}>&#61;</td>
          </tr>

          <tr>
            <td className="light-gray" onClick={() => keyToValue("percent")}>%</td>
            <td className="number" onClick={() => keyToValue("0")}>0</td>
            <td className="light-gray" onClick={() => keyToValue(".")}>.</td>
          </tr>
        </tbody>

      </table>
    </div >
  )
}

export default Calculator;