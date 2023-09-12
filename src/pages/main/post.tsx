import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';

import { Post as IPost } from "./main";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost;
}

interface Like {
  likeId : string;
  userId: string;
}
export const Post = (props: Props) => {
  // display Post
  const { post } = props;

  // For like post
  const likesRef = collection(db, "likes");
  const [likes, setLikes] = useState<Like[] | null>(null);

  // Currently logged user : userId
  const [user] = useAuthState(auth);

  // Display likes
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId,  likeId : doc.id})));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });

      // This is for suddenly change of like count on UI
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid , likeId : newDoc.id}] : [{ userId: user.uid, likeId : newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Unlike
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);

      if (user) { 
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Thumsup & ThumsDown : flag
  const hasUserLikes = likes?.find((like) => like.userId === user?.uid);

  // Function Call
  useEffect(() => {
    getLikes();
  }, []);

  return (
<Card className="m-3" style={{ border: '1px solid DodgerBlue', borderRadius: '8px', boxShadow: '0px 0px 6px 0px #bbb' }}>
      <Card.Body>
        <Card.Title className="title">
          <h4 className="mb-3">{post.title}</h4>
        </Card.Title>
        <Card.Text className="body">
          <p>{post.description}</p>
        </Card.Text>
        <Card.Text className="footer">
          <p className="text-muted">@{post.username}</p>
        </Card.Text>
        <Button
          variant={hasUserLikes ? 'danger' : 'primary'}
          onClick={hasUserLikes ? removeLike : addLike}
          className="w-40"
        >
          {hasUserLikes ? 'Unlike' : 'Like'}
        </Button>
        {likes && (
          <Card.Text className="mt-3">
            <small className="text-muted">Likes: {likes.length}</small>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
    /*
    <div
      style={{
        border: "3px solid DodgerBlue",
        marginBottom: "2px",
        marginTop: "2px",
      }}
    >
      <div className="title">
        <h4>{post.title}</h4>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
      </div>

      <button onClick={hasUserLikes ? removeLike : addLike}>
        {hasUserLikes ? <>&#128078;</> : <>&#128077;</>}
      </button>

      {likes && <p>Likes : {likes?.length}</p>}
    </div>
    */
  );
};
