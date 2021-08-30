exports.forecast = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(text);
  try {
    res.set('Content-Type', 'application/json');
    res.send(text);
  } catch (e) {
    const statusCode = e.statusCode ? e.statusCode : 500;
    console.warn(`Error during forecast execution: ${JSON.stringify(e)}`);
    res.status(statusCode).send(JSON.stringify(e));
  }
};
