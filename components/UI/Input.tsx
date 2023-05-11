import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

type InputProps = {
  label: string;
  description?: string;
  value: string;
  setValue: (arg: any) => void;
  error?: boolean;
  errorMessage?: string;
  isNumber?: boolean;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Input = ({
  label,
  description,
  value,
  setValue,
  error,
  errorMessage,
  isNumber,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium text-zinc-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type="text"
          name="input"
          id="input"
          className={classNames(
            'block w-full rounded-md border px-3 py-2 sm:text-sm',
            error
              ? 'border-red-600  focus:border-red-600'
              : 'border-zinc-300  focus:border-fuchsia-500'
          )}
          value={value}
          onChange={(e) => {
            if (isNumber) {
              const re = /^\d*\.?\d*$/;
              if (e.target.value === '' || re.test(e.target.value)) {
                setValue(e.target.value);
              }
            } else {
              setValue(e.target.value);
            }
          }}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="input-description">
          {errorMessage}
        </p>
      )}

      {description && !error && (
        <p className="mt-2 text-sm text-zinc-500" id="input-description">
          {description}
        </p>
      )}
    </div>
  );
};

export default Input;
