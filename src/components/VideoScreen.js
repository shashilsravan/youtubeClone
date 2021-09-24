import React, {useEffect, useState, useRef} from 'react'
import '../stylesheets/VideoScreen.css'
import MiniYTCard from '../mini-components/MiniYTCard'
import { useParams } from "react-router-dom";
import firebaseDB from '../firebase'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import LoopIcon from '@material-ui/icons/Loop';
import PauseIcon from '@material-ui/icons/Pause';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Tooltip from '@material-ui/core/Tooltip';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular2BarIcon from '@material-ui/icons/SignalCellular2Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';

export default function VideoScreen() {
    let { vstring } = useParams();
    const history = useHistory()
    const playerr = useRef(null)

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [totalData, setTotalData] = useState({})
    const [randomRows, setRandomRows] = useState([])
    const [playing, setPlaying] = useState(false)
    const [played, setPlayed] = useState(0)
    const [playedSec, setPlayedSec] = useState(0)
    const [totalSec, setTotalSec] = useState(0)
    const [loop, setLoop] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [mute, setMute] = useState(false)

    useEffect(() => {
        firebaseDB.child('video-uploads').on('value', snapshot => {
            if (snapshot.val() != null){
                let tempData = snapshot.val()
                let keys = Object.keys(tempData)
                let count = 0
                let tempObj = {}
                keys.forEach(each => {
                    if (each == vstring){
                        count += 1
                        setData(tempData[each]);
                    }
                    tempObj = {
                        ...tempObj,
                        [each]: tempData[each]
                    }
                })
                setTotalData(tempObj)
                if (count == 0){
                    history.push("/")
                }
            }
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let tempRows = Object.keys(totalData)
        tempRows = shuffleArray(tempRows)
        setRandomRows(tempRows.splice(0, 6))
    }, [totalData])

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
                        
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        } 
        return array;
    }

    const handleProgress = state => {
        console.log('onProgress', state)
        setPlayed(state.played * 100)
        setPlayedSec(state.playedSeconds.toFixed(0))
      }

    const handlePlay = () => {
        setPlaying(!playing)
    }

    const handleLoop = () => {
        setLoop(!loop)
    }

    const handleMute = () => {
        if(mute){
            setMute(false)
            setVolume(0.5)
        }
        else{
            setMute(true)
            setVolume(0)
        }
    }

    const handleEnded = () => {
        console.log('onEnded')
    }
    
   const handleDuration = (duration) => {
        console.log('onDuration', duration)
        setTotalSec(duration.toFixed(0))
    }

    const handleOnChange = (e) => {
        playerr.current.seekTo((e/100), 'fraction')
    }

    const volChange = () => {
        if (volume == 0){
            setVolume(0.25)
            setMute(false)
        }
        else if (volume == 0.25){
            setVolume(0.5)
            setMute(false)
        }
        else if (volume == 0.5){
            setVolume(0.75)
            setMute(false)
        }
        else if (volume == 0.75){
            setVolume(1)
            setMute(false)
        }
        else if (volume == 1){
            setVolume(0)
            setMute(true)
        }
    }

    return (
        <div className='video-screen'>
            {!loading && data && 
            <div className='video-container'>
                <div className='video-section'>
                    <ReactPlayer height='100%' width='100%' playing={playing} ref={playerr}
                        onEnded={handleEnded} volume={volume}
                        onError={e => console.log('onError', e)} loop={loop}
                        onProgress={handleProgress} onDuration={handleDuration}
                        url={data.video.toString()} />
                    <div className='options'>
                        <div className='d-flex align-items-center'>
                            <button className='btn'
                                onClick={() => handlePlay()}>
                                {playing ? <PauseIcon /> : <PlayArrowIcon /> }
                            </button>
                            <h6 className='me-3 mt-2'> {`0:${playedSec} / 0:${totalSec}`} </h6>
                            <Slider value={played} max={100} orientation="horizontal"
                                onChange={handleOnChange} 
                                style={{width: "400 !important"}} />
                            <button className={`btn m-0 p-0 ${loop ? 'loop-on' : 'loop-off'}`}
                                onClick={() => handleLoop()}>
                                <Tooltip title={`loop is ${loop ? 'On' : 'Off'}`}>
                                    <LoopIcon />
                                </Tooltip>
                            </button>
                            <Tooltip title={`Volume is ${volume * 100}%`}>
                                <button className='btn fw-bold m-0 p-0 pb-1' onClick={() => volChange()}>
                                    {volume == 0 && <SignalCellular0BarIcon />}
                                    {volume == 0.25 && <SignalCellular1BarIcon />}
                                    {volume == 0.5 && <SignalCellular2BarIcon />}
                                    {volume == 0.75 && <SignalCellular3BarIcon />}
                                    {volume == 1 && <SignalCellular4BarIcon />}
                                </button>
                            </Tooltip>
                            <Tooltip title={`Mute is ${mute}`}>
                                <button className='btn m-0 p-0 pb-1' onClick={() => handleMute()}>
                                    {mute ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className='description-section'>

                    <h5 className='fw-normal'>
                        {data.title}
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <div className='d-flex align-items-center'>
                            <div className='Name-icon' 
                                style={{width:50, height:50, padding: "11px", fontSize: 20}}>
                                {data.ytName.toString().substring(0, 2)}
                            </div>
                            <h5 className='m-0 mx-2'>{data.ytName}</h5>
                        </div>
                        <button className='subscribe-btn'>Subscribe</button>
                    </div>
                    <hr />
                </div>
                <div className='recommendations-container'>
                    {randomRows.map(each => {
                        return (<MiniYTCard data={totalData[each]} urlTo={each} key={each} />)
                    })}
                </div>
            </div>}
        </div>
    )
}
