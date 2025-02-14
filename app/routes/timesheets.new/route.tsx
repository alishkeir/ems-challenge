import { useLoaderData, Form, redirect } from 'react-router';
import { getDB } from '~/db/getDB';

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from 'react-router';
import TimesheetForm from '~/components/TimesheetForm';
import Header from '~/components/Header';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const employee_id = formData.get('employee_id');
  const start_time = formData.get('start_time');
  const end_time = formData.get('end_time');

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
