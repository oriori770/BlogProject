import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/auth";
import { createUser } from "../services/userService";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
    const { username, password, role, salary, yearsOfExperience, startDate, age, departmentId } = req.body;

    try {
        const user = await createUser({
            username, password, role, salary, yearsOfExperience, startDate, age
        }, departmentId);
        // אם המשתמש הוא מנהל תייצר לו טוקן
        if (user.role === 'manager') {
            res.status(201).json({ message: "נרשמת בהצלחה אדוני המנהל" })
        } else {
            res.status(201).json({ message: "נרשמת בהצלחה עבד " })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json("תקלה בהרשמה")
    }
}

// התחברות של משתמש קיים
export const login = async (req: any, res: any) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" })
    };

    // לעדכן מתי נכנס
    user.lastLogin = new Date();
    await user.save()

    const token = generateToken(user.id, user.role)
    res.status(201).json({ message: "התחברת בהצלחה", token })
}