import app from './index'

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});