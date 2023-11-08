import React, { useEffect, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu';
import { useLocation, useNavigate } from 'react-router-dom';
        

export default function Navbar() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname){
      case '/':
        setIndex(0);
        break;
      case '/schedule':
        setIndex(1);
        break;
      case '/documentation':
        setIndex(2);
        break;
      case '/settings':
        setIndex(3);
        break;
      default:
        setIndex(0);
        break;
    }

  })
  function ChangePage(e){
    setIndex(e.index)
    if(items[index].to){
      navigate(items[e.index].to);
    }
  }
  const items = [
    {label: 'Головна', icon: 'pi pi-fw pi-home', to: '/'},
    {label: 'Розклад', icon: 'pi pi-fw pi-calendar', to:'/schedule'},
    {label: 'Документація', icon: 'pi pi-fw pi-file', to:'/documentation'},
    {label: 'Налаштування', icon: 'pi pi-fw pi-cog', to:'/settings'},
  ];
  return (
    <>
      <TabMenu model={items} activeIndex={index} onTabChange={(e) => ChangePage(e)}></TabMenu>
    </>
  )
}
