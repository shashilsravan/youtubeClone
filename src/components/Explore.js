import React, {useEffect, useState} from 'react'
import '../stylesheets/Explore.css'
import ExploreCard from '../mini-components/ExploreCard'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import MiniYTCard from '../mini-components/MiniYTCard'
import firebaseDB from '../firebase'

export default function Explore() {
    const [loading, setLoading] = useState(true)
    const [totalData, setTotalData] = useState({})
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
                setTotalData(tempObj)
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
        <div className='explore-container'>
            <div className='explore-cards-section'>
                <ExploreCard icon={faFire} 
                    content='Trending' color='#F83F37' />
                <ExploreCard icon={faMusic} 
                    content='Music' color='#FFC33D' />
                 <ExploreCard icon={faGamepad} 
                    content='Gaming' color='#FA6938' />
                 <ExploreCard icon={faNewspaper} 
                    content='News' color='#2678FA' />
                 <ExploreCard icon={faFilm} 
                    content='Films' color='#9E7DFB' />
                <ExploreCard icon={faTshirt} 
                    content='Fashion & beauty' color='#DC73D9' />
                <ExploreCard icon={faLightbulb} 
                    content='Learning' color='#4BA526' /> 
                <ExploreCard icon={faHeadphones} 
                    content='Live' color='#45C1A1' />  
                <ExploreCard icon={faTrophy} 
                    content='Sport' color='#3579FA' />
            </div>
            <hr className='mx-5' />
            <div className='trending-videos'>
                <h5>Trending videos </h5>
                {!loading && randomRows.length > 1 && randomRows.map(each => {
                    return(<MiniYTCard data={totalData[each]} 
                            urlTo={each} major key={each} />)
                })}
            </div>
        </div>
    )
}
