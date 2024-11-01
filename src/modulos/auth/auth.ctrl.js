const User = require('../../models/mongo/user.model.js'); // Importa el modelo de usuario
const bcrypt = require('bcrypt');

class AuthCtrl {

    registro = async (req, res) => {
        try {
            // Extraer datos del cuerpo de la solicitud
            const { name, email, password } = req.body;

            console.log('El body ', req.body)

            // Validar si ya existe un usuario con el mismo email
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ mensaje: 'El correo ya está registrado' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // Guardar el usuario en la base de datos
            await newUser.save();

            // Enviar respuesta de éxito
            res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
        } catch (error) {
            // Manejo de errores
            res.status(500).json({ mensaje: 'Error al registrar usuario', error: `${error}` });
        }
    }

    login = (req, res) => {
        res.send('login user');
    }
}

module.exports = AuthCtrl;
