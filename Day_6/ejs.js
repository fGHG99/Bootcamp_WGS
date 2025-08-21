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
const logPath = "./log/errors.json";

app.use(express.static("public"));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => {
        process.stdout.write(message); // tetap tampil di console
      },
    },
    skip: (req, res) => {
      if (res.statusCode !== 200 && res.statusCode !== 304) {
        const errorEntry = {
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          time: new Date().toISOString(),
        };

        // baca dulu data log lama
        let errorsLog = [];
        try {
          errorsLog = fileHandler.readFileArray(logPath);
        } catch (err) {
          errorsLog = []; // kalau file belum ada, mulai baru
        }

        // tambah log baru
        errorsLog.push(errorEntry);

        // tulis kembali ke file
        fileHandler.writeFile(logPath, errorsLog);
      }
      return false; // jangan skip logging normal
    },
  })
);

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", activePage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", activePage: "about" });
});

app.get("/contact", (req, res) => {
  const contacts = fileHandler.readFileArray(datapath).filter(c => !c.isDeleted);

  res.render("contact", {
    contact: contacts,
    errors: null,
    successMsg: req.query.success || null, 
    title: "Contact Page",
    activePage: "contact"
  });
});


app.post("/contact/input", (req, res) => {
  const { name, email, mobile } = req.body;
  const contacts = fileHandler.readFileArray(datapath);
  const errors = [];

  if (contacts.find((c) => c.name === name && !c.isDeleted)) {
    errors.push("Name already exists");
  }
  if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }
  if (!validatePhone(mobile)) {
    errors.push("Invalid mobile number");
  }
  if (errors.length > 0) {
    return res.status(400).render("contact", {
      contact: contacts.filter(c => !c.isDeleted),
      errors,
      successMsg: null,
      title: "Contact Page",
      activePage: "contact",
    });
  }
  let newId = 1;
  if (contacts.length > 0) {
    const lastId = Math.max(...contacts.map(c => c.id || 0));
    newId = lastId + 1;
  }
  const contact = { id: newId, name, email, mobile, isDeleted: false };
  savingData(datapath, contact);
  res.redirect("/contact?success=Data successfully added");
});


app.post("/contact/edit/:id", (req, res) => {
  const { id } = req.params; 
  const { username, email, mobile } = req.body;
  const contacts = fileHandler.readFileArray(datapath);
  const contact = contacts.find((c) => String(c.id) === String(id));
  const errors = [];

  // cek apakah contact ada
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact not found" });
  }

  // validasi input
  if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }
  if (!validatePhone(mobile)) {
    errors.push("Invalid phone number");
  }

  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).render("contact", {
      contact: contacts, // kirim semua data contact untuk view
      errors,
      successMsg: null,
      title: "Contact Page",
      activePage: "contact",
    });
  }

  // update langsung contact yang ketemu
  contact.name = username;
  contact.email = email;
  contact.mobile = mobile;

  updateData(datapath, contacts);
  res.redirect("/contact?success=Data successfully Modified");
});


app.post("/contact/delete/:id", (req, res) => {
  const { id } = req.params; // ambil id dari URL
  const contacts = fileHandler.readFileArray(datapath);
  const contact = contacts.find((c) => String(c.id) === String(id));

  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact not found" });
  }

  contact.isDeleted = true;
  updateData(datapath, contacts);
  res.redirect("/contact?success=Data successfully Deleted");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${PORT} 🚀`);
});
