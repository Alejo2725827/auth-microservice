const User = require('../../models/mongo/user.model.js'); // Importa el modelo de usuario
const bcrypt = require('bcrypt');

class AuthCtrl {

    registro = async (req, res) => {
        try {

            const { name, email, password } = req.body;

            if (!password || typeof password !== 'string') {
                return res.status(400).json({ mensaje: 'La contraseña es requerida y debe ser una cadena' });
            }
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ mensaje: 'El correo ya está registrado' });
            }

            // Nuevo usuario
            const newUser = new User({
                name,
                email,
                password
            });

            await newUser.save();


            res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: `${error}` });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Verifica si se ingresaron el email y la contraseña
            if (!email || !password) {
                return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ mensaje: "No se encontró el usuario" });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(401).json({ mensaje: "Credenciales inválidas" });
            } else {
                return res.status(200).json({ mensaje: "Autenticación éxitosa!", user: { name: user.name, email: user.email } });
            }
        } catch (error) {
            return res.status(500).json({ mensaje: 'Error de autenticación', detalle: `${error}` });
        }
    };

}

module.exports = AuthCtrl;
