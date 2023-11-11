import { Column } from 'primereact/column'
import './TimetablePage.css'
import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { defaultData, defaultClassData } from '../../shared/timetable/TimetableEntity';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';
import { TimetableEntry } from '../../shared/timetable/TimetableEntity';

export default function TimetablePage() {

  const [timetableData, setTimetableData] = useState([]);
  const [editedCell, setEditedCell] = useState([]);
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

  const timeEditor = (c) => (<InputMask mask='99:99' placeholder='00:00' value={getCell(c)} onChange={e => handleUpdate(c, e)}/>);

  const classTypeEditor = (c) => (<Dropdown value={getCell(c)} options={classTypes} onChange={(e) => handleUpdate(c, e)} itemTemplate={option => <Tag value={option} severity={getClassType(option)}></Tag>}/>);
  
  const textEditor = (c) => (<InputText type="text" value={getCell(c)} onChange={e => handleUpdate(c, e)}/>);

  const columns = [
    { field:'className', header:'Урок', editor:textEditor },
    { field:'startTime', header:'Початок', editor:timeEditor },
    { field:'endTime', header:'Кінець', editor:timeEditor },
    { field:'classType', header:'Тип уроку', editor:classTypeEditor, body:classTypeBodyTemplate },
    { field:'url', header:'URL', editor:textEditor },
  ]

  useEffect(() => {
    // const chatId = searchParams.get('chatId');
    // axios.get('http://185.135.158.207:19132/api/timetables/retrieve', {
    //   headers: {
    //     chatId: chatId
    //   }
    // })
    // .then((res) => {
    //   setTimetableData(res.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
    setTimetableData(defaultClassData);
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
  function getCell(cell){
    return timetableData[cell[0]].days[cell[1]].classEntries[cell[2].rowIndex][cell[2].field];
  }
  function updateClassEntry(cell, value){
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

  function handleUpdate(editedCell, event){
    if(event.target.value != getCell(editedCell)){
      updateClassEntry(editedCell, event.target.value);
    }
  }

  function insertRowAbove(){
    setTimetableData(data => {
      const newData = [...data];
      newData[contextMenuData.week].days[contextMenuData.day].classEntries.splice(contextMenuData.row, 0, new TimetableEntry("", "", "", "", ""));
      return newData;
    });
  }
  function insertRowBelow(){
    setTimetableData(data => {
      const newData = [...data];
      newData[contextMenuData.week].days[contextMenuData.day].classEntries.splice(contextMenuData.row + 1, 0, new TimetableEntry("", "", "", "", ""));
      return newData;
    });
  }
  function deleteRow(){
    setTimetableData(data => {
      const newData = [...data];
      newData[contextMenuData.week].days[contextMenuData.day].classEntries.splice(contextMenuData.row, 1);
      return newData;
    })
  }

  function handleContextMenu(e){
    cm.current.show(e);
    const [weekIndex, tableIndex] = e.target.closest('.p-datatable').id.split(' ');
    setContextMenuData({week: weekIndex, day: tableIndex, row: selectedRow});
  }

  function completeEdit(editedCell){
    // axios.post('http://185.135.158.207:19132/api/timetables/update', timetableData);
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
      <div className='timetable-header'>
        <div>Редактор розкладу</div>
        <div className='header-button-container'>
          <Button icon='pi pi-plus'>Створити новий розклад</Button>
          <FileUpload mode='basic' accept='*' url="/api/upload" onUpload={uploadFile} chooseLabel='Завантажити файл'></FileUpload>
        </div>
      </div>
      {timetableData.map((week, weekIndex) => (
        <Card title={week.weekType == 'WEEK_A'? 'Тиждень A' : 'Тиждень B'} className='data-card' key={week.weekType}>
          <Accordion multiple>
            {week.days.map((day, dayIndex) => (
              <AccordionTab header={day.dayName} key={week.weekType + day.dayName}>
                <div onContextMenu={e => handleContextMenu(e)}>
                  <DataTable id={`${weekIndex} ${dayIndex}`} selectionMode='single' selection={selectedRow} value={day.classEntries} tableStyle={{ minWidth: '50rem' }} editMode="cell" onRowMouseEnter={e => setSelectedRow(e.index)}>
                    {columns.map(col => (
                      <Column key={`${week.weekType}-${day.dayName}-${col.field}`} 
                      field={col.field} header={col.header} body={col.body}
                      editor={(e) => col.editor([weekIndex, dayIndex, e])} 
                      onCellEditComplete={(e) => completeEdit([weekIndex, dayIndex, e])}/>
                    ))}
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
