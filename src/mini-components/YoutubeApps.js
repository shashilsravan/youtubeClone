import React, {useState} from 'react'
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import YouTubeIcon from '@material-ui/icons/YouTube';
import AppsIcon from '@material-ui/icons/Apps';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'

export default function YoutubeApps() {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {setClicked(!clicked)}

    return (
        <div className='pos-relative'>
            <Tooltip title="Youtube Apps">
                <IconButton onClick={handleClick}>
                    <AppsIcon className='mx-2'
                        style={{color:'rgba(3,3,3,0.6)', fontSize:26, fontWeight: '100'}} />
                </IconButton>
            </Tooltip>
            {clicked && 
                <div className='yt-apps py-3'>
                    <div className='panel-horizontal-card py-1 px-3'>
                        <LiveTvIcon style={{fontSize: 24}} className='font-red' />
                        <p className='mx-4'>YouTube TV</p>
                    </div>
                    <hr />
                    <div className='panel-horizontal-card py-1 px-3'>
                        <PlayCircleFilledRoundedIcon style={{fontSize: 24}} className='font-red' />
                        <p className='mx-4'>YouTube Music</p>
                    </div>
                    <div className='panel-horizontal-card py-1 px-3'>
                        <LiveTvIcon style={{fontSize: 24}} className='font-red tilt' />
                        <p className='mx-4'>YouTube Kids</p>
                    </div>
                    <hr />
                    <div className='panel-horizontal-card py-1 px-3'>
                        <YouTubeIcon style={{fontSize: 24}} className='font-red' />
                        <p className='mx-4'>Creator Academy</p>
                    </div>
                    <div className='panel-horizontal-card py-1 px-3'>
                        <YouTubeIcon style={{fontSize: 24}} className='font-red' />
                        <p className='mx-4'>YouTube for Artists</p>
                    </div>
                </div>}
        </div>
    )
}
