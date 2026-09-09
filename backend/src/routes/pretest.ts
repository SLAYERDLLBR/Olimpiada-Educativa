import { Router } from "express";
import { z } from "zod";
import { validateBody, validateQuery } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { getRandomPretestQuestion } from "../services/QuestionService.js";
import { submitPretest } from "../services/PretestService.js";

export const pretestRouter = Router();

const questionsQuerySchema = z.object({
  series: z.coerce.number().int().min(1).max(5),
  subject: z.enum(["portugues", "matematica"]),
});

pretestRouter.get(
  "/questions",
  validateQuery(questionsQuerySchema),
  asyncHandler(async (req, res) => {
    const { series, subject } = res.locals.query as z.infer<typeof questionsQuerySchema>;
    const question = await getRandomPretestQuestion(series, subject);
    res.json({ question });
  })
);

const submitSchema = z.object({
  playerId: z.string().uuid(),
  surveyChoice: z.enum(["portugues", "matematica", "ambas", "nenhuma"]),
  ptQuestionId: z.string().uuid(),
  ptAnswerId: z.string(),
  mathQuestionId: z.string().uuid(),
  mathAnswerId: z.string(),
});

pretestRouter.post(
  "/submit",
  validateBody(submitSchema),
  asyncHandler(async (req, res) => {
    const input = req.body as z.infer<typeof submitSchema>;
    const result = await submitPretest(input);
    res.json(result);
  })
);
