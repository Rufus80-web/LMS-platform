
import React, { useEffect, useState } from 'react';

interface Props {
  durationMinutes: number;
  onTimeUp: () => void;
}

const ExamTimer: React.FC<Props> = ({ durationMinutes, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp(); // Handles automatic exam submission
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="p-4 bg-gradient-to-r from-[#111] to-[#082520c5] shadow-sm animate-pulse hover:bg-green-500 text-white fixed right-5 rounded flex flex-col justify-center items-center gap-0.5">
      <span className='text-xl'>Time Left: {minutes}:{seconds.toString().padStart(2, '0')}</span>
      <span className='text-[10px]'>Automatically submits on timeup</span>
    </div>
  );
};

export default ExamTimer;
