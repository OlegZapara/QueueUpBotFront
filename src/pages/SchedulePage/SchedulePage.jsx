import { Column } from 'primereact/column'
import './SchedulePage.css'
import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { defaultData } from '../../shared/schedule/ScheduleEntity';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask'
import { useSearchParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';

export default function SchedulePage() {

  const [scheduleData, setScheduleData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState();
  const [contextMenuData, setContextMenuData] = useState({})
  const classTypes = ['LECTURE', 'LAB', 'PRACTICE', 'OTHER'];
  const cm = useRef(null);
  const cmItems = [
    { label: 'Insert row above', icon: 'pi pi-angle-up', command: () => insertRowAbove()},
    { label: 'Insert row below', icon: 'pi pi-angle-down', command: () => insertRowBelow()},
    { label: 'Delete row', icon: 'pi pi-fw pi-trash', command: () => deleteRow()}
];

  useEffect(() => {
    setScheduleData(defaultData);
  }, [])

  function getClassType(value){
    switch(value.toUpperCase()){
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

  function insertRowAbove(){
    const updatedData = JSON.parse(JSON.stringify(scheduleData));
    updatedData[contextMenuData.week]
    .days[contextMenuData.day]
    .classEntries.splice(contextMenuData.row, 0,
    {
      "className": "",
      "startTime": "",
      "endTime": "",
      "classType": "",
      "url": ""
    });
    setScheduleData(updatedData);
  }
  function insertRowBelow(){
    const updatedData = JSON.parse(JSON.stringify(scheduleData));
    updatedData[contextMenuData.week]
    .days[contextMenuData.day]
    .classEntries.splice(contextMenuData.row + 1, 0,
    {
      "className": "",
      "startTime": "",
      "endTime": "",
      "classType": "",
      "url": ""
    });
    setScheduleData(updatedData);
  }
  function deleteRow(){
    const updatedData = JSON.parse(JSON.stringify(scheduleData));
    updatedData[contextMenuData.week]
    .days[contextMenuData.day]
    .classEntries.splice(contextMenuData.row, 1);
    setScheduleData(updatedData);
  }

  function handleContextMenu(e){
    cm.current.show(e);
    const selectedIndex = selectedRow;
    const tableId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    const [weekIndex, tableIndex] = tableId.split(' ');
    setContextMenuData({week: weekIndex, day: tableIndex, row: selectedIndex});
    console.log(contextMenuData);
  }

  function completeEdit(weekIndex, dayIndex, e){
    if(e.value == e.newValue) return;
    // handle update
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
    if(rowData.classType == '') return <></>
    return <Tag value={rowData.classType} severity={getClassType(rowData.classType)}></Tag>
  }

  function uploadFile(){
    console.error('failed to upload file');
  }

  return (
    <>
      <ContextMenu model={cmItems} ref={cm} breakpoint='767px'/>
      <div className='schedule-header'>
        <div>Редактор розкладу</div>
        <div className='header-button-container'>
          <Button icon='pi pi-plus'>Створити новий розклад</Button>
          <FileUpload mode='basic' accept='*' url="/api/upload" onUpload={uploadFile} chooseLabel='Завантажити файл'></FileUpload>
        </div>
      </div>
      {scheduleData.map((week, weekIndex) => (
        <Card title={week.weekType == 'WEEK_A'? 'Тиждень A' : 'Тиждень B'} className='data-card' key={week.weekType}>
          <Accordion multiple>
            {week.days.map((day, dayIndex) => (
              <AccordionTab header={day.dayName} key={week.weekType + day.dayName}>
                <div onContextMenu={e => handleContextMenu(e)}>
                  <DataTable id={`${weekIndex} ${dayIndex}`} selectionMode='single' selection={selectedRow} value={day.classEntries} tableStyle={{ minWidth: '50rem' }} editMode="cell" onRowMouseEnter={e => setSelectedRow(e.index)}>
                    <Column field='className' header='Урок' editor={(options) => textEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                    <Column field='startTime' header='Початок' editor={(options) => timeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                    <Column field='endTime' header='Кінець' editor={(options) => timeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                    <Column field='classType' header='Тип уроку' body={classTypeBodyTemplate} editor={(options) => classTypeEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                    <Column field='url' header='URL' editor={(options) => textEditor(weekIndex, dayIndex, options)} onCellEditComplete={(e) => completeEdit(weekIndex, dayIndex, e)}></Column>
                  </DataTable>
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        </Card>
      ))}
    </>
  )
}
