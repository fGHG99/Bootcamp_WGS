import express from 'express';
import expressLayouts from "express-ejs-layouts";
const app = express();
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// this is the view engine using regular ejs
// app.set("view engine", "ejs")
// app.set("views", "./views")
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layout")

const PORT = 8080;
const ipAddress = 'localhost';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.get('/', (req, res) => {
    res.render("index", { title: "Home Page", activePage: "home"});
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About Page", activePage: "about"});
});

app.get('/contact', (req, res) => {
    const contact = [
        { name: "Ilham", mobile: "01239123821831", email: "ilham@example.com" },
        { name: "Azka", mobile: "081234567890", email: "azka@example.com" },
        { name: "Nurul", mobile: "085612345678", email: "nurul@example.com" },
        { name: "Rama", mobile: "087712341234", email: "rama@example.com" },
        { name: "Siti", mobile: "089912348765", email: "siti@example.com" },
        { name: "Budi", mobile: "082198765432", email: "budi@example.com" }
    ];
    res.render('contact', { contact, title: 'Contact Page', activePage: 'contact' });
});

// app.get('/product/:id', (req, res) => {
//     const productId = req.params.id;
//     const category = req.query.category;
//     res.send(`Product ID: ${productId}, Category: ${category}`);
// });

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, ipAddress, () => {
    console.log(`Server is running on http://${ipAddress}:${PORT}`);
});