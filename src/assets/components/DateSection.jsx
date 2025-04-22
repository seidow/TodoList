import React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

const DateSection = () => {
  const now = new Date();
  const dayText = now.toLocaleString("en-US", { weekday: "long" });
  const dayNum = now.toLocaleDateString("en-US", { day: "numeric" });
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.toLocaleDateString("en-US", { year: "numeric" });
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around mt-4 font-poppins text-white bg-gray-800 p-4 w-full mx-auto">
      <div className="text-6xl font-bold">
      <div className="flex items-center justify-center">
        <BsFillCalendarDateFill size={40} />
        {dayNum}
      </div>
        <div className="text-2xl font-bold">{month} {year}</div>
        
        </div>
      
      <div className="text-2xl font-bold">{dayText}</div>
    </div>
  );
};

export default DateSection;
