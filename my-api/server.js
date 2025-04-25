const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let users = require("./MOCK_DATA.json");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

function saveUsersToFile() {
  fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
}
// GET /api/users — fetch users
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  return res.json(user);
});

app.get("/users", (req, res) => {
  // res.json(users);
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// POST /api/users — add user
app.post("/api/users", (req, res) => {
  const { first_name, last_name, email, gender, city } = req.body;

  if (!first_name || !email) {
    return res
      .status(400)
      .json({ message: "First Name and Email are required" });
  }

  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    gender,
    city,
  };

  users.push(newUser);
  saveUsersToFile();
  res.status(201).json(newUser);
});

// DELETE /api/users/:id — delete user
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);
  saveUsersToFile();
  res.json({ message: "User deleted successfully." });
});

// Update user
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;

  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    // Update values
    users[index] = {
      id: id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      city: updatedUser.city,
    };

    console.log("Updated users list:", users); // <<-- Yeh add karo
    saveUsersToFile();

    res.json({
      message: "User updated successfully",
      user: users[index],
    });
  } else {
    res.status(404).send("User not found");
  }
});
