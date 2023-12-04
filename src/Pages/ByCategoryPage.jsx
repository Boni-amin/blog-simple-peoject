import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import Loader from "../Component/Loader";
import BlogList from "../Component/BlogList";
import {postByCategory} from "../APIRequest/APIRequest.js";


const ByCategoryPage = () => {

    let {categoryID}=useParams();

    let [list,SetList]=useState(null);

    useEffect(()=>{
        (async ()=>{
            let res= await postByCategory(categoryID);
            SetList(res);
        })()

    },[categoryID])

    return (
        <Layout>
            {list===null?<Loader/>:<BlogList list={list} />}
        </Layout>
    );
};

export default ByCategoryPage;