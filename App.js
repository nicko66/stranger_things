import React, {useState, useEffect} from 'react';
import { AccountForm, Home, Posts, PostCreateForm, PostDetail } from './components';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { fetchPosts, fetchUsername } from './api/api';
import "./App.css"

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(
        window.localStorage.getItem("token")|| null
    );
    const [username, setUsername] = useState(null);

    const history = useHistory()
  
    const getPosts = async () => {
        const { error, posts } = await fetchPosts(token);
    
        if (error) {
          console.error(error);
        }
    
        setPosts(posts);
      };
    
      useEffect(() => {
        getPosts();
      }, [token]);
    

  useEffect(() => {
    if (token) {
        const getUsername = async () => {
            const {username} = await fetchUsername(token);
            console.log("username", username)
            setUsername(username);
          };
         getUsername(); 
    }
  }, [token])

useEffect(() => {
    if (token) {
     window.localStorage.setItem("token", token)
    } else {
     window.localStorage.removeItem("token")
    }
}, [token])

const logOut = () => {
    setToken(null);
    setUsername(null); 
    history.push("/");
};

  return (
  <div className="container">
      <nav className="ui secondary menu">
         <Link className="item" to="/">
            Home
         </Link>
         <Link className="item" to="/posts">
            Posts
         </Link>
         <div className='right menu'>
            {token ? (
                <button onClick={logOut} className='item'>
                    Log Out
                </button>
            ) : (
             <>
         <Link className="item" to="/account/login">
            Log In
         </Link>
         <Link className="item" to="/account/register">
            Sign Up
         </Link>
            </>
        )}
      
         </div>
      </nav>
      <Switch>
         <Route exact path="/">
            <Home username={username}/>
         </Route>
         <Route className="item" path="/posts/create">
            <PostCreateForm token={token} setPosts={setPosts} />
         </Route>
         <Route className="item" path="/posts/:postId">
            <PostDetail token={token} post={posts} getPosts={getPosts}/>
          </Route>
         <Route className="item" path="/posts">
            <Posts 
            posts={posts} 
            token={token}
            setPosts={setPosts}       
            />
         </Route>
         <Route path="/account/:action">
            <AccountForm setToken={setToken} />
         </Route>
      </Switch>
  </div>
  );
};

export default App;