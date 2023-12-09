import React from 'react';
import './TimetablePage.css'
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';

export default function EmptyTimetablePage() {
  return (
    <div>
      <Card title='Відсутній Id чату' className='data-card'>
        <div><Link to='/settings'>Для встановлення Id чату перейдіть до налаштувань <span className='pi pi-external-link'></span></Link></div>
      </Card>
    </div>
  )
}
