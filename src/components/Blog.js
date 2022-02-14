import { Link } from "react-router-dom";

export const Blog = (props)=>{
    const {title,subTitle,createdAt,blogId} = props;
    return (
        <div className="col">
            <div className="card">
            <div className="card-body">
                <Link to={`/blog/${blogId}`} className="card-title" style={styles.link}>{title}</Link>
                <p className="card-text" style={styles.p}>{subTitle}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">{createdAt}</small>
            </div>
            </div>
        </div>
    );
}

const styles={
    link:{
        marginBottom:'0.5rem',
        textDecoration:'none',
        fontSize:'2rem',
        color:'#746a63'
    },
    p:{
        color:'rgb(98 88 81)'
    }
}