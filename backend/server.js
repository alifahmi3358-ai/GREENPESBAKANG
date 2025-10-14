const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock user data
const users = [
  { email: 'alifahmi3358@gmail.com', password: '123456' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      message: 'Login berhasil! Selamat datang di GREENPES BAKANG.',
      user: { email: user.email }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Email atau password salah!' 
    });
  }
});

// Registration endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log('Registration attempt:', email);
    
    // Validasi
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ 
            success: false, 
            message: 'Semua field harus diisi!' 
        });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ 
            success: false, 
            message: 'Password dan konfirmasi password tidak cocok!' 
        });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: 'Password minimal 6 karakter!' 
        });
    }
    
    // Cek apakah email sudah terdaftar
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email sudah terdaftar!' 
        });
    }
    
    // Simpan user baru
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    
    console.log('User registered:', email);
    res.json({ 
        success: true, 
        message: 'Registrasi berhasil! Silakan login.' 
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(5000, () => {
  console.log('🚀 Backend server running on port 5000');
  console.log('📧 Test user: alifahmi3358@gmail.com / 123456');
});
