import { createTicket } from './pdfTicket.js';
import { updateTicketOrder } from './ticketCount.js';

function selectYourPDF(method, data) {
  switch (method) {
    case 'createTicket':
      data.meta = updateTicketOrder();

      createTicket(data);
      break;
    default:
      break;
  }
}

export { selectYourPDF };
