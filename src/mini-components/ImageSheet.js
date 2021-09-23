import React from 'react'

export default function ImageSheet({image, title}) {
    return (
        <div className={"panel-horizontal-card"}>
            <img src={image} className='img-mini-rounded' alt={title} />
            <p className='mx-4'>{title}</p>
        </div>
    )
}
