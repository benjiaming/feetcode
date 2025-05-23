import DataTable from './DataTable';
import users from './data/users.json';

export default function App() {
  return (
    <div>
      <DataTable users={users} caption='Users'/>
    </div>
  );
}
