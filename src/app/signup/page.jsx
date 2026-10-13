'use client'
import { Card } from '@heroui/react'
import React from 'react'
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
    const onSubmit =async(e)=>{
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const user = Object.fromEntries(formData.entries())

          const { data, error} = await authClient.signUp.email({
            email:user.email,
            name:user.name,
            password:user.password,
            image:user.image
          })
         
         

          if(data){
            redirect('/')
          }
          if(error){
            showToast.warning("Enter Your Valid Password!", {
    duration: 4000,
    progress: true,
    position: "top-right",
    transition: "slideInUp",
    icon: '',
    sound: true,
  });
          }
         
    }

      const handleGoogleSignIn=async()=>{
            await authClient.signIn.social({
            provider: "google",
            });
           

          }
  return (
    <div className='max-w-7xl mx-auto m-10'>
        <div className='text-center my-5'>
            <h1 className='text-3xl font-bold'>Create Account</h1>
            <p className='text-[12px] text-gray-400'>Start your adventure with Wanderlust</p>
        </div>
     <Card className='border rounded-none'>
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
             <TextField
        isRequired
        name="name"
        type="text"
        
      >
        <Label>Name</Label>
        <Input placeholder="Enter your Name" />
        <FieldError />
      </TextField>
       <TextField
        
        name="image"
        type="Url"
       
      >
        <Label>Image</Label>
        <Input placeholder="Enter your image" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
       
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
       
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex justify-center gap-2">
        <Button className={'rounded-none w-full'} type="submit">
         Create Account
        </Button>
        
      </div>
    </Form>
    <div className='text-center font-medium text-[12px] text-gray-600'><p>Or sign up with</p></div>
     <Button type='button' onClick={handleGoogleSignIn} variant='outline' className={'rounded-none w-full'} >
      <FcGoogle />
         Sign In With Google
        </Button>
     </Card>
    </div>
  )
}

export default SignUpPage
