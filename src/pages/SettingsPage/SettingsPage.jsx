import React, { useState } from 'react'
import './SettingsPage.css'
import { Card } from 'primereact/card'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

export default function SettingsPage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [telegramToken, setTelegramToken] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [botState, setBotState] = useState('active');

  function getBotStateSeverity(){
    switch (botState.toLowerCase()){
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'off':
        return 'danger';
      default:
        return '';
    }
  }

  return (
    <>
      <div className='settings-header'>
        <span>Налаштування</span><span className='bot-state'>СТАН БОТА:<Tag value={botState.toUpperCase()} severity={getBotStateSeverity()}></Tag></span>
      </div>

      <Card title='Налаштування бота' className='options-card'>

        {botState !== 'active' ? <div className='option'>
          <span>Відновити роботу бота</span>
          <Button severity='success' onClick={() => setBotState('active')} text raised><span className='pi pi-check'></span></Button>
        </div> : <></>}

        <div className='option'>
          <span>Перезапустити бота</span>
          <Button severity='info' text raised><span className='pi pi-refresh'></span></Button>
        </div>

        {botState !== 'paused' && botState !== 'off' ? <div className='option'>
          <span>Призупинити бота</span>
          <Button severity='warning' onClick={() => setBotState('paused')} text raised><span className='pi pi-pause'></span></Button>
        </div> : <></>}
        
        {botState !== 'off' ? <div className='option'>
          <span>Вимкнути бота</span>
          <Button severity='danger' onClick={() => setBotState('off')} text raised><span className='pi pi-power-off'></span></Button>
        </div> : <></>}
      </Card>
      <Card title='Налаштування вебсайту' className='options-card'>
        <div className='option'>
          <span>Темна тема</span>
          <InputSwitch checked={darkTheme} onChange={e => setDarkTheme(e.target.value)}/>
        </div>
      </Card>

      <Card title='Telegram Api settings' className='options-card'>
        <div className='option'>
          <span>Telegram bot token</span>
          <InputText value={telegramToken} onChange={e => setTelegramToken(e.target.value)}></InputText>
        </div>
        <div className='option'>
          <span>Telegram bot username</span>
          <InputText value={telegramUsername} onChange={e => setTelegramUsername(e.target.value)}></InputText>
        </div>
      </Card>
    </>
  )
}
