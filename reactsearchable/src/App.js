import './App.css';
import React, { useState, useEffect, Button} from 'react';
import axios from 'axios';

function App() {

  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);
  let page = 1;
  useEffect(() => {axios('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20').then(
    response => 
  {
    console.log(response.data);
    setAllData(response.data);
    setFilteredData(response.data);
  }).catch(error => 
    {
      console.log('Error getting fake data: ' + error);
    })}, []);

    const handleSearch = (event) => 
    {
      let value = event.target.value.toLowerCase();
      let result = [];
      console.log(value);
      result = allData.filter((data) => 
      {
        return data.title.search(value) != -1;
      });
        setFilteredData(result);
    }

    const styles = {
      display:'inline',
      width:'20%',
      float:'left',
      padding:5,
      margin:20,
      border:'0.5px solid gray',
      marginBottom:10,
      marginRight:10,
      borderRadius:20,
      height:330,
      color:'gray',

    }
    const searchBox = {
         borderRadius:20,
         height:'40px',
         width:'80%',
         paddingLeft:15,
         background:'white',
    }

    const leftAlign = {
      textAlign: 'left',
      padding:3,
      paddingLeft:12
    }

       return (
    <div className="App">
      <div style={{padding:30,}}>
        <label></label><input placeholder="Search" style={searchBox} type="text" onChange={(event) =>handleSearch(event)} />
      </div>

      <div style={{paddingTop:20, paddingLeft:90, paddingRight:100, width:'100%'}}>
        {filteredData.map((value,index)=>
          {
            return(
            <div style={styles} key={value.id}>
              <div><img style={{borderRadius:10}} src={`https://picsum.photos/200?random=${value.id}`} alt="image"></img></div>
               <div style={leftAlign}>User ID: {value.userId}</div>
               <div style={leftAlign}>Title : {value.title.substring(0,20)+"..."}</div>
               <div style={leftAlign}>Likes: 1</div>
               <div style={{marginTop:7}}>
                <a style={{padding:3,border:'0.5px solid gray', borderRadius:20, paddingLeft:60,paddingRight:60}}>
                  Like Post
                </a>
              </div>
            </div>
            )
          }
        )}

    
      </div>

      <div>
        <a style={{padding:3,border:'0.5px solid gray', background:'white', color:'black', borderRadius:20, paddingLeft:60,paddingRight:60}}>
                  Load More Posts
        </a>
      </div>

    </div>
    

      );
}

export default App;
