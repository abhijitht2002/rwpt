const jwt = require("jsonwebtoken");
const env = require("../config/env");

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const role = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
}

module.exports = { protect, role };