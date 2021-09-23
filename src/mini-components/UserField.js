import React, {useState, useEffect} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useAuth} from '../user-management/AuthContext'

export default function UserField() {
    const [clicked, setClicked] = useState(false)
    const [user, setUser] = useState('Shashil')
    const { currentUser, logout } = useAuth()

    useEffect(() => {
        if (currentUser){
            setUser(currentUser)
        }
        else{
            setUser('none')
        }
    }, [currentUser])

    const handleClick = () => {setClicked(!clicked)}

    const handleLogout = () => {
        setClicked(false)
        logout()
    }
    return (
        <div className='pos-relative'>
            <Tooltip title={`${user}`}>
                <IconButton onClick={handleClick}>
                    <div className='Name-icon'>
                        {user.substring(0, 2)}
                    </div>
                </IconButton>
            </Tooltip>
            {clicked && 
                <div className='yt-user py-3'>
                    {currentUser
                    ? <div className='panel-horizontal-card py-1 px-3'
                        onClick={() => handleLogout()}>
                        <ExitToAppIcon style={{fontSize: 24}} />
                        <p className='mx-4'>Sign out</p>
                    </div>
                    : <div className='panel-horizontal-card py-1 px-3'>
                    <ExitToAppIcon style={{fontSize: 24}} />
                    <a href='/login' className='mx-4 not-link'>Login</a>
                </div>}
                </div>}
        </div>
    )
}
