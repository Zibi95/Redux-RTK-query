import classNames from 'classnames';
import { GoSync } from 'react-icons/go';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  className?: string;
}

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: ButtonProps) {
  const buttonTypes = [primary, secondary, success, warning, danger, outline];
  const count = buttonTypes.filter((type) => type === true).length;

  if (count > 1) {
    throw new Error(
      'Only one of primary, secondary, success, warning, danger, outline can be true'
    );
  }

  const classes = classNames(
    rest.className,
    'flex items-center justify-center px-3 py-1.5 border',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button disabled={loading} {...rest} className={classes}>
      {loading ? <GoSync className='text-xl animate-spin' /> : children}
    </button>
  );
}

export default Button;
