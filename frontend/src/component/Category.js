import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Category = () => {

    const[categoryList, setCategoryList] = useState([]);
    const[isLoading, setLoading] = useState(false);
    const[hasError, setHasError] = useState(false);
    const[error, setError] = useState('');

    let navigate = useNavigate();
    const detailRoute =(id)=>{
       navigate('/dashboard/detail/'+id);
    }
     const editRoute =(id)=>{
       navigate('/dashboard/edit/'+id);
    }
    const deleteData =(id,imgLink)=>{
      if(window.confirm('Are you sure to delete?')){
        axios.delete('http://localhost:8000/category/?'+'id='+id+'&imageUrl='+imgLink)
        .then(res=>{
            console.log(res);
            window.alert('Deleted successfully');
            getData();
        })
        .catch(err=>{
            console.log(err);
        })
    }
   
}
const getData =()=>{
    axios.get('http://localhost:8000/category',{
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    })
        .then(res =>{
            setHasError(false);
            setLoading(false);
            console.log(res.data.category);
            setCategoryList(res.data.category);
        })
        .catch(err =>{
            console.dir(err);
            setLoading(false);
             console.dir(err.response.data.message);
             setHasError(true);
             setError(err.response.data.msg);
            
        })
}

    useEffect(()=>{
        setLoading(true);
        getData();
    },[]);
    console.log(categoryList);
  return (
    <>
       {isLoading &&<div className="loader-container">
        <img className="loader-img" src= {loader}/>
    </div>}
     
    {!isLoading && !hasError &&<div>
    <h1 className="category-heading">Category list</h1>
    <table className="category-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Detail</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
        {categoryList?.map(data=><Row key={data._id}  detailReq={detailRoute} editReq={editRoute} deleteReq={deleteData} detail={data}/>)}
            </tbody>
    </table>
    </div>}
    {hasError &&<div>
        <p style={{color:'red'}}>Error: {error}</p>
        </div>}
    

    </>
  )
}
const Row =(props)=>{
    return(
        <tr>
            <td>{props.detail.name}</td>
            <td><img className="category-image" src={props.detail.photo}/></td>
            <td><button className="detail-btn" onClick={()=>{props.detailReq(props.detail._id)}}>Detail</button></td>
            <td><button className="edit-btn" onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
            <td><button className="delete-btn" onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>
    
        </tr>
    )

}

export default Category