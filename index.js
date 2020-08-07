const { app } = require(./server)



app.get("/", async function (req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
