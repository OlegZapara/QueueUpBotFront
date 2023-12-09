import { useState } from "react";
import { Timetable, TimetableDay } from "../shared/timetable/TimetableEntity";

const weeks = ["WEEK_A", "WEEK_B"]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export function useTimetableData(){
  const [timetableData, setTimetableData] = useState([])


  function getTimetableCell(cell){
    return timetableData[cell[0]].days[cell[1]].classEntries[cell[2].rowIndex][cell[2].field];
  }

  function setTimetableCell(cell, value){
    setTimetableData(data => {
      const newData = [...data];
      newData[cell[0]].days[cell[1]].classEntries = newData[cell[0]].days[cell[1]].classEntries.map((entry, entryIndex) => {
        if(entryIndex !== cell[2].rowIndex){
          return entry;
        }
        return {
          ...entry,
          [cell[2].field]: value
        }
      })
      return newData;
    })
  }
  function setNonEmptyTimetableData(dataOrFunction) {
    const newData = typeof dataOrFunction === 'function' ? dataOrFunction() : dataOrFunction;

    weeks.forEach((week) => {
      if (!newData.some((y) => y.weekType === week)) {
        newData.push(new Timetable(week, []));
      }
      days.forEach((day) => {
        const weekData = newData.find((y) => y.weekType === week);
        if (!weekData.days.some((x) => x.dayName.toUpperCase() === day.toUpperCase())) {
          weekData.days.push(new TimetableDay(day.toUpperCase(), []));
        }
      });
    });

    setTimetableData(newData);
  }
  return [timetableData, setNonEmptyTimetableData, getTimetableCell, setTimetableCell]
}
