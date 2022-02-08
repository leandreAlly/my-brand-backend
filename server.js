
import app from "./app";


const port =(process.env.PORT || '3000');

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port} ...`)
});

