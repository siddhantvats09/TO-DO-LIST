
import Form from 'react-bootstrap/Form';
import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [topic, settopic] = useState('')
  const [note, setnote] = useState('')
  const [list, setlist] = useState([])
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [state, setstate] = useState(false)
  const [editIndex, setEditIndex] = useState(-1);

function dates(){
  
    
  const dat = new Date();
  const showTime = dat.getHours()
      + ':' + dat.getMinutes()
      + ":" + dat.getSeconds();

  const showdate = dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();    
      settime(showTime)
      setdate(showdate)
}
  const handelsubmit=(e)=>{
    e.preventDefault()
    const newobj={topic,note,date,time,state}
    setlist([...list,newobj])
    saveToLocalStorage(list);
    console.log(list)
    setnote('')
    settopic('')
    setstate(false)
  
  }

  
  const saveToLocalStorage = (data) => {
    localStorage.setItem('todoList', JSON.stringify(data));
  };

  const retrieveFromLocalStorage = () => {
    const data = localStorage.getItem('todoList');
    if (data) {
      setlist(JSON.parse(data));
    }
  };

  useEffect(() => {
    retrieveFromLocalStorage();
  }, []);

useEffect(()=>{

  dates()
},[handelsubmit])
  


  const deletelst =(index)=>{
    const updatedUsers = [...list];
    updatedUsers.splice(index, 1);
    setlist(updatedUsers);
    saveToLocalStorage(updatedUsers);
  }
  const editlst =(index)=>{
    setEditIndex(index);
    const updatedList = [...list];
    updatedList[index].note = note;
    setlist(updatedList)
    saveToLocalStorage(updatedList);
    setnote('')
  }
  const donelst = (index) => {
    const updatedList = [...list];
    updatedList[index].state = true;
    setlist(updatedList);
     saveToLocalStorage(updatedList);
  };
  return (

    <>
    <div className="App">

    <h1>TO-DO-LIST APP</h1>
    <h2>Its a To Do app that helps you to track your Progress </h2>
    <p>Don't let your tasks go unorganized, make a to-do list today!</p>
    
    <p>There is a Unique Feature if want to edit first you need to write in Note/Taks field and then press Edit Button </p>
    <Form >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='lable'>Topic</Form.Label>
        <Form.Control className='topic' value={topic} onChange={(e)=> settopic(e.target.value.toUpperCase())} type="text" placeholder="Heading...." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='lable'>Note/Task</Form.Label>
        <Form.Control className='note' value={note} onChange={(e)=> setnote(e.target.value)} type='text' placeholder='Type your text here....'/>
      </Form.Group>
    </Form>
    <button className='button' onClick={handelsubmit}>
      ADD-TO-LIST
    </button>
    </div>


      {
        list.map((lists,index)=>(
          <div className='card' key={index}>
          <div className={`${lists.state ? 'statusb box1 maptopic' : 'box1 maptopic'}`} key={index}>
          <h1 className='maptopic'>{index+1}  </h1><h1 className='maptopic'> .  {lists.topic}</h1>
          </div>
          
          <h2  className={`${lists.state ? 'status' : 'mapnote'}`} key={index}>{lists.note} </h2>
        
          <pre className='pre'>
           <div className="box1 maptopic">
           <h3 className='maptime'>Date :{lists.date}</h3> <p className='pre'>    </p><h3 className='maptime'>Time :{lists.time}</h3>
           </div>
           </pre>
          <div className="btn maptopic">
            <button className='bbn delete' onClick={()=>deletelst(index)}>Delete</button>
            <button className='bbn edit' onClick={()=>editlst(index)}> Edit</button>
            <button className='bbn done' onClick={()=>donelst(index)}>Mark As Done</button>
          </div>
          </div>
        ))
      }
    </>
  );
}

export default App;


