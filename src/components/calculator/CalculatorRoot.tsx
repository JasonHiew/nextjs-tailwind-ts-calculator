import * as React from 'react';

import CalculatorDisplay from '@/components/calculator/CalculatorDisplay';
import CalculatorKeys from '@/components/calculator/CalculatorKeys';

//reference guide. it's in javascript but i'm converting it to typescript + react
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98
const CalculatorRoot: React.FC = () => {
  const [display, setDisplay] = React.useState<string>('0');
  const [previousKeyType, setPreviousKeyType] = React.useState<string>('');
  const [firstValue, setFirstValue] = React.useState<string>('');
  const [operator, setOperator] = React.useState<string>('');
  const displayBoxRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches('button')) {
      const key = e.currentTarget;
      const action = key.dataset.action;
      const keyContent = key.textContent; //innerText vs textContent: https://stackoverflow.com/questions/12093774/what-is-the-difference-between-innertext-and-textcontent
      const displayedNum = displayBoxRef.current?.textContent;

      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        setPreviousKeyType('operator');
        setFirstValue(displayedNum);
        setOperator(action);
        console.log('operator key!');
      }

      if (action === 'decimal') {
        setDisplay(displayedNum + '.');
      }

      if (action === 'clear') {
        setPreviousKeyType('');
        setFirstValue('');
        setOperator('');
        setDisplay('0');
      }

      const calculate = (n1: string, op: string, n2: string) => {
        let result = 0;

        if (op === 'add') {
          result = parseFloat(n1) + parseFloat(n2);
        } else if (op === 'subtract') {
          result = parseFloat(n1) - parseFloat(n2);
        } else if (op === 'multiply') {
          result = parseFloat(n1) * parseFloat(n2);
        } else if (op === 'divide') {
          result = parseFloat(n1) / parseFloat(n2);
        }

        return result.toString();
      };

      if (action === 'calculate') {
        console.log(firstValue, operator, displayedNum);
        const result = calculate(firstValue, operator, displayedNum);

        setDisplay(result);
      }

      if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
          //if the current displayedNum is 0 or previousKeyType is operator, then replace the displayedNum to the keyContent
          // displayBoxRef.current.textContent = keyContent; //useRef way
          setDisplay(keyContent); //useState way
        } else {
          //if the displayedNum is not 0 and the previousKeyType is not operator, then append the keyContent to the displayedNum
          // displayBoxRef.current.textContent = displayedNum + keyContent; //useRef way
          setDisplay(displayedNum + keyContent); //useState way
        }
        setPreviousKeyType('number');
      }

      // console.log(`Key: ${key}`);
      console.log('previousKeyType: ' + previousKeyType);
      console.log('displayedNum: ' + displayedNum);
      console.log('firstValue: ' + firstValue);
      console.log('operator: ' + operator);
      console.log(`Action: ${action}`);
      console.log(`keyContent: ${keyContent}`);
      console.log(`display: ${display}`);
      console.log(``);
    } else {
      console.log('not a button');
    }
  };

  React.useEffect(() => {
    console.log('displayBoxRef..', display);
  }, [display]);

  React.useEffect(() => {
    console.log('operator..', operator);
  }, [operator]);

  return (
    <>
      <CalculatorDisplay ref={displayBoxRef} display={display}>
        0
      </CalculatorDisplay>
      <CalculatorKeys handleClick={handleClick} />
    </>
  );
};

export default CalculatorRoot;
