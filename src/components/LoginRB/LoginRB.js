import React from 'react';
import { Link } from 'react-router-dom';

const LoginRB = () => {
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>please login!!!</h3>
            <form >
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Your Email</label>
                    <input type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Your Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <p><small>new to this website ? Please <Link to='/register'>Register</Link></small></p>
        </div>
    );
};

export default LoginRB;