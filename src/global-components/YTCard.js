import React from 'react'
import '../stylesheets/YTCard.css'

export default function YTCard({data, urlTo}) {
    let array = ['blue', 'green', 'purple', 'orange', '#2078F9', "#DC3B45",
        'indigo', 'purple', 'teal', 'pink', 'black', 'brown', 'violet']
    return (
        <a href={`/videos/${urlTo}`} className='not-link mx-auto my-2'>
            <div className='yt-card m-0 my-1'>
                <div className='image-section'>
                    <img alt='hello'
                        src={data.thumbnail} className='card-image' />
                    <span className='card-duration'>{`0:${data.duration.toString().substring(0, 2)}`}</span>
                </div> 
                <div className='content-section'>
                    <div className='channel-logo'>
                        <div className='Name-icon'
                            style={{padding: '6px', 
                                background: array[Math.floor(Math.random() * array.length)]}}>
                            {data.ytName.substring(0, 2)}
                        </div>
                    </div>
                    <div className='channel-details'>
                        <h4 className="card-title">
                            {data.title}
                        </h4>
                        <p className='card-user'>
                            {data.ytName}
                        </p>
                        <p className='card-info'>
                            79k Views • 2 years ago
                        </p>
                    </div>
                </div>
            </div>
        </a>
    )
}
