import { useLoaderData } from 'react-router';
import { useEffect, useState } from 'react';
import { getDB } from '~/db/getDB';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import Header from '~/components/Header';
import Pagination from '~/components/Pagination';

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    'SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id'
  );

  const employees = await db.all('SELECT * FROM employees');

  return { timesheetsAndEmployees, employees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees, employees } = useLoaderData();

  console.log(employees);

  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>(''); // For selected employee
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter based on search and selected employee
  const filteredTimesheets = timesheetsAndEmployees.filter((timesheet: any) => {
    const matchesSearch = timesheet.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesEmployee = selectedEmployee
      ? parseInt(timesheet.employee_id) === parseInt(selectedEmployee)
      : true;
    return matchesSearch && matchesEmployee;
  });

  const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage);
  const currentTimesheets = filteredTimesheets.slice(
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

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(e.target.value);
    setCurrentPage(1); // Reset to first page when employee changes
  };

  console.log(timesheetsAndEmployees);
  const [tableView, setTableView] = useState(true);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const events = timesheetsAndEmployees.map((item: any) => ({
    id: String(item.id),
    title: item.title,
    start: formatDate(item.start_time),
    end: formatDate(item.end_time),
  }));

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [...events],
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div>
      <Header />

      <div className='flex flex-row w-fit ml-5'>
        <button
          disabled={tableView}
          className='flex justify-between items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px] w-fit mb-3 mr-3'
          onClick={() => setTableView(true)}
        >
          Table View
        </button>
        <button
          disabled={!tableView}
          className='flex justify-between items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px] w-fit mb-3'
          onClick={() => setTableView(false)}
        >
          Calendar View
        </button>
      </div>
      <a
        href='/employees/new'
        className='flex justify-between items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px] w-fit mb-3 mx-auto'
      >
        Create New Timesheet
      </a>
      {tableView ? (
        <div>
          <div className='container flex flex-col mx-auto w-fit items-center'>
            <input
              type='text'
              value={search}
              placeholder='Search by title'
              className='px-4 py-2 border rounded-md'
              onChange={handleSearchChange}
            />
            <select
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              className='px-4 py-2 border rounded-md mt-2'
            >
              <option value=''>Select Employee</option>
              {employees.map((employee: any) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
          </div>

          <table className='table mx-auto my-4'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Employee Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTimesheets.map((timesheet: any) => (
                <tr key={timesheet.id}>
                  <td>{timesheet.title}</td>
                  <td>{timesheet.start_time}</td>
                  <td>{timesheet.end_time}</td>
                  <td>{timesheet.full_name}</td>
                  <td>
                    <a
                      href={`/timesheets/${timesheet.id}`}
                      className='flex justify-center items-center text-white bg-cyan-500 rounded-md px-[5px] py-[8px]'
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      )}
    </div>
  );
}
