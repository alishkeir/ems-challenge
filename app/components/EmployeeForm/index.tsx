import React from 'react';
import { Form } from 'react-router';

function isEmployeeUnder18(birthday: any) {
  const birthDate = new Date(birthday);
  const today = new Date();

  const years = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (years > 18) {
    return false;
  }

  if (years == 18) {
    return monthDifference > 0 || (monthDifference === 0 && dayDifference > 0);
  }

  return true;
}

const EmployeeForm = ({
  title,
  employeeData,
}: {
  title: string;
  employeeData?: any;
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const full_name = formData.get('full_name') as string;
    const email: any = formData.get('email') as string;
    const phone_number = formData.get('phone_number') as string;
    const date_of_birth = formData.get('date_of_birth') as string;

    const job_title = formData.get('job_title') as string;
    const department = formData.get('department') as string;
    const salary = formData.get('salary') as string;
    const start_date = formData.get('start_date') as string;

    // =================== VALIDATION ===================

    if (!full_name) {
      alert('Please enter employee name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!phone_number) {
      alert('Please enter a valid Phone Number.');
      return;
    }

    if (new Date(date_of_birth).getTime() > Date.now()) {
      alert('Please enter a valid Date of Birth in the past');
      return;
    }

    if (!job_title) {
      alert('Please enter a valid Job Title.');
      return;
    }

    if (!department) {
      alert('Please enter a valid Department.');
      return;
    }

    if (!salary) {
      alert('Please enter a valid Salary.');
      return;
    }

    if (!start_date) {
      alert('Please enter a valid Start Date.');
      return;
    }

    //  Compliance validation

    if (parseFloat(salary) < 1000) {
      alert('Salary is under Minimum Wage (1000)');
      return;
    }

    if (isEmployeeUnder18(date_of_birth)) {
      alert('The Employee should be at least 18 years old');
      return;
    }

    (e.target as HTMLFormElement).submit();
  };

  return (
    <div>
      <Form
        method='post'
        className='flex flex-col mt-8 mb-6 p-[25px] max-w-[550px] shadow-lg ml-auto mr-auto'
        onSubmit={(e) => handleSubmit(e)}
        encType='multipart/form-data'
      >
        <h1 className='text-2xl font-bold text-center'>{title}</h1>

        <a
          className='w-fit mt-8  h-[40px] text-white bg-orange-500 rounded-md flex flex-row justify-between items-center px-[15px] py-[8px]'
          onClick={() => window.history.back()}
        >
          Back
        </a>

        {employeeData?.id && (
          <input type='hidden' name='id' value={employeeData.id} />
        )}

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='full_name' className='mr-2 w-[40%]'>
            Full Name*
          </label>
          <input
            type='text'
            name='full_name'
            id='full_name'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.full_name}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='email' className='mr-2 w-[40%]'>
            Email*
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.email}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='phone_number' className='mr-2 w-[40%]'>
            Phone Number*
          </label>
          <input
            type='tel'
            name='phone_number'
            id='phone_number'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.phone_number}
          />
        </div>
        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='date_of_birth' className='mr-2 w-[40%]'>
            Date of Birth*
          </label>
          <input
            type='date'
            name='date_of_birth'
            id='date_of_birth'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.date_of_birth}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='job_title' className='mr-2 w-[40%]'>
            Job Title*
          </label>
          <input
            type='text'
            name='job_title'
            id='job_title'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.job_title}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='department' className='mr-2 w-[40%]'>
            Department*
          </label>
          <input
            type='text'
            name='department'
            id='department'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.department}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='department' className='mr-2 w-[40%]'>
            Salary*
          </label>
          <input
            type='number'
            name='salary'
            id='salary'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.salary}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='start_date' className='mr-2 w-[40%]'>
            Start Date*
          </label>
          <input
            type='date'
            name='start_date'
            id='start_date'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={employeeData?.start_date}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='image' className='mr-2 w-[40%]'>
            Image
          </label>
          <input
            type='file'
            name='image'
            id='image'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            accept='image/png, image/jpeg, image/jpg, image/webp'
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='document' className='mr-2 w-[40%]'>
            Resume (CV)
          </label>
          <input
            type='file'
            name='document'
            id='document'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
          />
        </div>

        <button
          type='submit'
          className='w-40 mt-8  mx-auto h-[40px] text-white bg-cyan-500 rounded-md'
        >
          {employeeData?.id ? 'Update' : 'Create'}
        </button>
      </Form>
    </div>
  );
};

export default EmployeeForm;
