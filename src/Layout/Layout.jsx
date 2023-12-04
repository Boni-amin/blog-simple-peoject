import {useEffect, useState} from 'react';
import {postCategories} from "../APIRequest/APIRequest.js";
import {NavLink} from "react-router-dom";


// useState
// useEffect
// useRef


const Layout = (props) => {

    const [categories,SetCategories]=useState([]);
    useEffect(()=>{
        (async ()=>{
          if(sessionStorage.getItem('categories')){
              let res=sessionStorage.getItem('categories');
              SetCategories(JSON.parse(res));
          }
          else{
              let res= await postCategories();
              SetCategories(res)
              sessionStorage.setItem('categories',JSON.stringify(res))
          }
        })()
    },[])


    return (
        <div>
          
            <div className="navbar bg-base-100 shadow">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to={"/"}>হোম</NavLink></li>
                        {
                            categories.map((item,index)=>{
                                return <li key={index.toString()}><NavLink  to={"/byCategory/"+item['id']}>{item['name']}</NavLink></li>
                            })
                        }
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><NavLink to={"/"}>হোম</NavLink></li>
                        {
                            categories.map((item,index)=>{
                                return <li key={index.toString()}><NavLink  to={"/byCategory/"+item['id']}>{item['name']}</NavLink></li>
                            })
                        }
                    </ul>
                </div>
            </div>

            {props.children}

        </div>
    );
};

export default Layout;