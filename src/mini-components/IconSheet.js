import React from 'react'

export default function IconSheet({icon, title, selected}) {
    return (
        <div className={selected ? "panel-horizontal-card selected" : "panel-horizontal-card"}>
            {icon}
            <p className='mx-4'>{title}</p>
        </div>
    )
}
