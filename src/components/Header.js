import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import "../stylesheets/Header.css"
import YTName from '../mini-components/YTName'

export default function Header({handleSBClick}) {
    return (
        <div className="yt-header">
            <IconButton onClick={handleSBClick}>
                <MenuIcon style={{fontSize: 28}} />
            </IconButton>
            <YTName />
        </div>
    )
}
