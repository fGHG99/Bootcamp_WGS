import { useEffect, useState } from "react";

function Dashboard() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/contact/")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  }, []);
  console.log('contacts: ', contacts)

return (
    <div>
        <h2>Dashboard</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((c) => (
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default Dashboard;
