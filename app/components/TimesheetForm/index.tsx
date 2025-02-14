import React from 'react';
import { Form } from 'react-router';

const TimesheetForm = ({ employees, timesheet, title }: any) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get('title') as string;
    const start_time = formData.get('start_time') as string;
    const end_time = formData.get('end_time') as string;
    const employee_id = formData.get('employee_id') as string;

    if (!title) {
      alert('Please enter a title.');
      return;
    }

    if (!start_time) {
      alert('Please enter a start time.');
      return;
    }

    if (!end_time) {
      alert('Please enter an end time.');
      return;
    }

    if (new Date(start_time) > new Date(end_time)) {
      alert('Start time must be before end time.');
      return;
    }

    if (!employee_id) {
      alert('Please select an employee.');
      return;
    }

    (e.target as HTMLFormElement).submit();
  };

  const sortedEmployees = employees.sort((a: any, b: any) => {
    return a.full_name.localeCompare(b.full_name);
  });

  return (
    <div>
      <Form
        method='post'
        className='flex flex-col mt-8 mb-6 p-[25px] max-w-[550px] shadow-lg ml-auto mr-auto'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='text-2xl font-bold text-center'>{title}</h1>

        <a
          className='w-fit mt-8  h-[40px] text-white bg-orange-500 rounded-md flex flex-row justify-between items-center px-[15px] py-[8px]'
          onClick={() => window.history.back()}
        >
          Back
        </a>

        {timesheet?.id && (
          <input type='hidden' name='id' value={timesheet.id} />
        )}

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='title' className='mr-2 w-[40%]'>
            Title*
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={timesheet?.title}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='start_time' className='mr-2 w-[40%]'>
            Start Time*
          </label>
          <input
            type='datetime-local'
            name='start_time'
            id='start_time'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={timesheet?.start_time}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          <label htmlFor='start_time' className='mr-2 w-[40%]'>
            Start Time*
          </label>
          <input
            type='datetime-local'
            name='end_time'
            id='end_time'
            className='py-[5px] px-[10px] rounded-sm w-[60%]'
            defaultValue={timesheet?.end_time}
          />
        </div>

        <div className='mt-4 flex flex-row justify-between items-center'>
          {' '}
          <label htmlFor='employee_id' className='mr-2 w-[40%]'>
            Employee
          </label>
          <select
            name='employee_id'
            id='employee_id'
            className='py-[5px] px-[10px] rounded-sm w-[60%] border'
            required
            defaultValue={timesheet?.employee_id || ''}
          >
            {sortedEmployees.map((employee: any) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className='w-40 mt-8  mx-auto h-[40px] text-white bg-cyan-500 rounded-md'
        >
          {timesheet?.id ? 'Update' : 'Create'}
        </button>
        {timesheet && (
          <a
            href={`/employees/${timesheet.employee_id}`}
            className='w-40 mt-2  mx-auto h-[40px] text-white bg-lime-500 rounded-md flex items-center justify-center'
          >
            View Employee
          </a>
        )}
      </Form>
    </div>
  );
};

export default TimesheetForm;
