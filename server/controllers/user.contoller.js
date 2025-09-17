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

