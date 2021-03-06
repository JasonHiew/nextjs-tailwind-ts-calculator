/* eslint-disable no-console */
import * as React from 'react';

import styles from './Calculator.module.css';

import Button from '@/components/buttons/Button';
import CalculatorDisplay from '@/components/calculator/CalculatorDisplay';
import CalculatorKeys from '@/components/calculator/CalculatorKeys';

//reference guide. it's in javascript but i'm converting it to typescript + react
//https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98
const CalculatorRoot: React.FC = () => {
  const [display, setDisplay] = React.useState<string>('0');
  const [previousKeyType, setPreviousKeyType] = React.useState<string>('');
  const [firstValue, setFirstValue] = React.useState<string>('');
  const [operator, setOperator] = React.useState<string>('');
  const [modValue, setModValue] = React.useState<string>('');
  const [clearMode, setClearMode] = React.useState<string>('AC');
  const displayBoxRef = React.useRef<HTMLDivElement>(null);
  const [debug, setDebug] = React.useState(false);

  const calculate = (n1: string, op: string, n2: string): string => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    let result = '';
    if (op === 'add') {
      result = (firstNum + secondNum).toString();
    }

    if (op === 'subtract') {
      result = (firstNum - secondNum).toString();
    }

    if (op === 'multiply') {
      result = (firstNum * secondNum).toString();
    }

    if (op === 'divide') {
      result = (firstNum / secondNum).toString();
    }

    return result;
  };

  const resetStates = (): void => {
    setFirstValue('');
    setModValue('');
    setOperator('');
    setPreviousKeyType('');
    // setDisplay('0');
  };

  const addToggledButtonStyling = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    // button styling for operator buttons when clicked
    const key = e.currentTarget;
    key.classList.add('scale-90');

    if (null === key.parentNode) {
      throw Error('key.parentNode is null');
    }

    Array.from(key.parentNode.children).forEach((k: Element) =>
      k.classList.remove('hover:scale-95')
    );
  };

  const removeToggledButtonStyling = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    // button styling for operator buttons when clicked
    const key = e.currentTarget;
    key.classList.add('hover:scale-95');

    if (null === key.parentNode) {
      throw Error('key.parentNode is null');
    }

    Array.from(key.parentNode.children).forEach((k: Element) => {
      k.classList.remove('scale-90');
    });
  };

  const getKeyType = (e: React.MouseEvent<HTMLButtonElement>): string => {
    const key = e.currentTarget;
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

  const createResultString = (
    e: React.MouseEvent<HTMLButtonElement>,
    displayedNum: string
  ) => {
    const key = e.currentTarget;
    const keyContent = key.textContent;
    const keyType = getKeyType(e);
    setPreviousKeyType(keyType);

    //Number keys
    if (keyType === 'number') {
      return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? keyContent
        : displayedNum + keyContent;
    }

    //Decimal key
    if (keyType === 'decimal') {
      if (!displayedNum?.includes('.')) return displayedNum + '.';
      if (previousKeyType === 'operator' || previousKeyType === 'calculate')
        return '0.';
      return displayedNum;
    }

    //Operator keys
    if (keyType === 'operator') {
      const firstVal = firstValue;
      const op = operator;

      return firstVal &&
        op &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculate(firstVal, op, displayedNum)
        : displayedNum;
    }

    //Clear key
    if (keyType === 'clear') return '0';

    //Calculate key
    if (keyType === 'calculate') {
      const firstVal = firstValue;
      const op = operator;

      if (firstValue) {
        return previousKeyType === 'calculate'
          ? calculate(firstVal, op, modValue)
          : calculate(firstVal, op, displayedNum);
      } else {
        return displayedNum;
      }
    }
  };

  const updateVisualState = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget;
    const keyType = getKeyType(e);
    removeToggledButtonStyling(e);

    if (keyType === 'operator') {
      addToggledButtonStyling(e);
    }

    if (keyType === 'clear' && key.textContent !== 'AC') {
      setClearMode('AC');
    }

    if (keyType !== 'clear') {
      setClearMode('CE');
    }
  };

  const updateCalculatorState = (
    e: React.MouseEvent<HTMLButtonElement>,
    calculatedValue: string,
    displayedNum: string
  ) => {
    const key = e.currentTarget;
    const action = key.dataset.action || '';
    const keyType = getKeyType(e);
    setDisplay(calculatedValue);
    setPreviousKeyType(keyType);

    //update on keypress
    if (keyType === 'operator') {
      setOperator(action);
      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        setFirstValue(calculatedValue);
      } else {
        setFirstValue(displayedNum);
      }
    }

    // Clear key
    if (action === 'clear') {
      if (clearMode === 'AC') {
        resetStates();
      } else {
        setClearMode('AC');
      }
      setDisplay('0');
    }

    // if clicked button is anything other than clear, set clearMode to 'CE'
    if (action !== 'clear') {
      setClearMode('CE');
    }

    // calculate key
    if (action === 'calculate') {
      let firstVal = firstValue;
      const op = operator;
      let secondVal = displayedNum;

      if (firstVal) {
        if (previousKeyType === 'calculate') {
          firstVal = displayedNum;
          secondVal = modValue;
        }

        setDisplay(calculate(firstVal, op, secondVal));
      }
      setModValue(secondVal);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches('button')) {
      const displayedNum = displayBoxRef.current?.textContent || '0';

      const resultString = createResultString(e, displayedNum) || '0';

      updateCalculatorState(e, resultString, displayedNum);
      updateVisualState(e);
    }
  };

  React.useEffect(() => {
    console.log('');
    console.log('Display: ' + display);
    console.log('firstValue: ' + firstValue);
    console.log('previousKeyType: ' + previousKeyType);
    console.log('operator: ' + operator);
    console.log('modValue: ' + modValue);
    console.log('clearMode: ' + clearMode);
  }, [display, firstValue, previousKeyType, operator, modValue, clearMode]);

  return (
    <>
      <div className='h-screen/2 flex flex-col items-center justify-center'>
        <div className='flex flex-auto flex-row'>
          <div className='flex flex-col'>
            <CalculatorDisplay ref={displayBoxRef} display={display}>
              0
            </CalculatorDisplay>
            <CalculatorKeys handleClick={handleClick} clearMode={clearMode} />
          </div>
          {debug && (
            <>
              <div className='ml-5 flex w-auto shrink flex-col'>
                <div className='h-full bg-gray-100 p-5'>
                  <div className='grid grid-cols-3'>
                    <div className='col-span-3 mb-5'>Debug Info:</div>
                    <div className={`${styles.hasTooltip} col-span-1`}>
                      <span
                        className={`${styles.tooltip} -mt-8 rounded bg-gray-100 p-1 text-red-500 shadow-lg`}
                      >
                        React state for currently displayed value
                      </span>
                      display: <sup className='text-sm text-red-700'>?</sup>
                    </div>
                    <div className='col-span-2'>
                      <p>{display}</p>
                    </div>
                    <div className={`${styles.hasTooltip} col-span-1`}>
                      <span
                        className={`${styles.tooltip} -mt-8 rounded bg-gray-100 p-1 text-red-500 shadow-lg`}
                      >
                        React state for previous value
                      </span>
                      firstValue: <sup className='text-sm text-red-700'>?</sup>
                    </div>
                    <div className='col-span-2'>
                      <p>{firstValue}</p>
                    </div>
                    <div className={`${styles.hasTooltip} col-span-1`}>
                      <span
                        className={`${styles.tooltip} -mt-8 rounded bg-gray-100 p-1 text-red-500 shadow-lg`}
                      >
                        React state for the selected operator
                      </span>
                      operator: <sup className='text-sm text-red-700'>?</sup>
                    </div>
                    <div className='col-span-2'>
                      <p>{operator}</p>
                    </div>
                    <div className={`${styles.hasTooltip} col-span-1`}>
                      <span
                        className={`${styles.tooltip} -mt-8 rounded bg-gray-100 p-1 text-red-500 shadow-lg`}
                      >
                        React state for the modifier value. <br />
                        When the equal button is repeatedly clicked, the
                        calculator returns (modValue (operator) display)
                      </span>
                      modValue: <sup className='text-sm text-red-700'>?</sup>
                    </div>
                    <div className='col-span-2'>
                      <p>{modValue}</p>
                    </div>
                    <div className={`${styles.hasTooltip} col-span-1`}>
                      <span
                        className={`${styles.tooltip} -mt-8 rounded bg-gray-100 p-1 text-red-500 shadow-lg`}
                      >
                        React state for the clear button text.
                      </span>
                      clearMode: <sup className='text-sm text-red-700'>?</sup>
                    </div>
                    <div className='col-span-2'>
                      <p>{clearMode}</p>
                    </div>
                  </div>
                </div>
                <div className='h-full bg-gray-100 p-5 pb-0'>
                  <p className='text-md'>
                    This calculator was made using{' '}
                    <a
                      className='text-blue-600 underline'
                      href='https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98'
                    >
                      Zell Liew&apos;s guide on Freecodecamp.org
                    </a>
                  </p>
                </div>
                <div className='h-full bg-gray-100 p-5 pb-0'>
                  <p className='text-md'>
                    Starter template taken from this{' '}
                    <a
                      className='text-blue-600 underline'
                      href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'
                    >
                      GitHub repo
                    </a>{' '}
                    <sub className='text-xs'>
                      (slightly overkill for this tiny project)
                    </sub>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Button
        className='mt-5'
        variant='primary'
        onClick={() => {
          setDebug(!debug);
        }}
      >
        Debug Details
      </Button>
    </>
  );
};

export default CalculatorRoot;
