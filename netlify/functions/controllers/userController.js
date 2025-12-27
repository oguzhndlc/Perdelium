const supabase = require('../lib/supabase');

// Kullanıcıları Listele
exports.getUser = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, created_at, name'); // Sadece var olan sütunları istiyoruz

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kullanıcı Ekle
exports.createUser = async (req, res) => {
  try {
    const { name } = req.body; // Frontend'den sadece name alıyoruz

    if (!name) {
      return res.status(400).json({ error: "İsim alanı boş olamaz." });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name }]) // id ve created_at otomatik oluşacak
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};