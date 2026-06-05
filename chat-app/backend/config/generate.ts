import jwt from "jsonwebtoken";

interface generateDTO {
    id: number;
    isAdmin: boolean;
}

export function generate(user: generateDTO) {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretKey, { expiresIn: "7d" });
}