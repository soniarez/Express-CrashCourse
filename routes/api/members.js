const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//Gets all members
router.get("/", (req, res) => res.json(members));

//Gets single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found ` });
  }
});

//Create member
router.post("/", (req, res) => {
  const newMember = {
    //pagacke uuid is used to generate a random id
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members); // We need to send back a response. In this case we send back the members array
  //res.redirect("/"); //if rendering views we wouldn return json. We would redictect. We can also redirect to a different route
});

//Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        //I always send back a response:
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found ` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id !== parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `Member with id of ${req.params.id} not found ` });
  }
});

module.exports = router;
