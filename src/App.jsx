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
    <div className='flex justify-center max-w-screen overflow-y-auto'>
      <form className='flex flex-col items-center border-2 border-emerald-400' onSubmit={handleSubmit}>

        <div className=' flex w-full justify-around'>
          <div className='flex flex-col'>
            <label htmlFor='username'> Username:</label>
            <input type="text" name='username' className=' border-2 border-black' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='codeLang'> Preferred Code Language:</label>
            <select className='border-2 border-black' value={codeLanguage} name='codeLang' onChange={(e) => setCodeLanguage(e.target.value)}>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='code'>Source Code:</label>
          <textarea name='code' className='border-2 border-black' rows={15} cols={100} value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label htmlFor='input'>Standard Input (stdin):</label>
          <textarea value={stdin} className='border-2 border-black' name='input' rows={4} cols={50} onChange={(e) => setStdin(e.target.value)} />
        </div>
        <button className=' my-4 border-2 border-black w-1/4' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
