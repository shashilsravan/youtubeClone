import React, {useState, useEffect} from 'react'
import logo from '../assets/Ytname.png'
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import IconButton from '@material-ui/core/IconButton'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Tooltip from '@material-ui/core/Tooltip';
import YoutubeApps from './YoutubeApps';
import CreateButton from './CreateButton';
import UserField from './UserField'
import { useAuth } from '../user-management/AuthContext'

export default function YTName() {
    const [displaySB, setDisplaySB] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [user, setUser] = useState('none')
    const { currentUser } = useAuth()

    useEffect(() => {
        setUser(currentUser)
    }, [])

    const handleSearch = (e) => {
       window.location = `/search/${searchValue}`
    }

    return (
        <div className="mx-2 ytname">
            <div className='ytname-first'>
                <a href='/'>
                <img src={logo} className="ytname-image" alt="logo"></img></a>
            </div>
            <div className='ytname-second'>
                <div className='yt-searchbar'>
                    <input type='text' className='yt-search' value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search'/>
                    <button className='yts-button'
                        onClick={(e) => handleSearch(e)}><SearchIcon /></button>
                </div>
                <div>
                    <Tooltip title="Search with your voice">
                        <IconButton>
                            <MicIcon className='mic-icon' />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className='d-mobile'>
                <div className='custom-right'>
                    {displaySB ?
                    (
                    <>
                    <div className='mobile-search'>
                        <button className='button' onClick={() => setDisplaySB(!displaySB)}>
                            <KeyboardBackspaceIcon style={{fontSize: 30}} />
                        </button>
                        <input type='text' className='yt-search' 
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='Search Youtube'/>
                        <button className='button' onClick={(e) => handleSearch(e)}>
                            <SearchIcon style={{fontSize: 30}} />
                        </button>
                    </div>
                    <div className='black-screen'></div>                    
                    </>)
                    : (<><button className='button' onClick={() => setDisplaySB(!displaySB)}>
                        <SearchIcon style={{fontSize: 30}} />
                    </button>
                    <Tooltip title={`${user}`}>
                        <div className='Name-icon' style={{padding: '7px'}}>
                            {user.substring(0, 2)}
                        </div>
                    </Tooltip></>)}
                </div>
            </div>
            <div className='ytname-third'>
                <div className='d-flex align-items-center'>
                    <CreateButton />
                    <YoutubeApps />
                    <Tooltip title="Notifications">
                        <div className='pos-relative'>
                            <p className='notifi-count'> 5 </p>
                            <NotificationsNoneOutlinedIcon className='mx-2'
                                style={{color:'rgba(3,3,3,0.6)', fontSize:26, fontWeight: '100'}} />
                        </div>
                    </Tooltip>
                    <UserField />
                </div>
            </div>
        </div>
    )
}
