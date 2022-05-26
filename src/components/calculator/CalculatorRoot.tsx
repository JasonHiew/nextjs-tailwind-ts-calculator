/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';

import CalculatorDisplay from '@/components/calculator/CalculatorDisplay';
import CalculatorKeys from '@/components/calculator/CalculatorKeys';

//reference guide. it's in javascript but i'm converting it to typescript + react
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98
const CalculatorRoot: React.FC = () => {
  const [display, setDisplay] = React.useState<string | null | undefined>('0');
  const [previousKeyType, setPreviousKeyType] = React.useState<
    string | null | undefined
  >('');
  const [firstValue, setFirstValue] = React.useState<string | null | undefined>(
    ''
  );
  const [operator, setOperator] = React.useState<string | null | undefined>('');
  const [modValue, setModValue] = React.useState<string | null | undefined>('');
  const [clearMode, setClearMode] = React.useState<string | null | undefined>(
    'AC'
  );
  const displayBoxRef = React.useRef<HTMLDivElement>(null);

  const calculate = (
    n1: string | null | undefined,
    op: string | null | undefined,
    n2: string | null | undefined
  ) => {
    const firstNum = parseFloat(n1 || '');
    const secondNum = parseFloat(n2 || '');
    if (op === 'add') {
      return firstNum + secondNum;
    }

    if (op === 'subtract') {
      return firstNum - secondNum;
    }

    if (op === 'multiply') {
      return firstNum * secondNum;
    }

    if (op === 'divide') {
      return firstNum / secondNum;
    }
  };

  const resetStates = (): void => {
    setFirstValue('');
    setModValue('');
    setOperator('');
    setPreviousKeyType('');
    // setDisplay('0');
  };

  const getKeyType = (key: any): string | null | undefined => {
    const { action } = key.dataset;
    if (!action) return 'number';
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    )
      return 'operator';
    return action;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches('button')) {
      const key = e.currentTarget;
      const action = key.dataset.action;
      const keyContent = key.textContent; //innerText vs textContent: https://stackoverflow.com/questions/12093774/what-is-the-difference-between-innertext-and-textcontent
      const displayedNum = displayBoxRef.current?.textContent;

      const addToggledButtonStyling = (): void => {
        // button styling for operator buttons when clicked
        key.classList.add('scale-90');
        Array.from(key.parentNode.children).forEach((k) =>
          k.classList.remove('hover:scale-95')
        );
      };

      const removeToggledButtonStyling = (): void => {
        // button styling for operator buttons when clicked
        key.classList.add('hover:scale-95');
        Array.from(key.parentNode.children).forEach((k) => {
          k.classList.remove('scale-90');
        });
      };

      // User presses operator key
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        setPreviousKeyType('operator');
        setFirstValue(displayedNum);
        setOperator(action);

        const firstVal = firstValue;
        const op = operator;
        const secondVal = displayedNum;

        if (
          firstVal &&
          op &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstVal, op, secondVal);
          setFirstValue(calcValue);
          setDisplay(calcValue);
        } else {
          setFirstValue(displayedNum);
        }

        addToggledButtonStyling();
        console.log('operator key!');
      }

      if (action === 'decimal') {
        if (!displayedNum?.includes('.')) {
          setDisplay(displayedNum + '.');
        } else if (
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          setDisplay('0.');
        }
        setPreviousKeyType('decimal');
        // removeToggledButtonStyling();
      }

      if (action !== 'clear') {
        setClearMode('CE');
      }

      if (action === 'clear') {
        if (clearMode === 'AC') {
          resetStates();
          setPreviousKeyType('clear');
        } else {
          setDisplay('0');
          setClearMode('AC');
        }
        removeToggledButtonStyling();
        setPreviousKeyType('clear');
      }

      if (action === 'calculate') {
        let firstVal = firstValue;
        const op = operator;
        let secondVal = displayedNum;

        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstVal = displayedNum;
            secondVal = modValue;

            setFirstValue(displayedNum);
          }

          setDisplay(calculate(firstVal, op, secondVal));
        }

        setModValue(secondVal);
        setPreviousKeyType('calculate');
      }

      if (!action) {
        if (
          displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          setDisplay(keyContent);
        } else {
          setDisplay(displayedNum! + keyContent); //in TypeScript, adding ! to the end of a variable means that it's not null or undefined
        }
        setPreviousKeyType('number');

        removeToggledButtonStyling();
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
      <CalculatorKeys handleClick={handleClick} clearMode={clearMode} />
    </>
  );
};

export default CalculatorRoot;
