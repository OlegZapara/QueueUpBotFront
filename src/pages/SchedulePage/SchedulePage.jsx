import { Column } from 'primereact/column'
import './SchedulePage.css'
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { defaultData } from '../../shared/schedule/ScheduleEntity';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask'

export default function SchedulePage() {

  const [scheduleData, setScheduleData] = useState([])
  const classTypes = ['LECTURE', 'LAB', 'PRACTICE', 'OTHER']

  useEffect(() => {
    setScheduleData(defaultData);
  }, [])

  function getDay(dayName){
    switch(dayName){
      case 'Monday':
        return 'Понеділок'
      case 'Tuesday':
        return 'Вівторок'
      case 'Wednesday':
        return 'Середа'
      case 'Thursday':
        return 'Четвер'
      case 'Friday':
        return 'Пʼятниця'
      case 'Saturday':
        return 'Субота'
      case 'Sunday':
        return 'Неділя'
      default:
        return dayName
    }
  }
  function getClassType(value){
    switch(value){
      case 'LECTURE':
        return 'info'
      case 'LAB':
        return 'success';
      case 'PRACTICE':
        return 'warning';
      default:
        return '';
    }
  }

  function handleUpdate(weekIndex, dayIndex, options, event){
    if(event.target.value != scheduleData[weekIndex].days[dayIndex].classEntries[options.rowIndex][options.field]){
      const updatedData = JSON.parse(JSON.stringify(scheduleData));
      updatedData[weekIndex].days[dayIndex].classEntries[options.rowIndex][options.field] = event.target.value
      setScheduleData(updatedData);
    }
  }

  function completeEdit(weekIndex, dayIndex, e){
    if(e.value == e.newValue) return;
    console.log(scheduleData[weekIndex].days[dayIndex].classEntries[e.rowIndex][e.field])
  }

  function timeEditor(weekIndex, dayIndex, options){
    return <InputMask mask='99:99' placeholder='00:00' value={scheduleData[weekIndex].days[dayIndex].classEntries[options.rowIndex][options.field]} onChange={(event) => {
      handleUpdate(weekIndex, dayIndex, options, event);
    }}/>
  }

  function classTypeEditor(weekIndex, dayIndex, options){
    return <Dropdown value={scheduleData[weekIndex].days[dayIndex].classEntries[options.rowIndex][options.field]} options={classTypes} onChange={(event) => {
      handleUpdate(weekIndex, dayIndex, options, event);
    }} itemTemplate={(option) => {
      return <Tag value={option} severity={getClassType(option)}></Tag>
    }}/>
  }

  function textEditor (weekIndex, dayIndex, options) {
    return <InputText type="text" value={scheduleData[weekIndex].days[dayIndex].classEntries[options.rowIndex][options.field]} onChange={(event) => {
      handleUpdate(weekIndex, dayIndex, options, event);
    }} className='cell-editor'/>
  }

  function classTypeBodyTemplate(rowData){
    return <Tag value={rowData.classType} severity={getClassType(rowData.classType)}></Tag>
  }

  function uploadFile(){
    console.log('file uploaded');
  }

  return (
    <>
      <div className='schedule-header'>
        <div>Редактор розкладу</div><FileUpload mode='basic' accept='*' url="/api/upload" onUpload={uploadFile} chooseLabel='Завантажити файл'></FileUpload>
      </div>
      {scheduleData.map((week, weekIndex) => (
        <Card title={week.weekType == 'WEEK_A'? 'Тиждень A' : 'Тиждень B'} className='data-card' key={week.weekType}>
          <Accordion multiple>
            {week.days.map((day, dayIndex) => (
              <AccordionTab header={getDay(day.dayName)} key={week.weekType + day.dayName}>
                <DataTable value={day.classEntries} tableStyle={{ minWidth: '50rem' }} editMode="cell">
                  <Column field='className' header='Урок' editor={(options) => textEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                  <Column field='startTime' header='Початок' editor={(options) => timeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                  <Column field='endTime' header='Кінець' editor={(options) => timeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                  <Column field='classType' header='Тип уроку' body={classTypeBodyTemplate} editor={(options) => classTypeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                  <Column field='url' header='URL' editor={(options) => textEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                </DataTable>
              </AccordionTab>
            ))}
          </Accordion>
        </Card>
      ))}
    </>
  )
}
