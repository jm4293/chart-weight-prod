interface IProps {
  className?: string;
  text: string;
  placeholder?: string;
}

export const SubmitButton = (props: IProps) => {
  const { className, text, ...rest } = props;

  return (
    <button
      type="submit"
      className={`text-2xl p-3 rounded border bg-blue-500 text-white ${className}`}
      {...rest}>
      {text}
    </button>
  );
};
