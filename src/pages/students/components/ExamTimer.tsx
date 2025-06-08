import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  durationMinitutes: number;
  onTimeUp: () => void;
};

const ExamTimer: React.FC<Props> = ({ durationMinitutes, onTimeUp }) => {
  const [secondLeft, setSecondLeft] = useState(durationMinitutes * 60);
  const navigate = useNavigate()

  useEffect(() => {
    if (secondLeft <= 0) {
      onTimeUp(); // handles auto submission
      navigate('/student/attend-exam')
      return;
    }

    const timer = setInterval(() => {
      setSecondLeft((prev) => prev - 1);
    }, 1000);

    return clearInterval(timer);
  }, [secondLeft, onTimeUp]);

  const minutes = Math.floor(secondLeft / 60);
  const seconds = secondLeft % 60;

  return (
    <div className="text-right text-sm font-medium text-gray-700">
      Time Remaining: {minutes}:{seconds < 10 ? "0" : ""}
    </div>
  );
};

export default ExamTimer;

/**
 * Alternativeli 
 *  useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const difference = endTime.getTime() - now.getTime()
            if(difference <= 0){
                clearInterval(interval)
                setTimeLeft('Time is up')
            } else {
                const minute = Math.floor(difference / 60000)
                const seconds = Math.floor((difference % 60000) / 1000)
                setTimeLeft(`${minute}:${seconds}`)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [ endTime ])
 */
