import React, { useState, useEffect } from 'react';
import './Calendar.css';

interface CalendarProps {
  date: Date;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ date, onDateClick }) => {
  const [calendarData, setCalendarData] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const getDaysInMonth = (year: number, month: number): Date[] => {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      const days = [];

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }

      return days;
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);
    setCalendarData(daysInMonth);
  }, [currentMonth, currentYear]);

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDate(clickedDate);
    onDateClick(clickedDate);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(event.target.value));
  };

  return (
    <div className="calendar">
      <div className="header">
        <select value={currentMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(currentYear, i, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select value={currentYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={currentYear - 5 + i}>
              {currentYear - 5 + i}
            </option>
          ))}
        </select>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className={`day ${
              (selectedDate &&
              day.getDate() === selectedDate.getDate() &&
              day.getMonth() === selectedDate.getMonth())
                ? 'highlighted'
                : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
