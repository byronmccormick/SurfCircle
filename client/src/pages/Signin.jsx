import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userSlice';
import Oauth from '../components/Oauth';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch (error){
      dispatch(signInFailure(data.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:white text-4xl'>
            SurfCircle
          </Link>
          <p className='text-sm mt-5'>
            Welcome! Sign in with your email and password to get started. 
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email'/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='password' placeholder='***********' id='password' onChange={handleChange}/>
            </div>
            <Button type='submit' gradientDuoTone='greenToBlue' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <Oauth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'> Sign-Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
