import * as React from 'react';

import styles from './Calculator.module.css';

type Props = {
  handleClick: (keyType: React.MouseEvent<HTMLButtonElement>) => void;
  clearMode: string | null | undefined;
};

const CalculatorKeys: React.FC<Props> = (props) => {
  return (
    <>
      <div className='grid w-80 grid-cols-4 gap-1 rounded-xl'>
        <button
          data-action='add'
          className={styles.operatorBtn}
          onClick={(e) => props.handleClick(e)}
        >
          +
        </button>
        <button
          data-action='subtract'
          className={styles.operatorBtn}
          onClick={(e) => props.handleClick(e)}
        >
          -
        </button>
        <button
          data-action='multiply'
          className={styles.operatorBtn}
          onClick={(e) => props.handleClick(e)}
        >
          ×
        </button>
        <button
          data-action='divide'
          className={styles.operatorBtn}
          onClick={(e) => props.handleClick(e)}
        >
          ÷
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          7
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          8
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          9
        </button>
        <button
          data-action='calculate'
          className={styles.equalBtn}
          onClick={(e) => props.handleClick(e)}
        >
          =
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          4
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          5
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          6
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          1
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          2
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          3
        </button>
        <button
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          0
        </button>
        <button
          data-action='decimal'
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          .
        </button>
        <button
          data-action='clear'
          className={styles.numberBtn}
          onClick={(e) => props.handleClick(e)}
        >
          {props.clearMode}
        </button>
      </div>
    </>
  );
};

export default CalculatorKeys;
