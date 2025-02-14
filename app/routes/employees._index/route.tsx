import { useLoaderData } from 'react-router';
import Header from '~/components/Header';
import { getDB } from '~/db/getDB';
import { useState } from 'react';

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT * FROM employees;');
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = employees.filter((employee: any) =>
    employee.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Header />
      <div>
        <div className='container flex flex-col mx-auto w-fit items-center'>
          <a
            href='/employees/new'
            className='flex justify-between items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px] w-fit mb-5'
          >
            Create New Employee
          </a>

          <input
            type='text'
            value={search}
            placeholder='Search by name'
            className='px-4 py-2 border rounded-md'
            onChange={handleSearchChange}
          />
        </div>

        <table className='table mx-auto my-4'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee: any) => (
              <tr key={employee.id}>
                <td>{employee.full_name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.department}</td>
                <td>
                  <a
                    className='flex justify-between items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px]'
                    href={`/employees/${employee.id}`}
                  >
                    View/Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='pagination flex justify-center'>
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Previous
            </button>
          )}

          <span className='px-4 py-2'>
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
