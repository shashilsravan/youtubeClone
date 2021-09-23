import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import firebaseDB from '../firebase'
import MiniYTCard from '../mini-components/MiniYTCard'

export default function SearchPage() {
    let { val } = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebaseDB.child('video-uploads').on('value', snapshot => {
            if (snapshot.val() != null){
                let tempData = snapshot.val()
                let keys = Object.keys(tempData)
                let tempObj = {}
                keys.forEach(each => {
                    if(tempData[each].title.toLowerCase().includes(val.toLowerCase())){
                        tempObj = {
                            ...tempObj,
                            [each]: tempData[each]
                        }
                    }
                })
                setData(tempObj)
                setLoading(false)
            }
        })
    }, []) 

    return (
        <div className='m-4 my-5 py-2'>
            <h3>Search results for '{val}' : </h3>
            {!loading && data && (
                Object.keys(data).map(each => {
                    return(<MiniYTCard data={data[each]} urlTo={each} major key={each} />)
                })
            )}
        </div>
    )
}
