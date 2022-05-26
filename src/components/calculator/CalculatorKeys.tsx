import * as React from 'react';

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
          className='bg-primary-400 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          +
        </button>
        <button
          data-action='subtract'
          className='bg-primary-400 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          -
        </button>
        <button
          data-action='multiply'
          className='bg-primary-400 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          ×
        </button>
        <button
          data-action='divide'
          className='bg-primary-400 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          ÷
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          7
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          8
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          9
        </button>
        <button
          data-action='calculate'
          className='row-span-4 bg-orange-500 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          =
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          4
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          5
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          6
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          1
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          2
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          3
        </button>
        <button
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          0
        </button>
        <button
          data-action='decimal'
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          .
        </button>
        <button
          data-action='clear'
          className='bg-amber-300 text-4xl font-bold transition-transform duration-100 ease-out hover:scale-95 active:scale-90'
          onClick={(e) => props.handleClick(e)}
        >
          {props.clearMode}
        </button>
      </div>
    </>
  );
};

export default CalculatorKeys;
