const app = require('./server/server.js')
const PORT = process.env.PORT || 3000

console.log('Hello world')

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
