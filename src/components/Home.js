import { onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { colRef} from "../firebase";
import { Blog } from "./Blog";

const Home = ()=>{

    const [blogs,setBlogs] = useState([]);

    useEffect(()=>{
        const q = query(colRef,orderBy('createdAt','desc'))
        onSnapshot(q,(snapshot)=>{
            const blogs = snapshot.docs.map((doc)=>{
                return {'id':doc.id,...doc.data()}
                
            })
            setBlogs(blogs)
        })
    },[])

    return (
        
        <div className="container">
            <h1 className="text-center fst-italic fs-5 mt-3 mb-3">Latest Blogs</h1>
            <hr />
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {
                    blogs.map((blog)=>{
                        return <Blog 
                                    key={blog.id} 
                                    title={blog.title} 
                                    subTitle = {blog.subTitle} 
                                    createdAt = {blog.createdAt.toDate().toDateString()} 
                                    blogId = {blog.id}
                                />
                    })
                }
            </div>

        </div>
    );
}

export default Home;