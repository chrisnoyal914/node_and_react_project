import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = (invoiceRef: HTMLDivElement | null) => {
  if (!invoiceRef) {
    console.error('No invoice reference found');
    return;
  }

  const doc = new jsPDF('p', 'mm', 'a4'); 

  html2canvas(invoiceRef, { scale: 2, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    
    if (!imgData.startsWith('data:image/png;base64,')) {
      console.error('Invalid image data URL.');
      return;
    }

    
    const testImg = document.createElement('img');
    testImg.src = imgData;
    document.body.appendChild(testImg); 

    testImg.onload = () => {
      console.log('Image loaded successfully.');

      const imgWidth = 210; 
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const pageHeight = doc.internal.pageSize.height;
      let heightLeft = imgHeight;
      let position = 0;

      
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      
      doc.save('invoice.pdf');
    };

    testImg.onerror = (err) => {
      console.error('Error loading image:', err);
    };
  }).catch(err => {
    console.error('Error generating PDF:', err);
  });
};
