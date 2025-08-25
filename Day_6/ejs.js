import express from "express";
import expressLayouts from "express-ejs-layouts";
const app = express();
import morgan from "morgan";
import cors from "cors";
import {
  fileHandler,
} from "../Day_3/utils/fileHandler.js";
import { validateEmail, validatePhone } from "../Day_3/utils/validator.js";
import {
  loadContact,
  createContact,
  editContact,
  deleteContact
} from "./views/utils/db/contactApi.js";
import contactApi from "./views/utils/router/contact.js";

app.use(cors({
  origin: "http://localhost:5173",  // alamat frontend kamu
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // kalau butuh cookie / auth
}));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;
const ipAddress = "localhost";
const logPath = "./log/errors.json";

app.use(express.static("public"));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => {
        process.stdout.write(message); 
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

        let errorsLog = [];
        try {
          errorsLog = fileHandler.readFileArray(logPath);
        } catch (err) {
          errorsLog = []; 
        }
        errorsLog.push(errorEntry);
        fileHandler.writeFile(logPath, errorsLog);
      }
      return false;
    },
  })
);

app.use("/api", contactApi);

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", activePage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", activePage: "about" });
});

app.get("/contact", async (req, res) => {
  const contacts = await loadContact();
  res.render("contact", {
    contact: contacts,
    errors: null,
    old: {},
    showAddModal: false,
    showEditModal: false,
    successMsg: req.query.success || null,
    title: "Contact Page",
    activePage: "contact",
  });
});

app.post("/contact/input", async (req, res) => {
  const { name, email, mobile } = req.body;
  const errors = [];
  const existingContact = await loadContact();

  if (existingContact.find((c) => c.name === name && !c.isDeleted)) {
    errors.push({ param: "name", msg: "Name already exist" });
  }
  if (!validateEmail(email)) {
    errors.push({ param: "email", msg: "Invalid email format" });
  }
  if (!validatePhone(mobile)) {
    errors.push({ param: "mobile", msg: "Invalid mobile number" });
  }

  const errorObj = {};
  if (Array.isArray(errors)) {
    errors.forEach((err) => {
      errorObj[err.param] = err.msg;
    });
  }

  if (errors.length > 0) {
    return res.status(400).render("contact", {
      contact: existingContact.filter((c) => !c.isDeleted),
      errors: errorObj,
      old: {
        name,
        email,
        mobile,
      },
      showAddModal: true,
      showEditModal: false, 
      successMsg: null,
      title: "Contact Page",
      activePage: "contact",
    });
  }

  await createContact(name, email, mobile);
  res.redirect("/contact?success=Data successfully added");
});

app.post("/contact/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile } = req.body;
  const contacts = await loadContact();
  const errors = [];

  if (contacts.find(c => c.name === name && c.id !== id && !c.isDeleted)) {
    errors.push({ param: "name", msg: "Name already exist" });
  }
  if (!validateEmail(email)) errors.push({ param: "email", msg: "Invalid email format" });
  if (!validatePhone(mobile)) errors.push({ param: "mobile", msg: "Invalid mobile number" });
  if (errors.length > 0) {
    const errorObj = errors.reduce((acc, err) => {
      acc[err.param] = err.msg;
      return acc;
    }, {});

    return res.status(400).render("contact", {
      contact: contacts.filter(c => !c.isDeleted),
      editErrors: errorObj,   
      oldEdit: { id, name, email, mobile }, 
      showEditModal: true,
      showAddModal: false, 
      successMsg: null,
      title: "Contact Page",
      activePage: "contact"
    });
  }

  await editContact(id, name, email, mobile);
  res.redirect("/contact?success=Data successfully Modified");
});

app.post("/contact/delete/:id", async (req, res) => {
  const { id } = req.params; 
  const contacts = await loadContact();
  const contact = contacts.find((c) => String(c.id) === String(id));

  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "Contact not found" });
  }

  await deleteContact(id);
  res.redirect("/contact?success=Data successfully Deleted");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${PORT} 🚀`);
});
