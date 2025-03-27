import cors from 'cors';
app.use(cors());

// Modify your POST response to return JSON
app.post("/", (req, res) => {
  const { username, password } = req.body;
  
  if (username === ValidUser.username && password === ValidUser.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});