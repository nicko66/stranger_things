import React from 'react'

const Home = ({username}) => {
    console.log("username", username)
  return (
    <>
    <h1>Welcome to Strangers Things</h1>
    {username && <h3>You are logged in as: {username}</h3>}
    </>
  )
};

export default Home;