import * as React from 'react';

import styles from './Calculator.module.css';

type Props = {
  display: string | null | undefined;
  children: React.ReactNode;
};

const CalculatorDisplay = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div className='mb-1 grid w-80 grid-cols-4 gap-1 rounded-xl leading-relaxed'>
        <p className={styles.display} ref={ref}>
          {props.display}
        </p>
      </div>
    );
  }
);

export default CalculatorDisplay;
