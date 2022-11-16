//import React from 'react';
import PostsItem from './PostsItem';
import {Link} from 'react-router-dom';
import { deletePost } from '../api/api';
import './Posts.css'
import { useEffect, useState } from 'react';

const Posts = ({posts, setPost, token}) => {
  console.log("posts", posts);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState('post')

  useEffect(() => {

    if (searchTerm) {

      const searchTerms = searchTerm.toLocaleLowerCase().trim().split(' ');
      const filtered = posts.filter((postObject) => {

        const filterableValues = [
          postObject.description,
          postObject.location
        ];

        for (let value of filterableValues) {
          const valueLower = value.toLocaleLowerCase().trim();

          for (let term of searchTerms) {

            if (valueLower.length > 0 && term.length > 0 && valueLower.includes(term)) {
              return true;
            }
          }
        }
         
        return false;

      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleDeleteClick = async (postid) => {
    await deletePost(token, postid);
    setPost((prevPosts) =>
      prevPosts.filter((posts) => posts.id != postid) 
    );
  };

  return (<>
    <div className='ui icon input'>
     <input type="text" placeholder='Search'
       value={searchTerm}
       onChange={(event) => setSearchTerm(event.target.value)}></input>
       <i className='search icon'></i> 
    </div> 
    <Link to="posts/create" className='ui button'>Create Post</Link>
    <div className='posts-container' >
        {posts.map((item) => {
          return (
               <PostsItem key={item._id} post={item}
                 headerElement={item.isCreator ? <div className='right floated aligned tiny header'>Mine</div> : null}          
          >
          {item.isCreator ? (
            <button onClick={() => handleDeleteClick(item.id)}
              className="negative ui button left floated"
             
              >
               Delete
            </button>
          ) : null}
                </PostsItem>
          );
        })};
    </div>
    </>
  );
};

export default Posts;