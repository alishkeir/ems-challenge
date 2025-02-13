import React from 'react';
import { Form } from 'react-router';

const EmployeeForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const full_name = formData.get('full_name');
    const email: any = formData.get('email');
    const phone_number = formData.get('phone_number');
    const date_of_birth: any = formData.get('date_of_birth');

    const job_title = formData.get('job_title');
    const department = formData.get('department');
    const salary = formData.get('salary');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');

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

    if (!end_date) {
      alert('Please enter a valid End Date.');
      return;
    }

    (e.target as HTMLFormElement).submit();
  };

  return (
    <Form
      method='post'
      className='flex flex-col mt-6 mb-6 p-[25px] max-w-[550px]  shadow-lg ml-auto mr-auto'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='full_name' className='mr-2 flex-1'>
          Full Name*
        </label>
        <input
          type='text'
          name='full_name'
          id='full_name'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='email' className='mr-2 flex-1'>
          Email*
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='phone_number' className='mr-2 flex-1'>
          Phone Number*
        </label>
        <input
          type='tel'
          name='phone_number'
          id='phone_number'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>
      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='date_of_birth' className='mr-2 flex-1'>
          Date of Birth*
        </label>
        <input
          type='date'
          name='date_of_birth'
          id='date_of_birth'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='job_title' className='mr-2 flex-1'>
          Job Title*
        </label>
        <input
          type='text'
          name='job_title'
          id='job_title'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='department' className='mr-2 flex-1'>
          Department*
        </label>
        <input
          type='text'
          name='department'
          id='department'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='department' className='mr-2 flex-1'>
          Salary*
        </label>
        <input
          type='number'
          name='salary'
          id='salary'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='start_date' className='mr-2 flex-1'>
          Start Date*
        </label>
        <input
          type='date'
          name='start_date'
          id='start_date'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <div className='mt-4 flex flex-row justify-between items-center'>
        <label htmlFor='end_date' className='mr-2 flex-1'>
          End Date*
        </label>
        <input
          type='date'
          name='end_date'
          id='end_date'
          className='flex-1 py-[5px] px-[10px] rounded-sm'
        />
      </div>

      <button
        type='submit'
        className='w-40 mt-8  mx-auto h-[40px] text-white bg-cyan-500 rounded-md'
      >
        Confirm
      </button>
    </Form>
  );
};

export default EmployeeForm;
