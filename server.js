const exprees = require('express');
const app = exprees();

app.use(exprees.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');  
});

const port = 925;
app.listen(port, ()=>{
  console.log(` Working at ${port}`);
});