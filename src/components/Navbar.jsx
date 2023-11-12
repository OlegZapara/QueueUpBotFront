import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { SpeedDial } from 'primereact/speeddial';
import { Button } from 'primereact/button';
import './Navbar.css'
        

export default function Navbar() {
  const navigate = useNavigate();

  const items = [
    {label: 'Головна', icon: 'pi pi-fw pi-home', command: () => navigate('/')},
    {label: 'Розклад', icon: 'pi pi-fw pi-calendar', command: () => navigate('/timetable')},
    {label: 'Документація', icon: 'pi pi-fw pi-file', command: () => navigate('/documentation')},
    {label: 'Налаштування', icon: 'pi pi-fw pi-cog', command: () => navigate('/settings')},
  ];

  const end = <button className='avatar-button' onClick={() => console.log('avatar')}><Avatar className='avatar' size='large' image='/icon-1.png' shape='circle'></Avatar></button>

  return (
    <>
      <Menubar model={items} end={end}></Menubar>
    </>
  )
}
