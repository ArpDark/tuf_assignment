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
                <p className="flex justify-center bg-purple-200 border border-black w-1/5">Username</p>
                <p className="flex justify-center bg-purple-200 border border-black w-1/5">Code Language</p>
                <p className="flex justify-center bg-purple-200 border border-black w-1/5">Stdin</p>
                <p className="flex justify-center bg-purple-200 border border-black w-1/5">Time of Submission</p>
                <p className="flex justify-center bg-purple-200 border border-black w-1/5">Stdout</p>
            </div>
            {submittedData.map((data)=>(
                <div className="flex flex-col border border-black w-full">
                    <div className="flex justify-around">
                        <p className="flex w-1/5 justify-center border border-gray-600">{data.username}</p>
                        <p className="flex w-1/5 justify-center border border-gray-600">{data.codelanguage}</p>
                        <p className="flex w-1/5 justify-center border border-gray-600" dangerouslySetInnerHTML={{__html: replaceWithBr(data.stdin)}}/>
                        <p className="flex w-1/5 justify-center border border-gray-600">{data.submissiondate}</p>
                        <p className="flex w-1/5 justify-center border border-gray-600">{data.stdout}</p>
                    </div>

                    <p className="font-semibold text-lg">Code:</p> 
                    <p className="" dangerouslySetInnerHTML={{__html: replaceWithBr(data.code.substring(0,100))}}/>
                    
                </div>
            ))}
        </div>
    );
}

export default SubmissionPage;