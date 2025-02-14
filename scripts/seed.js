import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: 'John Doe',
    email: 'johndoe@me.com',
    phone_number: '123-456-7890',
    date_of_birth: '1990-01-01',
    job_title: 'Software Engineer',
    department: 'Development',
    salary: 50000,
    start_date: '2022-01-01',
    
  },
  {
    full_name: 'Jane Smith',
    email: 'janesmith@me.com',
    phone_number: '987-654-3210',
    date_of_birth: '1995-05-05',
    job_title: 'Data Analyst',
    department: 'Analytics',
    salary: 60000,
    start_date: '2022-02-01',
  },
  {
    full_name: 'Alice Johnson',
    email: 'alicejohnson@me.com',
    phone_number: '555-555-5555',
    date_of_birth: '1988-08-08',
    job_title: 'Product Manager',
    department: 'Marketing',
    salary: 70000,
    start_date: '2022-03-01',
  },
];

const timesheets = [
  {
    employee_id: 1,
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
  },
  {
    employee_id: 2,
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
  },
  {
    employee_id: 3,
    start_time: '2025-02-12 07:00:00',
    end_time: '2025-02-12 16:00:00',
  },
];

const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0])
    .map(() => '?')
    .join(', ');

  const insertStmt = db.prepare(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
  );

  data.forEach((row) => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});
