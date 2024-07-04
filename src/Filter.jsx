import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt';
import $ from 'jquery';

function Filter({ data }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [compareOption, setCompareOption] = useState('');
    const [compareValue, setCompareValue] = useState('');
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
        tableInstance.current = $(tableRef.current).DataTable({
            data: data,
            columns: [
                { title: 'Company', data: 'company' },
                { title: 'Ticker', data: 'ticker' },
                { title: 'Sector', data: 'Sector' },
                { title: 'Industry', data: 'Industry' },
                { title: 'Revenue', data: 'revenue' },
                { title: 'GP', data: 'gp' },
                { title: 'FCF', data: 'fcf' },
                { title: 'Capex', data: 'capex' }
            ],
            destroy: true // Ensure DataTable can be re-initialized
        });

        return () => {
            if (tableInstance.current) {
                tableInstance.current.destroy();
            }
        };
    }, [data]);

    const handleFilterChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCompareOptionChange = (event) => {
        setCompareOption(event.target.value);
    };

    const handleCompareValueChange = (event) => {
        setCompareValue(event.target.value);
    };

    const handleApplyFilter = () => {
        if (!tableInstance.current) return;

        let filteredData = data;

        if (selectedOption && compareOption && compareValue) {
            const compareNumber = Number(compareValue);

            if (selectedOption === 'capex') {
                filteredData = data.filter((item) =>
                    compareOption === 'greater'
                        ? Number(item.capex) > compareNumber
                        : Number(item.capex) < compareNumber
                );
            } else if (selectedOption === 'gst') {
                filteredData = data.filter((item) =>
                    compareOption === 'greater'
                        ? Number(item.gp) > compareNumber
                        : Number(item.gp) < compareNumber
                );
            } else if (selectedOption === 'fcf') {
                filteredData = data.filter((item) =>
                    compareOption === 'greater'
                        ? Number(item.fcf) > compareNumber
                        : Number(item.fcf) < compareNumber
                );
            } else if (selectedOption === 'revenue') {
                filteredData = data.filter((item) =>
                    compareOption === 'greater'
                        ? Number(item.revenue) > compareNumber
                        : Number(item.revenue) < compareNumber
                );
            }
        }

        tableInstance.current.clear().rows.add(filteredData).draw();
    };

    const handleResetFilter = () => {
        setSelectedOption('');
        setCompareOption('');
        setCompareValue('');
        tableInstance.current.clear().rows.add(data).draw();
    };

    return (
        <>

            <div className="text-center mb-3 d-flex">
                <select value={selectedOption} onChange={handleFilterChange} className="form-select">
                    <option value="">Select a filter</option>
                    <option value="capex">Capex</option>
                    <option value="gst">Gp</option>
                    <option value="fcf">FCF</option>
                    <option value="revenue">Revenue</option>
                </select>

                <select value={compareOption} onChange={handleCompareOptionChange} className="form-select mx-2 w-10">
                    <option value="">Select comparison</option>
                    <option value="greater">Greater than</option>
                    <option value="less">Less than</option>
                </select>

                <input
                    type="number"
                    value={compareValue}
                    onChange={handleCompareValueChange}
                    className="form-control mx-2"
                    placeholder="Enter value"
                />

                <button onClick={handleApplyFilter} className="btn btn-primary mx-2">Apply</button>
                <button onClick={handleResetFilter} className="btn btn-secondary">Reset</button>
            </div>

            <table id="myTable" className="display" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Ticker</th>
                        <th>Sector</th>
                        <th>Industry</th>
                        <th>Revenue</th>
                        <th>GP</th>
                        <th>FCF</th>
                        <th>Capex</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.company}</td>
                            <td>{row.ticker}</td>
                            <td>{row.Sector}</td>
                            <td>{row.Industry}</td>
                            <td>{row.revenue}</td>
                            <td>{row.gp}</td>
                            <td>{row.fcf}</td>
                            <td>{row.capex}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Filter;
