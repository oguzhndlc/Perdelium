const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.getUser = (req, res) => {
  const name = req.query.name || "Guest";
  return res.status(200).json({ message: name });
};

exports.saveUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("SUPABASE URL:", process.env.SUPABASE_DATABASE_URL);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name zorunlu" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error(err); // 🔥 terminalde hatayı gör
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

exports.deleteUser = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  return res.status(200).json({
    message: `User ${name} deleted successfully!`,
  });
};

exports.updateUser = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  return res.status(200).json({
    message: `User ${name} updated successfully!`,
  });
};
