import React, {useState, useEffect} from 'react'
import { useAuth } from './AuthContext'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const [errors, setErrors] = useState({})
    const [emailID, setEmailID] = useState('')
    const [passwd, setPasswd] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { currentUser, login } = useAuth()

    useEffect(() => {
        if (currentUser){
            history.push('/')
        }
        else{
            setPasswd("test123");
            setEmailID("test@gmail.com")
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        try{
            await login(emailID, passwd)
            history.push('/')
        }
        catch{
            setErrors({total: "Failed to login"})
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
                        Login
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-4">
                            <label htmlFor="emailId">Email address:</label>
                            <input type="email" className="form-control" id="emailId" 
                                value={emailID} onChange={(e) => setEmailID(e.target.value)}
                                placeholder="Enter email id" required />
                            {errors && errors.email && <small id="emailErrors" className="form-text text-danger">
                                {errors.email}
                            </small>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="passwd1">Enter Password</label>
                            <input type="password" className="form-control" id="passwd1" 
                                value={passwd} onChange={(e) =>  setPasswd(e.target.value)}
                                placeholder="******" minLength={6} required/>
                            {errors && errors.passwd && <small id="passwdErrors" className="form-text text-danger">
                                {errors.passwd}
                            </small>}
                        </div>
                        <p className='text-muted mt-2 mb-3'>
                            Default Credentials appear here are test credentials, please use carefully
                        </p>
                        <button type="submit" 
                        disabled={loading}
                        className="btn btn-primary">
                            Login</button>
                    </form>

                    
                </div>
            </div>
            <p className='text-center my-3'>
                No shortTube account? 
                {" "}<a href='/register' className='not-link text-primary'>Signup here</a>
            </p>
        </div>
    )
}
