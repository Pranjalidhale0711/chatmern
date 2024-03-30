import jwt from "jsonwebtoken";
import  dotenv from 'dotenv';

dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
    // console.log(process.env.JWT_SECRET)
	const token = jwt.sign({ userId }, "S58m8hZ6RGB2UZIVO0rW9VKnEBr2mZ+3J/hOmdfsO5k=", {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};

export default generateTokenAndSetCookie;