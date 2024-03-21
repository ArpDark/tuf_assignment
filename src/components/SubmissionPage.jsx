import { useState,useEffect } from "react";
import axios from "axios";
import qs from "qs";

const SubmissionPage=()=>{
    const apiUrl=import.meta.env.VITE_BACKEND_URL;
    const [submittedData,setSubmittedData]=useState([]);


    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{

        const result= await axios.get(apiUrl+"/allsubmissions");
        // console.log(result.data);
        setSubmittedData(result.data);
    }

    function replaceWithBr(sentence) {
        return sentence.replace(/\n/g, "<br />");
    }

    return(
        <div className="flex flex-col w-full border border-black rounded-t-md">
            <div className="flex justify-around  font-semibold text-lg">
                <p className="flex justify-center bg-purple-200 border border-black w-full">Username</p>
                <p className="flex justify-center bg-purple-200 border border-black w-full">Code Language</p>
                <p className="flex justify-center bg-purple-200 border border-black w-full">Stdin</p>
                <p className="flex justify-center bg-purple-200 border border-black w-full">Time of Submission</p>
                <p className="flex justify-center bg-purple-200 border border-black w-full">Stdout</p>
            </div>
            {submittedData.map((data)=>(
                <div className="flex flex-col border-2 border-black">
                    <div className="flex justify-around">
                        <p>{data.username}</p>
                        <p>{data.codelanguage}</p>
                        <p dangerouslySetInnerHTML={{__html: replaceWithBr(data.stdin)}}/>
                        <p>Time of Submission</p>
                    </div>

                    <p className="font-semibold text-lg">Code:</p> 
                    <p className="" dangerouslySetInnerHTML={{__html: replaceWithBr(data.code.substring(0,100))}}/>
                    
                </div>
            ))}
        </div>
    );
}

export default SubmissionPage;