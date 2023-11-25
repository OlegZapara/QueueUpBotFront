import { Fieldset } from 'primereact/fieldset'
import React from 'react'
import './DocumentationPage.css'

export default function DocumentationPage() {
  return (
    <div>
      <Fieldset legend='Все про черги' className='fieldset'>
        <div><code>/queue [Назва]</code> - Створити чергу із заданою назвою<br/>
        Подальша взаємодія із чергами реалізується натисканням відповідних кнопок під повідомленням від боту:<br/>
        <ul>
          <li>- Join 🔰 - Доєднатися у кінець черги<br/></li>
          <li>- I'm done ✅ - Вийти з черги, і сповістити наступного<br/></li>
          <li>- Leave 🔄 - Вийти не з голови черги, без сповіщення<br/></li>
          <li>- Delete ❌ - Видалити чергу, лише для адміністраторів<br/></li>
          <li>- Notify ⚠ - Сповістити голову черги про його позицію<br/></li>
        </ul>
      </div>
      </Fieldset>
      <Fieldset legend='Все відносно поваги' className='fieldset'>
        <div>
          <code>/stats</code> - Переглянути загальну статистику поваги в цьому чаті<br/>
          <code>/me</code> - Переглянути власну статистику поваги в цьому чаті<br/>
          <code>/increase [@User] [к-сть]</code> - Додати користувачу повагу<br/>
          <code>/decrease [@User] [к-сть]</code> - Відняти повагу в користувача<br/>
          <code>/shop</code> - Збільшити щоденний ліміт кредитів<br/>
        </div>
      </Fieldset>
      <Fieldset legend='Все відносно розкладу' className='fieldset'>
        <div>
          <code>/feed</code> - Згенерувати посилання на веб-редактор<br/>
          <code>/today</code> - Подивитися розклад на сьогодні<br/>
          <code>/week</code> - Подивитися розклад на тиждень<br/>
        </div>
      </Fieldset>
      <Fieldset legend='Все відносно завдань' className='fieldset'>
        <div>
          <code>/task [dd.mm.year] [HH:mm] [Назва] [Посилання]</code> - Створити<br/>
          <code>/edit [ID] dd.mm.year HH:mm [Назва] [Посилання]</code> - Редагувати<br/>
          <code> /whatisduetoday</code> - Список усіх завдань<br/>
        </div>
      </Fieldset>
    </div>
  )
}
