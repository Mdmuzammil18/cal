import React from 'react';
import Calendar from './components/Calender/Calendar';

function App() {
  const someDate = new Date('2022-10-03'); // Example date

  const handleDateClick = (clickedDate: { toDateString: () => any; }) => {
    console.log(`Clicked date: ${clickedDate.toDateString()}`);
  };
  return (
    <div className="App">
      <Calendar date={someDate} onDateClick={handleDateClick} />
    </div>
  );
}

export default App;
