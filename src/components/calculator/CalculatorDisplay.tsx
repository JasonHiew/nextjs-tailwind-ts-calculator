import * as React from 'react';

type Props = {
  display: string | null | undefined;
  children: React.ReactNode;
};

const CalculatorDisplay = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <>
        <div className='mb-1 grid w-80 grid-cols-4 gap-1 rounded-xl'>
          <div
            className='col-span-4 min-w-full bg-gray-400 pr-2 text-right text-4xl font-bold'
            ref={ref}
          >
            {props.display}
          </div>
        </div>
      </>
    );
  }
);

export default CalculatorDisplay;
