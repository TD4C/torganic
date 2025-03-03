const path = require('path');
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const hbs  = require('express-handlebars');
app.engine('hbs', hbs.engine({
      extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(morgan('combined'))
app.set('views', path.join(__dirname, '../src/resources/views'));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.render('home',{
    title: "Torganic",
    scripts: '<script src="/js/home.js"></script>'
  });
})
app.get('/login', (req, res) => {
  res.render('login',{
    title: "Đăng nhập",
    styles: '<link rel="stylesheet" href="/css/login.css">',
     scripts: '<script src="/js/login.js"></script>'
  });
});


app.get('/register', (req, res) => {
  res.render('register',{
    title: "Đăng ký", 
    styles: '<link rel="stylesheet" href="/css/register.css">',
     scripts: '<script src="/js/register.js"></script>'
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})