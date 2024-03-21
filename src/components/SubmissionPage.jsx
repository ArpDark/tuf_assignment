import { useState,useEffect } from "react";
import axios from "axios";

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
        <div className="flex flex-col w-full border text-white font-semibold border-sky-500 rounded-t-md">
            <div className="flex justify-around  font-semibold text-lg">
                <p className="flex justify-center bg-sky-950  border border-l-2 border-sky-500 w-1/5">Username</p>
                <p className="flex justify-center bg-sky-950  border border-l-2 border-sky-500 w-1/5">Code Language</p>
                <p className="flex justify-center bg-sky-950  border border-l-2 border-sky-500 w-1/5">Stdin</p>
                <p className="flex justify-center bg-sky-950  border border-l-2 border-sky-500 w-1/5">Time of Submission</p>
                <p className="flex justify-center bg-sky-950  border border-l-2 border-sky-500 w-1/5">Stdout</p>
            </div>
            {submittedData.map((data)=>(
                <div className="flex flex-col bg-sky-800   w-full">
                    <div className="flex justify-around">
                        <p className="flex w-1/5 justify-center border-2 border-sky-500">{data.username}</p>
                        <p className="flex w-1/5 justify-center border-2 border-sky-500">{data.codelanguage}</p>
                        <p className="flex w-1/5 justify-center border-2 border-sky-500" dangerouslySetInnerHTML={{__html: replaceWithBr(data.stdin)}}/>
                        <p className="flex w-1/5 justify-center border-2 border-sky-500">{data.submissiondate}</p>
                        <p className="flex w-1/5 justify-center border-2 border-sky-500">{data.stdout}</p>
                    </div>

                    <p className="font-semibold text-lg">Code:</p> 
                    <p className="" dangerouslySetInnerHTML={{__html: replaceWithBr(data.code.substring(0,100))}}/>
                    
                </div>
            ))}
        </div>
    );
}

export default SubmissionPage;