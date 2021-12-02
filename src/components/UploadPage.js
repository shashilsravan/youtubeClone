import React, {useState, useEffect} from 'react'
import '../stylesheets/UploadPage.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
import firebaseDB from '../firebase'
import S3FileUpload from 'react-s3';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../user-management/AuthContext';

export default function UploadPage() {
    const [ytName, setYtName] = useState('')
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState(0)
    const [video, setVideo] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()

    const history = useHistory()

    useEffect(() => {
        if (currentUser == null){
            history.push('/login')
        }
        else{
            setYtName(currentUser.split('@')[0])
        }
    }, [currentUser])

    const stich = (each) => {
        return each.replaceAll(' ', '_')
    }

    function uploadData(thumb, vid){
        return new Promise((resolve, reject) => {
            const config = {
                bucketName: process.env.REACT_APP_BUCKET_NAME,
                region: process.env.REACT_APP_REGION,
                dirName: stich(ytName) + '/' + stich(title) ,
                accessKeyId: process.env.REACT_APP_ACCESS_ID,
                secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
            }
            let newObj = {}
            S3FileUpload.uploadFile(thumb, config).then(data => {
                newObj['videoThumbail'] = data.location
                S3FileUpload.uploadFile(vid, config).then(data1 => {
                    newObj['videoUrl'] = data1.location
                    resolve(newObj)
                })
            })
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        if (title.length < 12){
            toast.error('Title of the video should be minimum of length 12 letters')
            setTitle('')
        }
        if (ytName.length < 3){
            toast.error('Name of the channel should contain minimum of 3 letters')
            setYtName('')
        }
        if (ytName.trim().length > 3 && title.trim().length > 11 &&
            duration < 36 && video !== null && thumbnail !== null){
            let created_on = new Date()
            uploadData(thumbnail, video).then((response) => {
                firebaseDB.child('video-uploads').push({
                    ytName, title, duration, 
                    video: response.videoUrl.replaceAll(' ', '%20'), 
                    thumbnail: response.videoThumbail.replaceAll(' ', '%20'), 
                    created_on
                }, err => {console.log(err)})
                setLoading(false)
            })
        }
        else{
            setLoading(false)
            toast.error('Error submitting the details please refresh the page and fill the form again')
        }
    }

    const handleVideo = (e) => {
        var file = e.target.files[0];
        if (file && file.type !== "video/mp4"){
            toast.error('Please make sure that uploaded video is of mp4 format')
            e.target.value = null;
        }
        else if (file && file.size > 4904495){
            toast.error('Please make sure that uploaded video size is <5 MB')
            e.target.value = null;
        }
        else if (file){
            var reader = new FileReader();
            reader.onload = function() {
                var media = new Audio(reader.result);
                media.onloadedmetadata = function(){
                    if (media.duration > 31){
                        toast.error('Please make sure that the video you uploaded is less than 30 seconds')
                        e.target.value = null
                    }
                    else{
                        setDuration(media.duration)
                    }
                };    
            };
            reader.readAsDataURL(file)
            setVideo(file)
        }
    }

    const handleThumbnail = (e) => {
        var file = e.target.files[0];
        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png"){
            if (file && file.size > 2004495){
                toast.error('Please make sure that uploaded Image size is <2 MB')
                e.target.value = null;
            }
            else{
                setThumbnail(file)
            }
        }
        else{
            toast.error('Improper image format')
            e.target.value = null;
        }
    }

    const handleText = (e) => {
        const name = e.target.name;
        if (name === 'title'){
            setTitle(e.target.value)
        }
        else if (name === 'channel'){
            setYtName(e.target.value)
        }
    }
    return (
        <div className='upload-page p-5'>
            {loading ? 
                <p>Loading...</p>
            :
            <>
            <h4>Upload content</h4>
            
            <Form onSubmit={handleSubmit} className='mt-4'>
                <Form.Group className="mb-4" controlId="formBasicTitle">
                    <Form.Label>Title of the video:</Form.Label>
                    <Form.Control type="text" required
                        value={title}
                        onChange={handleText} name='title'
                        placeholder="Hack NASA with HTML in 5 minutes" />
                    <Form.Text className='text-muted'>
                        Title should contain minimum of 12 letters
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicName">
                    <Form.Label>Channel Name:</Form.Label>
                    <Form.Control type="text" required
                        value={ytName} disabled />
                    <Form.Text className='text-muted'>
                        Channel name taken from ur email
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formThumbnail" className="mb-4">
                    <Form.Label>Thumbnail of the video: </Form.Label> <br />
                    <Form.Control type="file" className='form-control' 
                        onChange={handleThumbnail}/>
                    <Form.Text className='text-muted'>
                        Image size should be less than 2MB
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formVideo" className="mb-4">
                    <Form.Label>Upload video: </Form.Label> <br />
                    <Form.Control type="file" className='form-control'
                    onChange={handleVideo} required />
                    <Form.Text className='text-muted'>
                        The uploaded video must be less than 4MB and with maximum duration of 30 seconds
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> 
            <div className='my-4'>
                <a href='https://shorttube.s3.amazonaws.com/shashilsravan.ss.ss/Jerry_dancing/WhatsApp%20Video%202021-09-19%20at%206.43.23%20PM.mp4' 
                target='_blank' className='text-primary not-link' download>click here</a> to download sample video file to upload
            </div>
            </>}
        </div>
    )
}
