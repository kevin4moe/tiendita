import fs from 'fs';
import path from 'path';
import moment from 'moment';

const file = path.join(path.resolve(), './database/local/lastOrder.json');
let data = {
  date: moment().format('YYYY-MM-DD'),
  count: 0,
};

if (fs.existsSync(file)) {
  const json = fs.readFileSync(file);
  data = JSON.parse(json);
}

function updateTicketOrder() {
  const today = moment().format('YYYY-MM-DD');
  if (data.date !== today) {
    data.date = today;
    data.count = 1;
  } else {
    data.count++;
  }

  fs.writeFileSync(file, JSON.stringify(data));

  return data;
}

export { updateTicketOrder };
