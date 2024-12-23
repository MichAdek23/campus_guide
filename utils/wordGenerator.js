const docx = require('docx');

exports.generateWordDoc = (data) => {
  const { Document, Packer, Paragraph, TextRun } = docx;
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(`Name: ${data.name}`),
              new TextRun(`Matriculation Number: ${data.matNo}`),
              new TextRun(`Department: ${data.department}`),
              new TextRun(`Faculty: ${data.faculty}`),
              new TextRun(`Year of Admission: ${data.yearOfAdmission}`),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
};
