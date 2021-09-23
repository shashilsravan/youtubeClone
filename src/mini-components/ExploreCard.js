import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ExploreCard({icon, content, color}) {
    return (
        <div className='explore-card'>
            <FontAwesomeIcon icon={icon} className={`icon`} 
              style={{color: color}} />
            <p>{content}</p>
        </div>
    )
}
