const http = require ('http');
const express = require('express');
const app = express();
const port = 4000;

//Middleware pour checker l'heure de la requête
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDate(); 
  const hourOfWeek = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfWeek >= 9 && hourOfWeek < 17){
    next();
  } else {
    res.send('Le site est disponible uniquement pendant les heures et les jours ouvrables !');
  }
};

app.use(checkWorkingHours);
app.use(express.static('public'));

//Template Pug
app.set('view engine', 'pug');
app.set('views', './views');

//routes
app.get('/', (req, res) => {
  res.render('index', {title: 'Accueil'});
});

app.get('/services', (req, res) => {
  res.render('services', {title: 'Nos Services'});
});

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Nous Contacter'});
});

const server = http.createServer(app);

app.listen(port, () => {
  console.log('Le serveur écoute sur le port ${port}');
});