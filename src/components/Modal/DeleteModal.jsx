"use client";
import React from 'react'
import {AlertDialog, Button} from "@heroui/react";
import { Trash } from 'lucide-react';
import { redirect } from "next/navigation";

const DeleteModal = ({destination}) => {
     const { destinationName,_id} = destination
    const handleDelete =async()=>{
    const res = await fetch(`http://localhost:5000/destination/${_id}`,{
        method:"DELETE",
        headers:{
            "content-type":"Application/json"
        }
    })
    const data = await res.json()
    redirect('/destinations')
    console.log(data)
    }
   
  return (
    <div>
      
    <AlertDialog>
      <Button className="text-red-700 rounded-none" variant="outline"><Trash></Trash> Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>

    </div>
  )
}

export default DeleteModal
