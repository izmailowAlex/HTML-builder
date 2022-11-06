// const path = require('path')
// console.log(path.parse(__filename, 'secret-folder'))

// ------------

// const http = require('http');

// const PORT = 3000;

// const requestHandler = (request, response) => {
//     const { method, url } = request;
//     const heading = `<h1 style="color: red">${url} page</h1>`;
//     const content = `<div style="background-color: green; width: 100px; height: 100px">Green block 100px x 100px</div>`;
//     console.log(`Получен ${method}-запрос на ${url}`);
//     response.write(heading);
//     response.end(content);
// };

// const server = http.createServer(requestHandler);

// server.listen(PORT, 'localhost', () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// })

// ------------

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', message => console.log(message));

emitter.emit('start', 'Hello'); // Hello
emitter.emit('start', 'from'); // from
emitter.emit('start', 'Node.js'); // Node.js