import bcrypt from 'bcryptjs';
import User from '../modles/user.model.js';
import genToken from '../config/token.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            password: hashedPassword,
            email
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: "strict",
            secure: false
        });
        // This tells the frontend signup succeeded. 201 = "Created".
        return res.status(201).json(user);

    } catch (errors) {
        console.error("Sign up error:", errors);
        return res.status(500).json({ message: "login error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        });
        // Exclude password from user object
        const { password: _pw, ...userWithoutPassword } = user.toObject();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "logged out successfully"})
    } catch(error) {
        console.error("Sign out error:", error);
        return res.status(500).json({message:"error" + error})
    }
}
