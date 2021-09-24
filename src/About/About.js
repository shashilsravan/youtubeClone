import React from 'react'
import Faq from 'react-faq-component';
import '../stylesheets/About.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';

export default function About() {

    const data = {
        title: "All about ShortTube",
        rows: [
          {
            title: "What's ShortTube",
            content: `ShortTube is a react based video streaming app developed 
                by sravan. shortTube is a shorter version of youtube 
                (a Youtube clone) but only for short videos i.e., you can 
                view/upload videos which are less than or equal to 30 seconds. It also user management, so you can try signing up and registering to shortTube etc`
          },
          {
            title: "Features of shortTube",
            content: `You can upload your favourite short videos. 
                You can even watch other's short videos. Search through the short 
                video lists. Responsive design - so you can easily access the shortTube 
                from your convinience. And more importantly a replica of youtube.
            `
          },
          {
            title: "Building Blocks of ShortTube",
            content: `As mentioned earlier, this is a React Application. 
            Coming to the images and video hosting, i have used aws-s3 buckets and
             the other data and user management is done via firebase. Material UI for the icons used in ShortTube.
            `
          },
          {
            title: "About the developer",
            content: `I am sravan, CS undergrad and an aspiring full stack developer. I am working as Ruby on Rails developer in Promptcloud. Find my all social media accounts from below section.`
          }]
      }
    
    return (
        <div className='container p-5 bg-white'>
            <Faq data={data}/>

            <div className='icons-section py-4 d-flex justify-content-center'>
                <Tooltip title={`linkedin profile`}>
                    <a href='https://www.linkedin.com/in/shashil-sravan-a5b201191/' 
                        className='not-link mx-2' target='_blank'>
                        <LinkedInIcon />
                    </a>
                </Tooltip>

                <Tooltip title={`github profile`}>
                    <a href='https://github.com/shashilsravan/' 
                        className='not-link mx-2' target='_blank'>
                        <GitHubIcon />
                    </a>
                </Tooltip>

                <Tooltip title={`My resume`}>
                    <a href='https://drive.google.com/file/d/1F2GmvoD_9aKVeFC1ni_0QJAEeTDZ6VRi/view?usp=sharing' 
                        className='not-link mx-2' target='_blank'>
                        <DescriptionIcon />
                    </a>
                </Tooltip>
            </div>
        </div>
    )
}
