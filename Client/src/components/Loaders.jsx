import { ClipLoader } from "react-spinners";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "../Loader.css"
import {HashLoader} from "react-spinners";
import Typed from "typed.js";
import {useGSAP} from "@gsap/react";

export const Loaders = () => {
const textRef = useRef(null);
const headRef = useRef(null);
useEffect(() => {
    const typed = new Typed(textRef.current,{
        strings:[
            "Clearance","document verification","campus safety - Powered By Blockchain"
        ],
        typeSpeed:40,
        backSpeed:20,
        backDelay:300,
        loop:true,
    });
    return () => {
        typed.destroy();
    }

},[])

    useGSAP(()=>{
      const tl = gsap.timeline({
          repeat: -1,
          repeatDelay:1,

      });
      tl.from(".logo",{
          y:-20,
          opacity:0,
          duration:0.7,
          ease:"back.out(1.7)",
          rotation:-90,
      })
          .from(".title",{
              x:30,
              opacity:0,
              duration:1,
              ease:"power3.out",
          }, "-=0.2");
    },{scope:headRef});


    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
            <HashLoader
                color="#2563eb"
                size={40}
            />

            <div className="text-center">
               <div className="flex items-center gap-3" ref={headRef}>
                   <img src="/logo.png" alt="CampusFlow" className="logo w-12 h-12" />
                   <h1 className="text-5xl font-bold text-navy title">
                       Campus<span className="text-blue-600">Flow</span>
                   </h1>
               </div>
                <p className="text-gray-500 text-sm mt-1 font-medium" >
                    Taking Stress Out of <span className="text-blue-600" ref={textRef}></span>
                </p>
            </div>


        </div>
    );
};

export default Loaders;