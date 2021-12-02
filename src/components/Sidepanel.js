import React, {useState, useEffect} from 'react'
import '../stylesheets/Sidepanel.css'
import HomeIcon from '@material-ui/icons/Home';
import IconSheet from '../mini-components/IconSheet'
import ImageSheet from '../mini-components/ImageSheet'
import {data} from '../data/subscriptions'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import SlowMotionVideoOutlinedIcon from '@material-ui/icons/SlowMotionVideoOutlined';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import SportsCricketOutlinedIcon from '@material-ui/icons/SportsCricketOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import { useHistory } from 'react-router-dom'

export default function Sidepanel({sidebar}) {
    const [accordion, setAccordion] = useState(true)
    const [pathh, setPathh] = useState('home')
    const switchAccordion = () => {
        setAccordion(!accordion)
    }

    const history = useHistory()
    
    useEffect(() => {
        if (window.location.pathname === '/'){
            setPathh('home')
        }
        else if (window.location.pathname === '/explore'){
            setPathh('explore')
        }
        else if (window.location.pathname === '/upload'){
            setPathh('upload')
        }
        
    }, [history])
    
    return (
        <>
        {!sidebar ? 
            <div className='sidepanel-half'>
                <ul className='panel-list'>
                    <li>
                        <a href='/' className='not-link'>
                            <div className='panel-card'>
                                <HomeIcon /> <p>Home</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href='/explore' className='not-link'>
                            <div className='panel-card'>
                                <ExploreOutlinedIcon/> <p>Explore</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <div className='panel-card'>
                            <SubscriptionsOutlinedIcon /> <p>Subscriptions</p>
                        </div>
                    </li>
                    <li>
                        <a href='/upload' className='not-link'>
                            <div className='panel-card'>
                                <VideoLibraryOutlinedIcon /> <p>Library</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        : <div className='sidepanel-full'>
                <a href='/' className='not-link'>
                    <IconSheet icon={<HomeIcon style={{fontSize: 24}} />} title={"Home"} selected={pathh === 'home'} />
                </a>
                <a href='/explore' className='not-link'>
                    <IconSheet icon={<ExploreOutlinedIcon style={{fontSize: 24}} />} title={"Explore"} selected={pathh === 'explore'}/>
                </a>
                <a href='/upload' className='not-link'>
                    <IconSheet icon={<SubscriptionsOutlinedIcon style={{fontSize: 24}} />} title={"Upload a Video"} selected={pathh === 'upload'}/>
                </a>
                <hr />
                <p className='ms-4 text-muted' style={{fontSize: 12}}>
                    Below is Static content <br />
                    Placed to show exact UI of youtube
                </p>
                <IconSheet icon={<VideoLibraryOutlinedIcon style={{fontSize: 24}} />} title={"Library"}/>
                <IconSheet icon={<HistoryOutlinedIcon style={{fontSize: 24}} />} title={"History"}/>
                <IconSheet icon={<OndemandVideoOutlinedIcon style={{fontSize: 24}} />} title={"Your videos"}/>
                <IconSheet icon={<WatchLaterOutlinedIcon style={{fontSize: 24}} />} title={"Watch later"}/>
                <IconSheet icon={<ThumbUpAltOutlinedIcon style={{fontSize: 24}} />} title={"Liked videos"}/>
                {accordion ? (
                    <div className="panel-horizontal-card" onClick={switchAccordion}>
                        <KeyboardArrowDownOutlinedIcon style={{fontSize: 24}} />
                        <p className='mx-4'>Show more</p>
                    </div>
                ) : (<>
                    <IconSheet icon={<PlaylistPlayOutlinedIcon style={{fontSize: 24}} />} title={"Playlist"}/>
                    <IconSheet icon={<PlaylistPlayOutlinedIcon style={{fontSize: 24}} />} title={"Favourites"}/>
                    <IconSheet icon={<SlowMotionVideoOutlinedIcon style={{fontSize: 24}} />} title={"Mix - Song ABC"}/>
                    <div className="panel-horizontal-card" onClick={switchAccordion}>
                        <ExpandLessOutlinedIcon style={{fontSize: 24}} />
                        <p className='mx-4'>Show fewer</p>
                    </div></>
                )}
                <hr />
                <span className='yt-upperfont'>subscriptions</span>
                {data.map(each => 
                    <ImageSheet key={each.id}
                        image={each.img} title={each.title} />
                )}
                <hr />
                <span className='yt-upperfont'>more from youtube</span>
                <IconSheet icon={<YouTubeIcon style={{fontSize: 24}} />} title={"YouTube Premium"} />
                <IconSheet icon={<MovieOutlinedIcon style={{fontSize: 24}} />} title={"Films"} />
                <IconSheet icon={<SportsEsportsOutlinedIcon style={{fontSize: 24}} />} title={"Gaming"} />
                <IconSheet icon={<OndemandVideoOutlinedIcon style={{fontSize: 24}} />} title={"Live"} />
                <IconSheet icon={<EmojiObjectsOutlinedIcon style={{fontSize: 24}} />} title={"Learning"} />
                <IconSheet icon={<SportsCricketOutlinedIcon style={{fontSize: 24}} />} title={"Sports"} />
                <hr />
                <IconSheet icon={<SettingsOutlinedIcon style={{fontSize: 24}} />} title={"Settings"} />
                <IconSheet icon={<FlagOutlinedIcon style={{fontSize: 24}} />} title={"Report history"} />
                <IconSheet icon={<HelpOutlineOutlinedIcon style={{fontSize: 24}} />} title={"Help"} />
                <IconSheet icon={<FeedbackOutlinedIcon style={{fontSize: 24}} />} title={"Send feedback"} />
                <hr />
                <div className='px-3 footer-box'>
                    <span className='yt-minifont'>About</span>
                    <span className='yt-minifont'>Press</span>
                    <span className='yt-minifont'>Copyright</span>
                    <span className='yt-minifont'>Contact us</span>
                    <span className='yt-minifont'>Creator</span>
                    <span className='yt-minifont'>Advertise</span>
                    <span className='yt-minifont'>Developers</span>
                    <div className='my-3'></div>
                    <span className='yt-minifont'>Terms</span>
                    <span className='yt-minifont'>Privacy</span>
                    <span className='yt-minifont'>Policy & safety</span>
                    <span className='yt-minifont'>How YouTube works</span>
                    <span className='yt-minifont'>Test new features</span>
                </div>
                <div className='my-3'></div>
                <span className='px-3 yt-lightfont'>© 2021 Google LLC</span>
                
          </div>
        }
        </>
    )
}