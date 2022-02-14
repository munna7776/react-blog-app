import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { colRef } from "../firebase";



const BlogDetail = ()=>{
    const {blogId} = useParams()
    const [blogDetails,setBlogDetails] = useState({});

    useEffect(()=>{

        async function retreiveData(){
        const docSnap = await getDoc(doc(colRef,blogId));
        const data = docSnap.data();
        setBlogDetails(data)
        }

        retreiveData();

    },[])
    return (
        
        <div className="container mt-4 pt-4 text-center fst-italic">
             <h1>{blogDetails.title}</h1>
             <h3>{blogDetails.subTitle}</h3>
             <p>{blogDetails.details}</p>
        </div>
    );
}

export default BlogDetail;