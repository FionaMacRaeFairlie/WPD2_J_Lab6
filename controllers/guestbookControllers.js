const guestbookDAO = require("../models/guestbookModel");
const userDao = require("../models/userModel.js");

const db = new guestbookDAO("database/messages.db");
// db.init();

exports.entries_list = function (req, res) {
  res.send("<h1>Not yet implemented: show a list of guest book entries.</h1>");
  db.getAllEntries();
};

exports.landing_page = function (req, res) {
  let signedIn;
  if (req.cookies.jwt) {
    signedIn = "user";
  }
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Guest Book",
        entries: list,
        user: signedIn,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post_new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/");
};

exports.peters_entries = function (req, res) {
  res.send("<h1>Processing Peter's Entries, see terminal</h1>");
  db.getPetersEntries();
};

exports.show_user_entries = function (req, res) {
  let signedIn;
  if (req.cookies.jwt) {
    signedIn = "user";
  }
  console.log("filtering author name", req.params.author);
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Guest Book",
        entries: entries,
        user: signedIn,
      });
    })
    .catch((err) => {
      console.log("error handling author posts", err);
    });
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};
exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;
  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.show_login_page = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  if (req.cookies.jwt) {
    signedIn = "user";
  }
  res.render("newEntry", {
    title: "Guest Book",
  });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};
