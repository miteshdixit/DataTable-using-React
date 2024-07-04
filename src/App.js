/* eslint-disable no-unused-vars */
import './App.css';
import { useState } from 'react';
import Papa from 'papaparse';
import 'datatables.net-dt';
import Filter from './Filter';

function App() {
    const [loading, setLoad] = useState(false);
    const [filterdta , setFilterDta] = useState([])

    const load = async() => {
    
        await fetch("/Sample-Data-Screener.csv")
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        setFilterDta(results.data)

                    }
                });
            });
            setLoad(true);
    };

    return (
        <div className='px-5 mt-5 min-vh-100 justify-content-center align-items-center'>
{ loading ?

(
  <Filter data={filterdta} />
)
: 
(
<div className='container-fluid d-flex min-vh-100 justify-content-center align-items-center ' >
<button onClick={load} className=' btn btn-warning m-2'>Load</button>
<p className='justify-baseline'>click button to load data-table</p>
</div>
)
}
            
            
        </div>
    );
}

export default App;
