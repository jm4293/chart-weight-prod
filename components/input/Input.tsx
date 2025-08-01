interface IProps {
  id?: string;
  name?: string;
  className?: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
}

const TEXT = (props: IProps) => {
  const { className, ...rest } = props;

  return (
    <input
      type="text"
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
};

const EMAIL = (props: IProps) => {
  const { className, ...rest } = props;

  return (
    <input
      type="email"
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
};

const PASSWORD = (props: IProps) => {
  const { className, ...rest } = props;

  return (
    <input
      type="password"
      className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
};

export const Input = { TEXT, EMAIL, PASSWORD };
