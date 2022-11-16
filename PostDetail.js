import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {addComment} from '../api/api';
import PostsItem from './PostsItem';

const PostDetail = (props) => {
    const { token, post, getPosts } = props;
    const { postId } = useParams();
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const singlePost = post.find((onePost) => {
        const foundPost = onePost.id == postId;
        return foundPost;
    });

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const { success, error, comment } = await addComment(token, postId, commentText);

        if (success) {
            setCommentText('');
            
            console.log('we successfully added a comment!');

            await getPosts();
        } else {
            setErrorMessage(error);
            console.log('failed to add a comment');
        }
    };

    if (!singlePost) {
        return <p>Loading...</p>;
    }

    return (<>
        <PostsItem posts={singlePost} />
        <form className="comment-form" onSubmit={handleOnSubmit}>
            <input type="text" placeholder="New Comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}/>
            <button type="submit">Send</button>
            {errorMessage ? 
                <p style={{color: 'red', backgroundColor: 'pink'}}>Operation Failed: {errorMessage}</p>
                : null}
        </form>
    </>);
};

export default PostDetail;