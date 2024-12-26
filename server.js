const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Fetch and display a list of public APIs
app.get('/public-apis', async (req, res) => {
    try {
        const response = await axios.get('https://api.publicapis.org/entries');
        res.render('api_list', { apis: response.data.entries });
    } catch (error) {
        res.status(500).send('Error fetching public APIs.');
    }
});

// Fetch and display a random cat fact
app.get('/cat-facts', async (req, res) => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        res.render('random_fact', { fact: response.data.fact });
    } catch (error) {
        res.status(500).send('Error fetching cat fact.');
    }
});

// Fetch and display Bitcoin price index
app.get('/bitcoin', async (req, res) => {
    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        res.render('bitcoin_price', { bpi: response.data.bpi });
    } catch (error) {
        res.status(500).send('Error fetching Bitcoin price.');
    }
});

// Fetch and display a random activity
app.get('/bored', async (req, res) => {
    try {
        const response = await axios.get('https://www.boredapi.com/api/activity');
        res.render('bored', { activity: response.data.activity });
    } catch (error) {
        res.status(500).send('Error fetching activity.');
    }
});

// Fetch and display person analysis (age, gender, nationality)
app.get('/person-analysis', async (req, res) => {
    const name = req.query.name || 'john';
    try {
        const [ageRes, genderRes, nationRes] = await Promise.all([
            axios.get(`https://api.agify.io?name=${name}`),
            axios.get(`https://api.genderize.io?name=${name}`),
            axios.get(`https://api.nationalize.io?name=${name}`)
        ]);
        res.render('person_analysis', {
            name,
            age: ageRes.data.age,
            gender: genderRes.data.gender,
            nationality: nationRes.data.country
        });
    } catch (error) {
        res.status(500).send('Error fetching person analysis.');
    }
});

// Fetch and display US data
app.get('/us-data', async (req, res) => {
    try {
        const response = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        res.render('us_data', { data: response.data.data });
    } catch (error) {
        res.status(500).send('Error fetching US data.');
    }
});

// Fetch and display random dog image
app.get('/dog_image', async (req, res) => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      const imageUrl = response.data.message;  // Extract the image URL from the API response
      res.render('dog_image', { imageUrl });  // Pass the imageUrl to the EJS template
    } catch (error) {
      console.error('Error fetching dog image', error);
      res.send('Error fetching dog image');
    }
  });
// Fetch and display IP information
app.get('/ip-info', async (req, res) => {
    const ip = req.query.ip || '161.185.160.93';
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
        res.render('ip_info', { info: response.data });
    } catch (error) {
        res.status(500).send('Error fetching IP information.');
    }
});

// Fetch and display random joke
app.get('/jokes', async (req, res) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.render('random_joke', { joke: response.data });
    } catch (error) {
        res.status(500).send('Error fetching joke.');
    }
});

// Fetch and display random user
app.get('/random-user', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        res.render('random_user', { user: response.data.results[0] });
    } catch (error) {
        res.status(500).send('Error fetching random user.');
    }
});

// Fetch and display universities list
app.get('/universities', async (req, res) => {
    const country = req.query.country || 'United States';
    try {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
        res.render('universities', { universities: response.data });
    } catch (error) {
        res.status(500).send('Error fetching universities list.');
    }
});

// Fetch and display ZIP code information
app.get('/zip-info', async (req, res) => {
    const zip = req.query.zip || '33162';
    try {
        const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
        res.render('zip_info', { info: response.data });
    } catch (error) {
        res.status(500).send('Error fetching ZIP information.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
