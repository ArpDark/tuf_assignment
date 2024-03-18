import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <div className='flex justify-center max-w-screen overflow-y-auto'>
      <form className='flex flex-col border-2 border-emerald-400' onSubmit={handleSubmit}>

        <div className=' flex justify-between'>
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

        <div>
          <label htmlFor='input'>Standard Input (stdin):</label>
          <textarea value={stdin} className='border-2 border-black' name='input' rows={4} cols={50} onChange={(e) => setStdin(e.target.value)} />
        </div>
        <button className='border-2 border-black' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App
