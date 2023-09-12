'use client'

import { 
    FieldErrors, 
    FieldValues, 
    UseFormRegister 
  } from "react-hook-form";

  interface SelectOptionProps {
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    options: string[];
  }

  var i =0;

  const SelectOption: React.FC<SelectOptionProps> = ({
    id,
    label,
    disabled, 
    register,
    required,
    errors,
    options,
  }) => {
    return (
      <div className="w-full relative">
        <label 
          className={`
            absolute 
            text-md
            duration-150 
            transform 
            -translate-y-3 
            ml-4
            top-5 
            z-10 
            origin-[0] 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}
        >
          {label}
        </label>
        <select
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`
            peer
            w-full
            p-4
            pt-6 
            font-light 
            bg-white 
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            ${errors[id] ? 'text-rose-500' : 'text-black-500'}
            text-md
          `}
        >
            {options.map((option: string) => {
                i +1
                return (<option key={i} value={option}>{option}</option>)
            })}
        
        </select>
        
      </div>
     );
  }

  export default SelectOption;