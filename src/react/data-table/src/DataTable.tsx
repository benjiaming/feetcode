import { useState } from 'react';
import './DataTable.css';

interface User {
  id: number;
  name: string;
  age: number;
  occupation: string;
}

export interface Label {
  label: string;
  key: keyof User;
}

interface DataTableProps {
  users: User[];
  caption: string;
  labels: Label[];
}

export default function DataTable({ users, caption, labels }: DataTableProps) {
  const [perPage, setPerPage] = useState(5);
  const [index, setIndex] = useState(0);

  function goPrev() {
    if (index <= 0) return;
    setIndex(prev => prev - perPage);
  }
  function goNext() {
    if (index + perPage >= users.length) return;
    setIndex(prev => prev + perPage);
  }

  return (
    <div>
      <h1>Data Table</h1>
      <table className="data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {labels.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.slice(index, index + perPage).map(user => (
            <tr key={user.id}>
              {labels.map(({ key }) => (
                <td key={key}>{user[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="data-table-controls">
        <select
          name="offset"
          onChange={e => {
            setPerPage(Number(e.target.value));
            setIndex(0);
          }}
          value={perPage}
        >
          <option value="5">Show 5</option>
          <option value="15">Show 15</option>
          <option value="20">Show 20</option>
        </select>
        <button disabled={index <= 0} onClick={goPrev}>Prev</button>
        <span> Page {Math.floor(index / perPage) + 1} of {Math.ceil(users.length / perPage)} </span>
        <button disabled={index + perPage >= users.length} onClick={goNext}>Next</button>
      </div>
    </div>
  );
}
