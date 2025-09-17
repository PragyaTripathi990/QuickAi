import User from '../modles/user.model.js';
import geminiResponse from '../gemini.js';

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch(errors) {
        console.error("Get current user error:", errors);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch(errors) {
        console.error("Update user error:", errors);
        return res.status(500).json({ message: "Server error" });
    }
}

export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;
        const response = await geminiResponse(command);
        return res.status(200).json({ response });
    } catch(errors) {
        console.error("Ask to assistant error:", errors);
        return res.status(500).json({ message: "Server error" });
    }
}

