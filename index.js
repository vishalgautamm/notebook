const app = require('./server/server.js')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
