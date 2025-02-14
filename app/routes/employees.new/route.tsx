import { redirect, type ActionFunction } from 'react-router';
import EmployeeForm from '~/components/EmployeeForm';
import { getDB } from '~/db/getDB';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import Header from '~/components/Header';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

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

  console.log(image);
  console.log(doc);

  let imagePath = '';
  let docPath = '';

  const ensureDirectoryExists = (filePath: any) => {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  if (image) {
    const buffer = await image.arrayBuffer();
    const imageName = `${Date.now()}-${image.name}`;
    imagePath = path.join('./uploads/images/', imageName);
    ensureDirectoryExists(imagePath);

    await writeFile(imagePath, Buffer.from(buffer));
  }

  if (doc) {
    const buffer = await doc.arrayBuffer();
    const docName = `${Date.now()}-${doc.name}`;
    docPath = path.join('./uploads/docs/', docName);
    ensureDirectoryExists(docPath);

    await writeFile(docPath, Buffer.from(buffer));
  }

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone_number, date_of_birth, job_title, department, salary, start_date, image, document) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
    [
      full_name,
      email,
      phone_number,
      date_of_birth,
      job_title,
      department,
      salary,
      start_date,
      imagePath,
      docPath,
    ]
  );

  return redirect('/employees');
};

export default function NewEmployeePage() {
  return (
    <div>
      <Header />
      <EmployeeForm title='Create New Employee' />
    </div>
  );
}
