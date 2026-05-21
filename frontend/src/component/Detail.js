import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loader from '../assets/loader.gif';

const Detail = () => {
    const[category, setCategory] = useState({});
    const[isLoading, setLoading] = useState(false);
    const[hasError, setHasError] = useState(false);
    const[error, setError] = useState('');
     
    let params = useParams();
    console.log(params.id);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8000/category/'+params.id)
            .then(res=>{
                console.log(res.data.category);
                setCategory(res.data.category);
                setLoading(false);
                setHasError(false);
            })
            .catch(err=>{
                console.log(err);
                setLoading(false);
                setHasError(true);
                setError(err.response.data.message);
            })
        

    },[])
  return (
    <>
    {isLoading &&<div className="loader-container">
        <img className="loader-img" src= {loader}/>
    </div>}
    { !isLoading  && !hasError&&<div>
       <img  style ={{width:'250px'}}src={category.photo} />
       <h1>{category.name}</h1>
    </div>}
     
     {hasError &&<div>
        <p style={{color:'red'}}>Error: {error}</p>
        </div>}
    </>
  )
}

export default Detail