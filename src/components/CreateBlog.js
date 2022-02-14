import { addBlog } from "../firebase";
import { useFormInputField } from "./CustomInputFieldHooks";
import './Style.css';
import { onSnapshot, orderBy, query,limit } from "firebase/firestore";
import { colRef} from "../firebase";
import { Blog } from "./Blog";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = ()=>{

    const title = useFormInputField('');
    const subTitle = useFormInputField('');
    const details = useFormInputField('');
    const [blogs,setBlogs] = useState([]);
    const [isvalid,setIsValid] = useState(true);
    const [disabled,setDisabled] = useState(false);

    useEffect(()=>{
        const q = query(colRef,orderBy('createdAt','desc'),limit(3))
        onSnapshot(q,(snapshot)=>{
            const blogs = snapshot.docs.map((doc)=>{
                return {'id':doc.id,...doc.data()}
                
            })
            setBlogs(blogs)
        })
    },[])

    const handleCreateBlog = async(e)=>{
        e.preventDefault();
        if(!title.value || !subTitle.value || !details.value){
            setIsValid(false)
            toast.error("Title,sub-title and details are required.");      
            setTimeout(()=>{setIsValid(true)},10000)
            return ;
        }
        try{
            setDisabled(true)
            await addBlog(title.value,subTitle.value,details.value)
            toast.success("Blog created successfully.")
            
        }
        catch(e){
            toast.error(e.message);
        }
        setDisabled(false)
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center fst-italic fs-4 mt-3 mb-3">Create Blog</h1>
                <hr></hr>
                <div className="mt-3">
                    <div className="card border-0 d-flex justify-content-center">
                        <div className="card-body">
                            <form className="mt-4" onSubmit={handleCreateBlog}>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label fs-4 fst-italic">Title</label>
                                    <div className="col-md-8">
                                        <input type="text" className={`form-control rounded ${!isvalid?'is-invalid':''}`} {...title} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label fs-4 fst-italic">Sub-title</label>
                                    <div className="col-md-8">
                                        <input type="text" className={`form-control rounded ${!isvalid?'is-invalid':''}`} {...subTitle} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label fs-4 fst-italic">Details</label>
                                    <div className="col-md-8">
                                        <textarea className={`form-control rounded ${!isvalid?'is-invalid':''}`} {...details} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12 d-flex justify-content-center" >
                                    <button disabled={disabled} className="btn btn-success btn-md">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 className="text-center fst-italic fs-4 mt-3 mb-3">Recent Blogs Added</h2>
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
            <ToastContainer 
                position= "top-right"
                autoClose= {5000}
                hideProgressBar= {false}
                closeOnClick= {true}
                pauseOnHover= {true}
                draggable= {true}
                progress= {undefined}
                theme="dark"
            />
        </>
    );
}


export default CreateBlog;