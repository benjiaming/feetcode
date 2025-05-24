import DataTable, { type Label } from './DataTable';
import users from './data/users.json';

const labels: Label[] = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
];

export default function App() {
  return (
    <div>
      <DataTable users={users} caption='Users' labels={labels} />
    </div>
  );
}
