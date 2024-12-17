const { jsPDF } = require('jspdf');

exports.generatePdf = (data) => {
  const doc = new jsPDF();

  doc.text(`Name: ${data.name}`, 10, 10);
  doc.text(`Matriculation Number: ${data.matNo}`, 10, 20);
  doc.text(`Department: ${data.department}`, 10, 30);
  doc.text(`Faculty: ${data.faculty}`, 10, 40);
  doc.text(`Year of Admission: ${data.yearOfAdmission}`, 10, 50);

  return doc.output('blob');
};
