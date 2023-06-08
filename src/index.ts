import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '42069';

const server: any = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url!);

  if (!parseUrl) {
    server.emit('error', new Error('No url in the request'));
    return;
  }

  // eslint-disable-next-line no-unused-vars
  const { pathname } = parseUrl;
  if (!parseUrl.query) {
    server.emit('error', new Error('404'));
    return;
  }

  const { query } = parseUrl;
  const parseQuery = query.split('&');
  const num1: string = parseQuery[0];
  const num2: string = parseQuery[1];

  const a = Number(num1.substring(2, 10));
  const b = Number(num2.substring(2, 10));

  const operations = () => {
    const sum = a + b;
    const difference = a - b;
    const multiplication = a * b;
    const division = a / b;
    return (
      ` <p>${a}+${b}=
      ${sum}</p>` +
      `<p> ${a}-${b}=
      ${difference}</p>` +
      `<p> ${a}*${b}=
      ${multiplication}</p>` +
      `<p> ${a}/${b}=
      ${division}</p> `
    );
  };

  operations();
  res.write(`<h1>Operaciones:${operations()}</h1>`);
  res.end();
});

server.listen(PORT);
