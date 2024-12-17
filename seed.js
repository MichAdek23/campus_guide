require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');  // Assuming Faculty model
const Department = require('./models/Department');  // Assuming Department model

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedData();  // Call the seed function to insert data
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

const seedData = async () => {
  try {
    // Remove all existing data (optional, useful if you're re-seeding)
    await Faculty.deleteMany();
    await Department.deleteMany();

    // Insert Faculty Data
    const facultyData = [
      { name: 'Faculty of Education' },
      { name: 'Faculty of Agriculture' },
      { name: 'Faculty of Engineering' },
      { name: 'Faculty of Humanities' },
      { name: 'Faculty of Social Sciences' },
      { name: 'Faculty of Management Sciences' },
      { name: 'Faculty of Health Sciences' },
      { name: 'Faculty of Sciences' },
      { name: 'Faculty of Law' },
      { name: 'School of Graduate Studies' },
      { name: 'College of Continuing Education' }
    ];

    // Insert faculties into the database
    const faculties = await Faculty.insertMany(facultyData);

    // Map Faculty names to their respective departments
    const departmentData = [
      { facultyName: 'Faculty of Education', departments: ['Adult and Non-Formal Education', 'Science Education', 'Education & various specializations (e.g., Biology, English)'] },
      { facultyName: 'Faculty of Agriculture', departments: ['Agricultural Economics & Extension', 'Animal Science', 'Fisheries', 'Forestry & Wildlife', 'Agriculture'] },
      { facultyName: 'Faculty of Engineering', departments: ['Chemical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Petroleum Engineering'] },
      { facultyName: 'Faculty of Humanities', departments: ['Creative Arts', 'Drama', 'English', 'Fine Arts', 'French', 'History', 'Linguistics', 'Music'] },
      { facultyName: 'Faculty of Social Sciences', departments: ['Economics', 'Geography', 'Political Science', 'Sociology'] },
      { facultyName: 'Faculty of Management Sciences', departments: ['Business Management', 'Accounting', 'Banking & Finance', 'Marketing', 'Hospitality & Tourism'] },
      { facultyName: 'Faculty of Health Sciences', departments: ['Anatomy', 'Dentistry', 'Medicine', 'Nursing', 'Pharmacy', 'Physiology'] },
      { facultyName: 'Faculty of Sciences', departments: ['Biochemistry', 'Chemistry', 'Computer Science', 'Geology', 'Microbiology', 'Physics', 'Zoology'] },
      { facultyName: 'Faculty of Law', departments: ['Jurisprudence', 'Commercial Law', 'Public Law', 'Legal Studies'] },
      { facultyName: 'School of Graduate Studies', departments: ['Offers postgraduate degrees in various fields including humanities, sciences, engineering, and social sciences'] },
      { facultyName: 'College of Continuing Education', departments: ['Professional and adult education programs'] },
    ];

    // Insert Departments data based on Faculty
    for (const facultyDept of departmentData) {
      const faculty = faculties.find(f => f.name === facultyDept.facultyName);
      if (faculty) {
        const departments = facultyDept.departments.map(dep => ({
          name: dep,
          facultyId: faculty._id
        }));

        await Department.insertMany(departments);
      }
    }

    console.log('Data Seeding Complete');
    mongoose.disconnect();  // Close connection after seeding
  } catch (err) {
    console.error('Error during data seeding:', err);
    mongoose.disconnect();
  }
};
