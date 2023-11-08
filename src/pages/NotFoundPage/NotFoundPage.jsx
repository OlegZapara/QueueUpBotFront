import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='not-found-container'>
      <div className='status'>404</div>
      <div className='description'>Сторінка не знайдена</div>
      <div className='link'><Link to='/'>Перейти на головну сторінку<span className='pi pi-external-link link-icon'></span></Link></div>
    </div>
  )
}
