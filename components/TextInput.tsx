import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface PropTypes {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hideError?: boolean;
  append?: string;
}

export default function TextInput({
  control,
  name,
  className,
  disabled,
  label,
  placeholder,
  append,
}: PropTypes) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div className={`${className ? className : ''}`}>
          <label>
            {label ? (
              <p className='block text-sm font-medium text-secondary-foreground mb-2 text-left'>
                {label}
              </p>
            ) : null}
            <div className='flex items-stretch'>
              <Input
                className={`w-full h-full px-3 py-3 sm:text-base ${
                  invalid
                    ? 'border-destructive placeholder:text-destructive text-destructive'
                    : 'text-complementary border'
                } ${append ? 'rounded-tr-none rounded-br-none' : ''}`}
                type='text'
                name={name}
                onChange={onChange}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete='off'
              />
              {append ? (
                <div className='bg-primary flex items-center text-primary px-4 rounded-tr-lg rounded-br-lg'>
                  <p>{append}</p>
                </div>
              ) : null}
            </div>
          </label>
          {invalid ? (
            <p className='text-red-500 text-[12px] py-1 text-left font-medium'>
              *{error?.message}
            </p>
          ) : null}
        </div>
      )}
    />
  );
}
