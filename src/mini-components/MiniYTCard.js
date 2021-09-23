import React from 'react'

export default function MiniYTCard({data, major, urlTo}) {
    return (
        <div className={major ? 'yt-maxi-card' : 'yt-mini-card'}>
                <div className='yt-card-image'>
                    <a href={`/videos/${urlTo}`} className='not-link'>
                        <img src={data.thumbnail} />
                    </a>
                    <p className='duration'>{`0:${data.duration.toString().substring(0, 2)}`}</p>
                </div>
                <div className='yt-card-description'>
                    <h6 className=''>
                        { data.title }
                    </h6>
                    <p className='text-muted m-0' style={{fontSize: 14}}>
                        {data.ytName}
                    </p>
                    <p className='text-muted m-0' style={{fontSize: 14}}>
                        30M views 
                    </p>
                </div>
        </div>
    )
}
