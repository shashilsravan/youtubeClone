import React, {useEffect, useState} from 'react'
import YTCard from '../global-components/YTCard'
import firebaseDB from '../firebase'

export default function YoutubeBody() {

    const [data, setData] = useState({})
    const [randomRows, setRandomRows] = useState([])

    useEffect(() => {
        firebaseDB.child('video-uploads').on('value', snapshot => {
            if (snapshot.val() != null){
                let tempData = snapshot.val()
                let keys = Object.keys(tempData)
                let tempObj = {}
                keys.forEach(each => {
                    tempObj = {
                        ...tempObj,
                        [each]: tempData[each]
                    }
                })
                let temp = Object.keys(tempObj)
                temp = shuffleArray(temp)
                setData(tempObj)
                setRandomRows(temp)
            }
        })
    }, []) 

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
        <div className='yt-body'>
           {randomRows.map(each => {
               return <YTCard key={each} data={data[each]} urlTo={each} />
           })}
        </div>
    )
}
