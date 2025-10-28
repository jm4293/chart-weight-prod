interface IProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  text: string | React.ReactNode;
}

const TITLE = (props: IProps) => {
  const { className, text } = props;

  return (
    <h1
      className={`text-xl font-semibold whitespace-nowrap ${className ?? ''}`}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: IProps) => {
  const { className, text } = props;

  return (
    <h2 className={`text-lg font-medium whitespace-nowrap ${className ?? ''}`}>
      {text}
    </h2>
  );
};

const HEADING = (props: IProps) => {
  const { className, text } = props;

  return (
    <h3
      className={`text-base font-medium whitespace-nowrap ${className ?? ''}`}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: IProps) => {
  const { className, text } = props;

  return (
    <p className={`text-sm whitespace-nowrap ${className ?? ''}`}>{text}</p>
  );
};

const CAPTION = (props: IProps) => {
  const { className, text } = props;

  return (
    <span
      className={`text-xs italic text-gray-500 whitespace-nowrap ${className ?? ''}`}>
      {text}
    </span>
  );
};

export const Text = { TITLE, SUBTITLE, HEADING, PARAGRAPH, CAPTION };
