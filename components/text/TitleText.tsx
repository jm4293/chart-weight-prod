interface IProps {
  className?: string;
  text: string;
}

export const TitleText = (props: IProps) => {
  const { className, text } = props;

  return <h1 className={`text-4xl font-bold mb-4 ${className}`}>{text}</h1>;
};
