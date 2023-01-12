import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase';

const auth = getAuth(app);

const LoginRB = () => {

    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(error => {
                console.error('error', error)
            })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }
    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('please enter your email address')
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('password reset email sent')
            })
            .catch(error => {
                console.error('error', error)
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>please login!!!</h3>
            <form onSubmit={handleSubmit}>


                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Your Email</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Your Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            {
                success && <p>Successfully Login</p>
            }
            <p><small>new to this website ? Please <Link to='/register'>Register</Link></small></p>
            <p><small>Forget Password? <button type="button" onClick={handleForgetPassword} className="btn btn-link">Reset Password</button></small></p>
        </div>
    );
};

export default LoginRB;