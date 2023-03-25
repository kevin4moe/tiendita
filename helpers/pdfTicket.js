import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';

const fontRegular = path.join(
  path.resolve(),
  './public/font/Open Sans/OpenSans-Regular.ttf'
);
const fontBold = path.join(
  path.resolve(),
  './public/font/Open Sans/OpenSans-Bold.ttf'
);

const savePath = path.join(path.resolve(), './public/pdf/invoice.pdf');

const businessInfo = {
  name: 'ACME Inc.',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10025',
  phone: '(555) 555-5555',
  email: '',
};

function createTicket(ticket) {
  let doc = new PDFDocument({ size: 'A4', margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, ticket);
  generateInvoiceTable(doc, ticket);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(savePath));
}

function generateHeader(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text(businessInfo.name, 110, 57)
    .fontSize(10)
    .text(businessInfo.name, 200, 50, { align: 'right' })
    .text(businessInfo.address, 200, 65, { align: 'right' })
    .text(
      `${businessInfo.city}, ${businessInfo.state}, ${businessInfo.zip}`,
      200,
      80,
      { align: 'right' }
    )
    .moveDown();
}

function generateCustomerInformation(doc, ticket) {
  doc.fillColor('#444444').fontSize(20).text('Recibo', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('ticket Number:', 50, customerInformationTop)
    .font(fontBold)
    .text(ticket.invoice_nr, 150, customerInformationTop)
    .font(fontRegular)
    .text('ticket Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(formatCurrency(ticket.subtotal), 150, customerInformationTop + 30)

    .font(fontBold)
    .text(ticket.shipping.name, 300, customerInformationTop)
    .font(fontRegular)
    .text(ticket.shipping.address, 300, customerInformationTop + 15)
    .text(
      ticket.shipping.city +
        ', ' +
        ticket.shipping.state +
        ', ' +
        ticket.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, ticket) {
  let i;
  const invoiceTableTop = 330;

  doc.font(fontBold);
  generateTableRow(
    doc,
    invoiceTableTop,
    'Articulo',
    'Cantidad',
    'Costo Unitario',
    'Total'
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font(fontRegular);

  for (i = 0; i < ticket.items.length; i++) {
    const item = ticket.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.article,
      item.quantity,
      formatCurrency(item.amount),
      formatCurrency(item.total)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    formatCurrency(ticket.subtotal / 1.08)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'IVA 8%',
    '',
    formatCurrency((ticket.subtotal / 1.08) * 0.08)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font(fontBold);
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Total',
    '',
    formatCurrency(ticket.subtotal)
  );
  doc.font(fontRegular);
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Payment is due within 15 days. Thank you for your business.',
      50,
      780,
      { align: 'center', width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(withCents) {
  return '$' + withCents.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}

export { createTicket };
