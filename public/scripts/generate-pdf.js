const titleText = document.getElementById('report-title').textContent;
const grandTotalText = document.querySelector('.grand-total').textContent;

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

  doc.text(grandTotalText, 80, doc.lastAutoTable.finalY + 40);

  doc.save(`${titleText}.pdf`);
}

document.getElementById('download').addEventListener('click', generatePDF);
