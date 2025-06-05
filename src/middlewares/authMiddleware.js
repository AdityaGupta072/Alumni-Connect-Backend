const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized: No Token Provided" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // makes `req.user.id` and `req.user.role` available in routes
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};

module.exports = authenticateUser;
