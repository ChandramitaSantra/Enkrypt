import React, { Component } from "react";
import './Menue.css';

// returns def while a is -1, other case returns a
const withDefaultIndex = (a,def=0) => !-~a?def:a;

const curRouteIndex = (items) => {
  const { pathname } = window.location;
  return withDefaultIndex(items.findIndex(e=>e.href===pathname));
}

const renderItem = (
  onClick=(i)=>console.log('onClick', i), 
  hoverOn=(i)=>console.log('hoverOn', i), 
  hoverOff=(i)=>console.log('hoverOff', i),
  aSize,
) => ({className,title,href}, idx, items) => {
  return (
    <li 
      key={idx} 
      onMouseEnter={(e)=>{
        /* 
          The next lines are for research purposes around coordinates we can get from the event/DOM API.
          see also: https://javascript.info/coordinates
        */
        // console.log('Mouse Event at:', e.clientX, e.clientY);
        // console.log('Found Target:', document.elementFromPoint(e.clientX, e.clientY)); // only works if (x,y) are inside the visible area
        // console.log('Originat Target' ,e.target);
        // console.log('Target Bounds' ,e.target.getBoundingClientRect());
        hoverOn(idx)}} 
      onMouseLeave={()=>hoverOff(idx)}
    >
      <a 
        href={href}
        onClick={ ()=>onClick(idx) }
        style={{ width: `${aSize}%` }}
      >{title}</a>
    </li>
  )
}

const renderItems = (items, onClick, hoverOn, hoverOff, aSize) => items.map(renderItem(onClick, hoverOn, hoverOff, aSize))

export class Menu extends Component {
  constructor(props){
    super(props)
    const { config } = props
    this.state = {
      config,
      hoverIndex: -1,
      underlineSize: 100/config.length,
      selectedIndex: curRouteIndex(config),
    }
  }
  render() {
    const { selectedIndex, hoverIndex, underlineSize, config } = this.state;
    const underlineIdx = withDefaultIndex(hoverIndex, selectedIndex); 
    const underlineShift = underlineIdx * underlineSize
    return (
      <div className="menu-container" style={{ maxWidth: 400 }}>
        <ul>
          { renderItems(
              config, 
              (idx)=>this.setState({ selectedIndex: idx }), // onClick
              (idx)=>this.setState({ hoverIndex: idx }), // hoverOn
              (idx)=>this.setState({ hoverIndex: -1 }), // hoverOff
              underlineSize,
            ) 
          }
          <hr style={{ 
            marginLeft: `${underlineShift}%`,
            width: `${underlineSize}%`,
          }}/>
        </ul>
      </div>
    );
  }
};
