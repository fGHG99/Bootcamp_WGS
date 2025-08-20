import express from "express";
import expressLayouts from "express-ejs-layouts";
const app = express();
import morgan from "morgan";
import { fileHandler, savingData, updateData } from "../Day_3/utils/fileHandler.js";
import { validateEmail, validatePhone } from "../Day_3/utils/validator.js";

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;
const ipAddress = "localhost";
const datapath = "../Day_3/data/data.json";

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", activePage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", activePage: "about" });
});

app.get("/contact", (req, res) => {
  const contact = fileHandler.readFileArray(datapath);
  res.render("contact", {
    contact,
    title: "Contact Page",
    activePage: "contact"
  });
});

app.post("/contact/input", (req, res) => {
  const { name, email, mobile } = req.body;
  const contacts = fileHandler.readFileArray(datapath);
  const errors = [];
  if (contacts.find((contact) => contact.name === name)) {
    errors.push("Name already exists");
  }
  if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }
  if (!validatePhone(mobile)) {
    errors.push("Invalid mobile number");
  }
  if (errors.length > 0) {
    console.log(errors);
    const contact = fileHandler.readFileArray(datapath); 
    return res.status(400).render("contact", {
      contact,
      errors,
      title: "Contact Page",
      activePage: "contact",
    });
  }
  const contact = { name, email, mobile };
  savingData(datapath, contact);
  res.redirect("/contact");
});

app.post("/contact/edit/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const { username, email, mobile } = req.body;
    const contacts = fileHandler.readFileArray(datapath);
    const errors = [];

    if (!validateEmail(email)) {
        errors.push("Invalid email format");
    }
    if (!validatePhone(mobile)) {
        errors.push("Invalid phone number");
    }
    if (index < 0 || index >= contacts.length) {
        errors.push("Contact not found");
    }

    if (errors.length > 0) {
        console.log(errors);
        const contact = fileHandler.readFileArray(datapath);
        return res.status(400).render("contact", {
            contact,
            errors,
            title: "Contact Page",
            activePage: "contact",
        });
    }
    contacts[index] = { name: username, email, mobile };
    updateData(datapath, contacts);
    res.redirect("/contact");
});

app.post("/contact/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const contacts = fileHandler.readFileArray(datapath);
    if (index < 0 || index >= contacts.length) {
        return res.status(404).json({ success: false, message: "Contact not found" });
    }
    contacts.splice(index, 1);
    updateData(datapath, contacts);
    res.redirect("/contact");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${PORT}`);
});
