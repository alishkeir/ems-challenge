import { Form, redirect, type ActionFunction } from 'react-router';
import EmployeeForm from '~/components/EmployeeForm';
import { getDB } from '~/db/getDB';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get('full_name');
  const email: any = formData.get('email');
  const phone_number = formData.get('phone_number');
  const date_of_birth: any = formData.get('date_of_birth');

  const job_title = formData.get('job_title');
  const department = formData.get('department');
  const salary = formData.get('salary');
  const start_date = formData.get('start_date');
  const end_date = formData.get('end_date');

  // =================================================

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name,email,phone_number,date_of_birth,job_title,department,salary,start_date,end_date) VALUES (?,?,?,?,?,?,?,?,?)',
    [
      full_name,
      email,
      phone_number,
      date_of_birth,
      job_title,
      department,
      salary,
      start_date,
      end_date,
    ]
  );

  return redirect('/employees');
};

export default function NewEmployeePage() {
  return (
    <div>
      <EmployeeForm
        title='Create New Employee'
        formData={{
          full_name: 'Ali',
        }}
      />

      {/* <hr /> */}
      <ul>
        <li>
          <a href='/employees'>Employees</a>
        </li>
        <li>
          <a href='/timesheets'>Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
