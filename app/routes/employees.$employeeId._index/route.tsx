import {
  useParams,
  useLoaderData,
  redirect,
  type ActionFunction,
} from 'react-router';

import EmployeeForm from '~/components/EmployeeForm';
import Header from '~/components/Header';
import { getDB } from '~/db/getDB';
import { writeFile } from 'fs/promises';
import path from 'path';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id') as string;
  const full_name = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const phone_number = formData.get('phone_number') as string;
  const date_of_birth = formData.get('date_of_birth') as string;
  const job_title = formData.get('job_title') as string;
  const department = formData.get('department') as string;
  const salary = formData.get('salary') as string;
  const start_date = formData.get('start_date') as string;
  const image = formData.get('image') as File;
  const doc = formData.get('document') as File;

  let imagePath = '';
  let docPath = '';

  // check if an image is uploaded and save it to the local files
  if (image.size) {
    const buffer = await image.arrayBuffer();
    const imageName = `${Date.now()}-${image.name}`;
    imagePath = path.join('./uploads/images/', imageName);

    await writeFile(imagePath, Buffer.from(buffer));
  }

  // check if a document is uploaded and save it to the local files
  if (doc.size) {
    const buffer = await doc.arrayBuffer();
    const docName = `${Date.now()}-${doc.name}`;
    docPath = path.join('./uploads/docs/', docName);
    await writeFile(docPath, Buffer.from(buffer));
  }

  // configure db columns depends on the availablity of image and document
  const columns = [
    'full_name',
    'email',
    'phone_number',
    'date_of_birth',
    'job_title',
    'department',
    'salary',
    'start_date',
  ];
  const values = [
    full_name,
    email,
    phone_number,
    date_of_birth,
    job_title,
    department,
    salary,
    start_date,
  ];

  if (image) {
    columns.push('image');
    values.push(imagePath);
  }
  if (doc) {
    columns.push('document');
    values.push(docPath);
  }

  const db = await getDB();
  await db.run(
    `UPDATE employees SET ${columns
      .map((col) => `${col} = ?`)
      .join(', ')} WHERE id = ?`,
    [...values, id]
  );
  // ==================================

  return redirect('/employees');
};

export async function loader({ params }: any) {
  const db = await getDB();
  const employee = await db.get('SELECT * FROM employees WHERE id = ?', [
    params.employeeId,
  ]);
  return { employee };
}

export default function EmployeePage() {
  const { employee } = useLoaderData();
  const { employeeId } = useParams();

  return (
    <div>
      <Header />
      {employee?.image && (
        <img src={`/${employee.image}`} className='w-[180px] mx-auto mb-4' />
      )}

      {employee?.document && (
        <a
          href={`/${employee?.document}`}
          download
          className='h-[40px] text-white bg-emerald-500 rounded-md px-[10px] block w-[140px] mx-auto mb-4 flex items-center justify-center'
        >
          Download CV
        </a>
      )}

      <EmployeeForm title='Update Employee' employeeData={employee} />
    </div>
  );
}
