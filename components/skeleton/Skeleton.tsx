'use client';

import styles from './skeleton.module.css';

interface IProps {
  text?: string;
  height?: number;
}

const Line = (props: IProps) => {
  const { height = 1, text } = props;

  return (
    <div
      className={`w-full ${styles.animatePulse}`}
      style={{ height: `${height}rem` }}>
      {text && (
        <p className="w-full h-full flex justify-center items-center text-gray-500 text-lg">
          {text}
        </p>
      )}
    </div>
  );
};

export const Skeleton = { Line };
