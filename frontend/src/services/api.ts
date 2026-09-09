import type { PretestResult, PublicQuestion, Subject, SurveyChoice } from "../types/index.ts";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function createPlayer(username: string, series: number, avatarIndex: number) {
  return request<{ playerId: string; sessionToken: string }>("/players", {
    method: "POST",
    body: JSON.stringify({ username, series, avatarIndex }),
  });
}

export function getPretestQuestion(series: number, subject: Subject) {
  return request<{ question: PublicQuestion }>(`/pretest/questions?series=${series}&subject=${subject}`);
}

export function submitPretest(input: {
  playerId: string;
  surveyChoice: SurveyChoice;
  ptQuestionId: string;
  ptAnswerId: string;
  mathQuestionId: string;
  mathAnswerId: string;
}) {
  return request<PretestResult>("/pretest/submit", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
