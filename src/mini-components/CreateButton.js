import React, {useState} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import GraphicEqSharpIcon from '@material-ui/icons/GraphicEqSharp';

export default function CreateButton() {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {setClicked(!clicked)}
    return (
        <div className='pos-relative'>
            <Tooltip title="Create">
                <IconButton onClick={handleClick}>
                    <VideoCallOutlinedIcon className='mx-2'
                            style={{color:'rgba(3,3,3,0.6)', fontSize:26, fontWeight: '100'}} />
                </IconButton>
            </Tooltip>
            {clicked && 
                <div className='yt-create py-3'>
                    <div className='panel-horizontal-card py-1 px-3'>
                        <VideoLibrarySharpIcon style={{fontSize: 24}} />
                        <p className='mx-4'>Upload Video</p>
                    </div>
                    <div className='panel-horizontal-card py-1 px-3'>
                        <GraphicEqSharpIcon style={{fontSize: 24}} />
                        <p className='mx-4'>Go live</p>
                    </div>
                </div>}
        </div>
    )
}
