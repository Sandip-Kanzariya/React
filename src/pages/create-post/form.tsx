import React from 'react'

import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { Form, Button, Col } from 'react-bootstrap';

import {yupResolver}from "@hookform/resolvers/yup";

import {addDoc, collection} from "firebase/firestore";

import { auth, db } from '../../config/firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from 'react-router-dom';

// interface in typescript for form field type

interface CreatePostData {
  title : string;
  description : string;
}

export const CreateForm = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const { register, handleSubmit, formState:{errors} } = useForm<CreatePostData>({
    resolver : yupResolver(schema),
  });

  const postRef = collection(db, "posts");
  const onCreatePost = async (data : CreatePostData) => {
    await addDoc(postRef, {
      // title : data.title,
      // description : data.description,
      ...data,

      username : user?.displayName,
      userId : user?.uid,
    });

    navigate("/");
  };

  return (
    <div className="container mt-3 justify-content-center">

    
    <Form onSubmit={handleSubmit(onCreatePost)}>
    <Form.Group controlId="title">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter title"
        {...register('title')}
        isInvalid={!!errors.title}
        className="mb-3 form-control-sm" // Add form-control-sm for smaller input box
      />
      <Form.Control.Feedback type="invalid">
        {errors.title?.message}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Enter description"
        {...register('description')}
        isInvalid={!!errors.description}
        className="mb-3 form-control-sm" // Add form-control-sm for smaller input box
      />
      <Form.Control.Feedback type="invalid">
        {errors.description?.message}
      </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>

    /*
    <form onSubmit={handleSubmit(onCreatePost)}> 
        <input placeholder='Title...' {...register("title")}/>
        <p style={{color : "red"}}>{errors.title?.message}</p>
        <br/>
        <textarea placeholder='Description...'{...register("description")}/>
        <p style={{color : "red"}}>{errors.description?.message}</p>
        <br/><br/>
        
        <input type='submit'/>
        
    </form>
    */
  )
};
