import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function App() {
  const [username, setUsername] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("C++");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const navigate=useNavigate();
  const apiUrl=import.meta.env.VITE_BACKEND_URL;

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      user:username,
      lang:codeLanguage,
      stdin:stdin,
      code:sourceCode,
      date:new Date()
    }
    console.log(data);
    const config = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: apiUrl+"/submit"
    };
    axios(config)
    .then((result)=>{
      console.log(result);
      navigate("/submission");
    })
    .catch((err)=>{
      console.log(err);
    });

  }

  return (
    <div className='flex justify-center max-w-screen overflow-y-auto bg-sky-950 text-white font-semibold'>
      <form className='flex flex-col items-center ' onSubmit={handleSubmit}>

        <div className=' flex w-full justify-around mt-6'>
          <div className='flex flex-col'>
            <label htmlFor='username'> Username:</label>
            <input type="text" name='username' className='text-white bg-sky-800 rounded-md border-2 border-sky-500' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='codeLang'> Preferred Code Language:</label>
            <select className='rounded-md border-2 border-sky-500 text-white bg-sky-800' value={codeLanguage} name='codeLang' onChange={(e) => setCodeLanguage(e.target.value)}>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='code'>Source Code:</label>
          <textarea name='code' className=' text-white bg-sky-800 border-2 border-sky-500' rows={15} cols={100} value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label htmlFor='input'>Standard Input (stdin):</label>
          <textarea value={stdin} className=' text-white bg-sky-800 border-2 border-sky-500' name='input' rows={4} cols={50} onChange={(e) => setStdin(e.target.value)} />
        </div>
        <button className=' my-8 rounded-md border-2 border-sky-500 bg-sky-800 w-1/4' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
