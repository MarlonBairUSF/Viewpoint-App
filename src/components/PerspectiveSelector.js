import React from 'react';
import './PerspectiveSelector.css';

export const perspectives = [
  {
    id: 'conservative',
    name: 'Republican',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742924043/cons_b7ufrv.webp'
  },
  {
    id: 'democratic',
    name: 'Democratic',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742924216/DemocraticLogo_fgpvvt.webp'
  },
  {
    id: 'libertarian',
    name: 'Libertarian',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742923959/LibertarianLogo_rv7zhq.webp'
  },
  {
    id: 'green',
    name: 'Green',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742924370/GreenLogo_wrubnt.webp'
  },
  {
    id: 'constitution',
    name: 'Constitution',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742924477/consti_iqjorm.png'
  },
  {
    id: 'democraticSocialist',
    name: 'Democratic Socialist',
    image: 'https://res.cloudinary.com/dh5csqdyn/image/upload/v1742924641/demsoci_rina5u.png'
  }
];

function PerspectiveSelector({ onSelect, selected }) {
  return (
    <div className="perspective-selector">
      <h2>Select a Political Perspective</h2>
      <div className="perspective-grid">
        {perspectives.map((perspective) => (
          <div 
            key={perspective.id}
            className={`perspective-card ${selected === perspective.id ? 'selected' : ''}`}
            onClick={() => onSelect(perspective.id)}
          >
            <img 
              src={perspective.image} 
              alt={perspective.name} 
              className="perspective-image"
            />
            <h3>{perspective.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerspectiveSelector; 