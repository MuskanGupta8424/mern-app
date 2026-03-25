import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"

const CreatePost = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_BACKEND_URL 
    const [post, setPost] = useState({
        image:null,
        caption:"",
    });

    const createPost = useCallback(async(e) =>{
        e.preventDefault(); //prevent form submission refresh
       
        try{
            
            const formData = new FormData(e.target);
        
            const response = await fetch(`${API_URL}/create-post`,{
                method:"POST",
                body:formData
            })
            if(!response.ok){
                throw new Error("Failed to create post")
            }
            const data =await response.json();
            // console.log(data);
            navigate("/");
            setPost({
                image:null,
                caption:''
            })
            // alert('Post created successfully!');

        } catch(err){
            console.log("An error occurred", err)
        }
    },[post])

    //handle input change
const handleChange = (e) =>{
    const {name, value} = e.target;
    setPost((prev)=>({
        ...prev,
        [name]:value
    }))
}


  return (
    <>
      <section className='create-post-section'>
        <h1>Create Post</h1>
        <form className='form' onSubmit={createPost}>
            <label>Upload image</label>
            <input type='file' name="image" accept='image/*' />
            <label>Caption</label>
            <input type='text' name="caption" placeholder='Enter caption' required />
            <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
}

export default CreatePost;
