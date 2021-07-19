import { Request, Response } from "express";
import { Transactions } from "../../../core/data/database/entities/Transactions";

export default class TransactionsController {
  public async store(req: Request, res: Response) {
    const { title, value, description, idOwner } = req.body;

    if (!title) {
      return res.status(400).json({
        msg: "O título deve ser informado",
      });
    }
    if (!value) {
      return res.status(400).json({
        msg: "O valor deve ser informado",
      });
    }
    if (!idOwner) {
      return res.status(400).json({
        msg: "O id do dono da transação deve ser informado",
      });
    }

    try {
      const transactions = new Transactions(
        title,
        value,
        description,
        idOwner
      ).save();

      return res.status(201).json(transactions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const transactions = await Transactions.findOne(id, {
      relations: ["user"],
    });

    return res.json(transactions);
  }

  public async index(req: Request, res: Response) {
    const users = await Transactions.find();

    return res.json(users);
  }
}
