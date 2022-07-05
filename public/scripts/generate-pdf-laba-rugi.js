const titleText = document.getElementById('report-title').textContent;
const grandTotalText = document.getElementById('income-statement').textContent;

console.log(grandTotalText);

function generatePDF() {
  var doc = new jsPDF('p', '', 'a4');

  doc.autoTable({
    html: '#table-one',
    margin: { top: 30 },
    beforePageContent: function (data) {
      doc.text(titleText, 60, 15);
    },
  });

  doc.autoTable({
    html: '#table-two',
    margin: { top: 30 },
    beforePageContent: function (data) {
      doc.text(titleText, 60, 15);
    },
  });

  doc.text(grandTotalText, 140, doc.lastAutoTable.finalY + 20);

  doc.save(`${titleText}.pdf`);
}

document.getElementById('download').addEventListener('click', generatePDF);
