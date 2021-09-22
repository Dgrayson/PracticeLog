import './App.css';
import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [showEntryForm, setEntryForm] = useState(false); 
  const [log, setLog] = useState([{songName: "Tifa's theme", instrument: "Piano", length: 60, date: "9-9-99"}, {songName: "Tifa's theme", instrument: "Piano", length: 60, date: "9-9-99"}]); 

  const toggleEntryForm = () => {
    setEntryForm(!showEntryForm); 
    console.log(showEntryForm); 
  }

  const SendData = (data) => {
    //console.log(data); 

    var newLog = [{}]

    
    log.forEach(element => newLog.push(element)); 
    newLog.push(data); 

    console.log(newLog); 

    setLog(newLog); 

    console.log("Added new log"); 
  }

  if(showEntryForm){
    return (
      <div className="App">
        <PracticeLog data={log} />
        <EntryForm ToggleEntryForm={toggleEntryForm} SendData={SendData} />
        <Button onClick={toggleEntryForm}>Add New Entry+</Button>
      </div>
    );
  }
  else
  {
    return (
      <div className="App">
        <PracticeLog data={log}/>
        
        <Button onClick={toggleEntryForm}>Add New Entry+</Button>
      </div>
    );
  }
}

const PracticeLog = (props) => {

  const RenderTable = (data) => {
    return (
      <tr>
        <td>{data.songName}</td>
        <td>{data.instrument}</td>
        <td>{data.length}</td>
        <td>{data.date}</td>
      </tr>
    ); 
  }

  return (
    <div>
      <Table striped bordered hover>
        <tr>
          <th>Song</th>
          <th>Instrument</th>
          <th>Length</th>
          <th>Date</th>
        </tr>
        {
          props.data.map(data => RenderTable(data))
        }
      </Table>
    </div>
  ); 
}

const EntryForm = (props) => {

  const ToggleForm = () => {
    props.ToggleEntryForm(); 
  }

  const SubmitForm = () => {

    let totalTime = 0; 
    totalTime = parseInt(document.getElementById('hours').value) * 60 + parseInt(document.getElementById('minutes').value); 

    // Send new entry to database
    let data = {
      songName: document.getElementById('song-name-input').value,
      instrument: document.getElementById('instrument-select').value,
      length: totalTime, 
      date: Date.now()
    }

    props.SendData(data); 
    props.ToggleEntryForm(data); 
  }
  return (
    <div id="form-component"> 
      <Form className="entry-form">
        <Form.Group>
          <Form.Label>Song Title</Form.Label>
          <Form.Control type="text" id="song-name-input"/>
        </Form.Group>

        <Form.Select aria-label="Default select example" id="instrument-select">
          <Form.Label>Instrument</Form.Label>
          <option selected disabled>Instrument...</option>
          <option value="Piano">Piano</option>
          <option value="Guitar">Guitar</option>
          <option value="Trumpet">Trumpet</option>
        </Form.Select>

        <Form.Group>
          <Form.Label>Practice Length</Form.Label>
          <Form.Control type="number" id="hours"/>
          <Form.Text>Hours</Form.Text>

          <Form.Control type="number" id="minutes"/>
          <Form.Text>Minutes</Form.Text>
        </Form.Group>

        <Button onClick={SubmitForm}>Add Entry</Button>
        <Button onClick={ToggleForm} variant="danger">Cancel</Button>
      </Form>
    </div>

  ); 
}; 

export default App;
