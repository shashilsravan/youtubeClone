import React, {useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { useHistory } from 'react-router-dom'

export default function Signup() {
    const [errors, setErrors] = useState({})
    const [emailID, setEmailID] = useState('')
    const [passwd1, setPasswd1] = useState('')
    const [passwd2, setPasswd2] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { signup, currentUser } = useAuth()

    useEffect(() => {
        if (currentUser){
            history.push('/')
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        if (passwd1 !== passwd2){
            setErrors({
                ...errors, passwd2: 'Passwords not matched'
            })
        }
        else{
            setErrors({})
            try{
                await signup(emailID, passwd1)
                history.push('/')
            }
            catch{
                setErrors({total: "something error occured please try later"})
            }
        }
        setLoading(false)
    }
    return (
        <div className='container p-5 my-5'>
            { errors && errors.total && <div className="alert alert-danger" role="alert">
                {errors.total}
            </div>}
            <div className='card p-4'>
                <div className='card-body'>
                    <h3 className='text-center my-3'>
                        Register for shortTube
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-4">
                            <label htmlFor="emailId">Email address:</label>
                            <input type="email" className="form-control" id="emailId" 
                                value={emailID}
                                onChange={(e) => setEmailID(e.target.value)}
                                placeholder="Enter email id" required />
                            {errors && errors.email && <small id="emailErrors" className="form-text text-danger">
                                {errors.email}
                            </small>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="passwd1">Enter Password</label>
                            <input type="password" className="form-control" id="passwd1" 
                                value={passwd1}
                                onChange={(e) =>  setPasswd1(e.target.value)}
                                placeholder="******" minLength={6} required/>
                            {errors && errors.passwd1 && <small id="passwdErrors" className="form-text text-danger">
                                {errors.passwd1}
                            </small>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="passwd2">Re-enter Password</label>
                            <input type="password" className="form-control" id="passwd2" 
                                value={passwd2}
                                onChange={(e) =>  setPasswd2(e.target.value)}
                                placeholder="******" minLength={6} required/>
                            {errors && errors.passwd2 && <small id="passwd2Errors" className="form-text text-danger">
                                {errors.passwd2}
                            </small>}
                        </div>
                        <button type="submit" 
                        disabled={loading}
                        className="btn btn-primary">
                            Register</button>
                    </form>
                </div>
            </div>
            <p className='text-center my-3'>
                Already created shortTube account? 
                {" "}<a href='/login' className='not-link text-primary'>Login here</a>
            </p>
        </div>
    )
}
