import React, {useEffect, useState} from 'react'
import '../stylesheets/VideoScreen.css'
import MiniYTCard from '../mini-components/MiniYTCard'
import { useParams } from "react-router-dom";
import firebaseDB from '../firebase'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'

export default function VideoScreen() {
    let { vstring } = useParams();
    const history = useHistory()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [totalData, setTotalData] = useState({})
    const [randomRows, setRandomRows] = useState([])

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

    return (
        <div className='video-screen'>
            {!loading && data && 
            <div className='video-container'>
                <div className='video-section'>
                <video width="320" height="240" autoPlay muted controls>
                    <source src={data.video.toString()} 
                        type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
