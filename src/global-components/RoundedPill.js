import React from 'react'

export default function RoundedPill({selected, text}) {
    return (
        <a href="/" className={selected ? "rounded-pill selected" : 'rounded-pill'}>
            {text}
        </a>
    )
}
