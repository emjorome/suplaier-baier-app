import React from "react";

export const ContMenuTitle = ({ isOpen, onClick }) => {
  return (
    <div 
      className="explorarCat__title sidebar-section__header" 
      onClick={onClick}
      style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between', width: '100%'}}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <span className="material-symbols-rounded icon--md">list_alt</span>
        <p className="paragraph--mid--2"><b>Menú de ofertas</b></p>
      </div>
      
      <span 
        className="material-symbols-rounded arrow"
        style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s ease',
            color: '#9ca3af' 
        }}
      >
        expand_more
      </span>
    </div>
  )
}