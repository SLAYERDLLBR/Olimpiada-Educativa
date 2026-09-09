import { Router } from "express";
import { z } from "zod";
import { validateBody } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { createPlayer, issueSessionToken } from "../services/PlayerService.js";

export const playersRouter = Router();

const createPlayerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres"),
  series: z.number().int().min(1).max(5),
  avatarIndex: z.number().int().min(0).max(7),
});

playersRouter.post(
  "/",
  validateBody(createPlayerSchema),
  asyncHandler(async (req, res) => {
    const { username, series, avatarIndex } = req.body as z.infer<typeof createPlayerSchema>;
    const player = await createPlayer(username, series, avatarIndex);
    const sessionToken = issueSessionToken(player.id);
    res.status(201).json({ playerId: player.id, sessionToken });
  })
);
