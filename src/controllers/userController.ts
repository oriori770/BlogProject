import { Request, Response } from "express";
import * as userService from "../services/userService"


export const getOneUser = async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        res.status(404).json({ messege: "User not found" })
    }

    res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers()

    res.json(users)
}

// מעדכן את המשתמש

export const updateUserById = async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body)

    if (!user) {
        res.status(404).json({ messege: "User not found" })
    }

    res.json(user)
}

export const deleteUserById = async (req: Request, res: Response) => {
    const user = await userService.deleteUser(req.params.id)

    if (!user) {
        res.status(404).json({ messege: "User not found" })
    }

    res.json({ message: "User Deleted!" })
}

export const getStatistics = async (req: Request, res: Response) => {
    const statistics = await userService.getUserStatistics();

    res.json(statistics);
}