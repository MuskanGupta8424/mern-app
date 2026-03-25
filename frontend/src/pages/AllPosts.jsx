import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const AllPosts = () => {
    const [posts,setPosts] = useState([]);

   const API_URL =  import.meta.env.VITE_BACKEND_URL
    useEffect(()=> {
        const fetchData = async()=>{
           try{ const res = await fetch(`${API_URL}/posts`,{
                method:"GET",
                   headers: {
                        "Content-Type": "application/json",
                    }
            })
            const data =await res.json();
            setPosts(data.post)
        }
        catch(error){
            console.error("An error occurred", error)    
        }
        }
        fetchData()
    },[])


    const handleDeletePost = useCallback(
      async(id)=>{
      const res  = await fetch(`${API_URL}/post/${id}`,{
        method:"DELETE",
      })

      const data =await res.json();
      if(res.ok){
         setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
          alert("Post deleted successfully!");
      }
    },[])
  return (
    <>
    <div className='feed-section'>
        <h1>All Feeds</h1>
      <section className='cards'>
      { posts.length>0 ?(posts.map((post)=>(
        <div key={post._id} className='card'>
            <div className='img-section'>
           <img src={post.image} alt="post-image" /> 
           </div>
            <p>{post.caption}</p>
            <span className='deletebtn' onClick={()=>handleDeletePost(post._id)}>Delete</span>
        </div>
      ))):(
        <h1>No Post Available.</h1>
      )}
      </section>
      </div>
    </>
  );
}

export default AllPosts;
