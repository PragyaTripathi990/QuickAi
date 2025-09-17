import jwt from "jsonwebtoken";

export default genToken = async (userId) => {
    try {
        const token = await jwt.sign({userId}, //payroll
             process.env.JWT_SECRET, // secret
              {expiresIn: '10d'}) // options
        return token
    } catch (errors) {
        console.error("Token generation error:", errors);
    }
}
