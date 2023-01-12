import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../../firebase/firebase';


const auth = getAuth(app);

const RegisterRB = () => {

    const [passwordError, setPasswordError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleRegister = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        if (password.length < 6) {
            setPasswordError('at lest 6 characters');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                verifyEmail();
                updateUserName(name);
            })
            .catch(error => {
                console.error('error', error);
                setPasswordError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('please check your email and verify')
            })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('display name updated')
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='w-50 mx-auto'>
            <Form onSubmit={handleRegister}>
                <h3 className='text-primary'>Please Register!!!</h3>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Your Name</label>
                    <input type="text" name='name' className="form-control" id="formGroupExampleInput" placeholder="Your Name" required />
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>user create success</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>already have an account? Please <Link to='/login'>login</Link></small></p>
        </div>
    );
};

export default RegisterRB;