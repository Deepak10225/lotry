const routes = require('./api/routes');
const port = process.env.PORT || 3000;

routes.app.get('/', (req, res) => {
    return res.json('hello');
})

routes.app.listen(port, () => {
    console.log(`server run at port no : ${port}`);
});
