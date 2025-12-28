const bcrypt = require("bcryptjs");
const supabase = require("../lib/supabase");

exports.register = async (req, res) => {
  try {
    const { email, username, password, name, surname } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "Zorunlu alanlar eksik" });
    }

// const password_hash = await bcrypt.hash(password, 10);
const password_hash = password; // TEST AMAÇLI


    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          username,
          password_hash,
          name,
          surname,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      success: true,
      user: data[0],
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // identifier = email OR username

    if (!identifier || !password) {
      return res.status(400).json({
        error: "Kullanıcı adı/email ve şifre zorunlu",
      });
    }

    // 1️⃣ Email veya username ile kullanıcıyı bul
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${identifier},username.eq.${identifier}`)
      .limit(1);

    if (error || !users || users.length === 0) {
      return res.status(401).json({
        error: "Kullanıcı adı/email veya şifre hatalı",
      });
    }

    const user = users[0];

    // 2️⃣ Şifre kontrol
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        error: "Kullanıcı adı/email veya şifre hatalı",
      });
    }

    // 3️⃣ Güvenlik
    delete user.password_hash;

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};