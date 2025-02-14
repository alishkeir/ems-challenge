import { useLoaderData, redirect } from 'react-router';
import { getDB } from '~/db/getDB';

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from 'react-router';
import TimesheetForm from '~/components/TimesheetForm';
import Header from '~/components/Header';

// format the time and date to be more readable
const formatDateTime = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const employee_id = formData.get('employee_id');
  const start_time = formatDateTime(formData.get('start_time'));
  const end_time = formatDateTime(formData.get('end_time'));

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (title,employee_id, start_time, end_time) VALUES (?, ?, ?,?)',
    [title, employee_id, start_time, end_time]
  );

  return redirect('/timesheets');
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  return (
    <div>
      <Header />
      <TimesheetForm title='Create New Timesheet' employees={employees} />
    </div>
  );
}
