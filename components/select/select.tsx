interface IProps {
  className?: string;
  id: string;
  name?: string;
  options: Array<{ value: string; label: string }>;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const Select = (props: IProps) => {
  const { id, name, className, placeholder, options, ...rest } = props;

  return (
    <select
      id={id}
      name={name}
      className={`border border-gray-300 rounded px-2 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
