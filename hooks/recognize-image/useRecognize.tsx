import { createWorker } from 'tesseract.js';

export const useRecognize = () => {
  const recognizeImage = async (file: File) => {
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(file, {});

    await worker.terminate();

    return data.text;
  };

  return { recognizeImage };
};
