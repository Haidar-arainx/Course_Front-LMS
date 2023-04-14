import { useEffect } from "react";
import { useState } from "react";
import { GetRequestApi } from "../../services/ApiRequests";

const title = "Post Category";

// const categoryList = [
//     {
//         text: 'Python',
//         count: '06',
//         link: '#',
//     },
//     {
//         text: 'Financial Analysis',
//         count: '11',
//         link: '#',
//     },
//     {
//         text: 'AWS Certification',
//         count: '07',
//         link: '#',
//     },
//     {
//         text: 'Photoshop',
//         count: '09',
//         link: '#',
//     },
//     {
//         text: 'Ethical Hacking',
//         count: '50',
//         link: '#',
//     },
//     {
//         text: 'JWeb Development',
//         count: '20',
//         link: '#',
//     },
//     {
//         text: 'Cyber Security',
//         count: '93',
//         link: '#',
//     },
// ]

const PostCategory = () => {
    const [CategoryList, setCategoryList] = useState([]);
    useEffect(() => {
        GetRequestApi('get_blog_category').then((res) => {
          setCategoryList(res.data.categories);
        });
      }, []);

    return (
        <div className="widget widget-category">
            <div className="widget-header">
                <h5 className="title">{title}</h5>
            </div>
            <ul className="widget-wrapper">
                {CategoryList && CategoryList.map((val, i) => (
                    <li key={i}>
                        <a href="#" className="d-flex flex-wrap justify-content-between"><span><i className={"icofont-double-right"}></i>{val.title?.en}</span><span>{val?.count}</span></a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default PostCategory;