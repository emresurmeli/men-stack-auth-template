import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET
// http:localhost:3000/users/:userId/applications/
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user);

    res.render("applications/index.ejs", {
      user: req.session.user,
      applications: user.applications,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  try {
    res.render("applications/new", { user: req.session.user });
  } catch (error) {
    console.error(error);
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { company, title, notes, postingLink, status } = req.body;

    // We create an application on the user and push it to the db
    const user = await User.findById(req.session.user._id);

    user.applications.push({
      company,
      title,
      notes,
      postingLink,
      status,
    });

    await user.save();
    // Redirect the user to the /users/userId/applications
    res.redirect(`/users/${req.session.user._id}/applications`);
  } catch (error) {
    console.error(error);
    res.send("There was an error creating the applicaiton.");
  }
});

// PUT

// DELETE

export default router;
