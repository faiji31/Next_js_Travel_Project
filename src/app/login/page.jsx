'use client'
import { Card } from '@heroui/react'
import React from 'react'
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';

const LoginPage = () => {
    const onSubmit =async(e)=>{
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const user = Object.fromEntries(formData.entries())

          const { data, error} = await authClient.signIn.email({
            email:user.email,
            password:user.password,
            
          })
          console.log({data,error})

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
  return (
    <div className='max-w-7xl mx-auto m-10'>
        <div className='text-center my-5'>
            <h1 className='text-3xl font-bold'>Login Your Account</h1>
            <p className='text-[12px] text-gray-400'>Start your adventure with Wanderlust</p>
        </div>
     <Card className='border rounded-none'>
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          
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
        <Button className={'rounded none w-full'} type="submit">
         Login
        </Button>
        
      </div>
    </Form>
     </Card>
    </div>
  )
}

export default LoginPage
