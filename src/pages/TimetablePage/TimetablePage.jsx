import { Column } from 'primereact/column'
import './TimetablePage.css'
import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { defaultData, defaultClassData, Timetable, TimetableDay } from '../../shared/timetable/TimetableEntity';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { InputMask } from 'primereact/inputmask'
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';
import { TimetableEntry } from '../../shared/timetable/TimetableEntity';
import { Dialog } from 'primereact/dialog';

export default function TimetablePage() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState([]);
  const [searchParams, _] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState();
  const [contextMenuData, setContextMenuData] = useState({})
  const [activeDialog, setActiveDialog] = useState(false)
  const classTypes = ['LECTURE', 'LAB', 'PRACTICE', 'OTHER'];
  const cm = useRef(null);
  const cmItems = [
    { label: 'Insert row above', icon: 'pi pi-angle-up', command: () => insertRowAbove()},
    { label: 'Insert row below', icon: 'pi pi-angle-down', command: () => insertRowBelow()},
    { label: 'Delete row', icon: 'pi pi-fw pi-trash', command: () => deleteRow()}
  ];

  const timeEditor = (c) => (<InputMask mask='99:99:99' placeholder='00:00:00' value={getCell(c)} onChange={e => handleUpdate(c, e)}/>);

  const classTypeEditor = (c) => (<Dropdown value={getCell(c)} options={classTypes} onChange={(e) => handleUpdate(c, e)} itemTemplate={option => <Tag value={option} severity={getClassType(option)}></Tag>}/>);
  
  const textEditor = (c) => (<InputText type="text" value={getCell(c)} onChange={e => handleUpdate(c, e)}/>);

  const weeks = ["WEEK_A", "WEEK_B"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const columns = [
    { field:'className', header:'Урок', editor:textEditor },
    { field:'startTime', header:'Початок', editor:timeEditor },
    { field:'endTime', header:'Кінець', editor:timeEditor },
    { field:'classType', header:'Тип уроку', editor:classTypeEditor, body:classTypeBodyTemplate },
    { field:'url', header:'URL', editor:textEditor },
  ]

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    if(chatId){
      localStorage.setItem('chatId', chatId);
      navigate('/timetable');
    }
    if(!chatId){
      axios.get('https://api.uaproject.xyz/timetables/retrieve', {
        headers: {
          chatId: localStorage.getItem('chatId'),
          "X-API-KEY": import.meta.env.VITE_X_API_KEY
        }
      })
      .then((res) => {
        weeks.map(week => {
          if(!res.data.find(y => y.weekType == week)){
            res.data.push(new Timetable(week, []));
          }
          days.map(day => {
            if(!res.data.find(y => y.weekType == week).days.find(x => x.dayName.toUpperCase() == day.toUpperCase())){
              res.data.find(y => y.weekType == week).days.push(new TimetableDay(day.toUpperCase(), []));
            }
          })
        })
        setTimetableData(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
    }
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

  function completeEdit(){
    console.log(JSON.stringify(timetableData));
    axios.post('https://api.uaproject.xyz/timetables/update', JSON.stringify(timetableData), {
      headers: {
        chatId: localStorage.getItem('chatId'),
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
        'Content-Type':'application/json'
      }
    }).then(() => {
      console.log("Timetable updated")
    }).catch(e => {
      console.log(e);
    });
  }

  function classTypeBodyTemplate(rowData){
    if(rowData.classType == '') return <></>
    return <Tag value={rowData.classType} severity={getClassType(rowData.classType)}></Tag>
  }

  return (
    <>
      <ContextMenu model={cmItems} ref={cm} breakpoint='767px'/>
      <div className='timetable-header'>
        <div>Редактор розкладу <span onClick={() => setActiveDialog(true)} className='pi pi-question-circle hint'></span></div>
        <div className='header-button-container'>
          <Button icon='pi pi-plus'>Створити новий розклад</Button>
        </div>
      </div>
      <Dialog header='Як використовувати редактор таблиць?' style={{width:'calc(200px + 40vw)'}} visible={activeDialog} onHide={() => setActiveDialog(false)}>
        <h3>Для редагування поля:</h3>
        <ol>
          <li>Натисність на клітинку, яку потрібно редагувати</li><br/>
          <li>Введіть нове значення</li><br/>
          <li>Натисніть клавішу Enter, після цього нове значення буде збережене</li><br/>
        </ol>
        <h3>Для редагування таблиці:</h3>
        <ol>
          <li>Натисність правою кнопкою миші на рядок таблиці, яку потрібно редагувати</li><br/>
          <li>Оберіть потрібну команду з меню <br/>(команда здійснюється до рядка, на який було натиснуто)</li><br/>
        </ol>
      </Dialog>
      {localStorage.getItem('chatId')? 
      timetableData.map((week, weekIndex) => (
        <Card title={week.weekType == 'WEEK_A'? 'Тиждень A' : 'Тиждень B'} className='data-card' key={week.weekType}>
          <Accordion multiple>
            {week.days.map((day, dayIndex) => (
              <AccordionTab headerTemplate={<div className='accordion-header'><span>{day.dayName}</span><span>{day.classEntries.length == 0? 'EMPTY' : ''}</span></div>} key={week.weekType + day.dayName}>
                <div onContextMenu={e => handleContextMenu(e)}>
                  <DataTable id={`${weekIndex} ${dayIndex}`} selectionMode='single' selection={selectedRow} value={day.classEntries} tableStyle={{ minWidth: '50rem' }} editMode="cell" onRowMouseEnter={e => setSelectedRow(e.index)}>
                    {columns.map(col => (
                      <Column key={`${week.weekType}-${day.dayName}-${col.field}`} 
                      field={col.field} header={col.header} body={col.body}
                      editor={(e) => col.editor([weekIndex, dayIndex, e])} 
                      onCellEditComplete={() => completeEdit()}/>
                    ))}
                  </DataTable>
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        </Card>
      )) : 
      <Card title='Відсутній Id чату' className='data-card'>
        <div><Link to='/settings'>Для встановлення Id чату перейдіть до налаштувань <span className='pi pi-external-link'></span></Link></div>
      </Card>}
    </>
  )
}
