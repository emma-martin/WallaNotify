import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import axios from 'axios';
import Navbar from './components/Navbar';


function App() {

  const [data, setData] = useState([]);
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await axios('http://localhost:3000/users');
      setData(results.data);
    };
    fetchResults();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await axios('http://localhost:3000/searches');
      console.log(results);
      setSearches(results.data);
    };
    fetchResults();
  }, []);
  let username;
  data[0] ? username = data[0].username : username = '';

  return (
    <div className="App">
      <header className="App-header">
        <Navbar username={username} />
        <section className="section columns is-medium">
            <div className="column container is-half">
              <ul className="list is-hoverable">
                {searches.map(item => (
                  <li key={item.id} className="list-item">
                    <a href="/">
                      {item.kws}
                    </a>
                    <button className="button is-small is-pulled-right is-danger">
                      <span className="icon">
                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button className="button is-small is-primary">
                <span className="icon">
                  <i className="fas fa-plus" aria-hidden="true"></i>
                </span>
              </button>
            </div>
        </section>
      </header>
    </div>
  );
}


export default App;
