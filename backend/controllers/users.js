// controllers/users.js
import User from "../models/User.js";

// Tüm kullanıcıları getir
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};

// Belirli bir kullanıcıyı ID ile getir
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};

// Yeni kullanıcı oluştur
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Gerekli alanların dolu olup olmadığını kontrol edin
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tüm alanlar gereklidir." });
    }

    // Aynı email ile kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Bu email ile kayıtlı kullanıcı zaten var." });
    }

    // Yeni kullanıcı oluştur
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata oluştu:", error);
    res
      .status(500)
      .json({ message: "Kullanıcı oluşturulurken hata oluştu.", error });
  }
};

// Kullanıcıyı güncelle
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Sadece gerekli alanları alın ve güncelleyin
    const { name, email, password } = req.body;

    await user.update({ name, email, password });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı güncellenirken hata oluştu.", error });
  }
};

// Kullanıcıyı sil
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    await user.destroy();
    res.status(200).json({ message: "Kullanıcı başarıyla silindi." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı silinirken hata oluştu.", error });
  }
};
