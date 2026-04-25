import { QUESTIONS } from "@/lib/questions";

const UUID_V4_LIKE_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidResultId(value: string) {
  return UUID_V4_LIKE_PATTERN.test(value);
}

export function sanitizeName(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 24);
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function validateAnswers(answers: unknown) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    return false;
  }

  return answers.every((answer, questionIndex) => {
    return (
      Number.isInteger(answer) &&
      Number(answer) >= 0 &&
      Number(answer) < QUESTIONS[questionIndex].options.length
    );
  });
}
