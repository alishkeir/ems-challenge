import { redirect, useLoaderData, type ActionFunction } from 'react-router';
import Header from '~/components/Header';
import TimesheetForm from '~/components/TimesheetForm';
import { getDB } from '~/db/getDB';

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

  const id = formData.get('id');
  const title = formData.get('title');
  const employee_id = formData.get('employee_id');
  const start_time = formatDateTime(formData.get('start_time'));
  const end_time = formatDateTime(formData.get('end_time'));

  const db = await getDB();
  await db.run(
    'UPDATE timesheets SET title = ?, start_time = ?, end_time = ?, employee_id = ? WHERE id = ?',
    [title, start_time, end_time, employee_id, id]
  );

  return redirect('/timesheets');
};

export async function loader({ params }: any) {
  const db = await getDB();
  const timesheet = await db.get('SELECT * FROM timesheets WHERE id = ?', [
    params.timesheetId,
  ]);
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { timesheet, employees };
}

export default function TimesheetPage() {
  const { timesheet, employees } = useLoaderData();

  return (
    <div>
      <Header />
      <TimesheetForm
        title='Create New Timesheet'
        employees={employees}
        timesheet={timesheet}
      />
    </div>
  );
}
