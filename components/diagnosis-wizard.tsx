"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";

export function DiagnosisWizard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLast = currentIndex === QUESTIONS.length - 1;

  const selectAnswer = (optionIndex: number) => {
    setError("");
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (currentIndex === 0 && !name.trim()) {
      setError("まずは冒険者名を入力してください。");
      return;
    }

    if (answers[currentIndex] === -1) {
      setError("選択肢を1つ選んでください。");
      return;
    }

    if (!isLast) {
      setCurrentIndex((value) => value + 1);
    }
  };

  const goBack = () => {
    setError("");
    setCurrentIndex((value) => Math.max(0, value - 1));
  };

  const submitDiagnosis = () => {
    if (!name.trim()) {
      setError("冒険者名が必要です。");
      return;
    }

    if (answers.some((answer) => answer === -1)) {
      setError("すべての質問に答えてください。");
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/diagnosis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            answers
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "診断結果の保存に失敗しました。");
        }

        router.push(`/results/${payload.id}`);
      } catch (submitError) {
        const message =
          submitError instanceof Error ? submitError.message : "通信に失敗しました。";
        setError(message);
      }
    });
  };

  return (
    <div className="form-grid">
      <div>
        <label className="field-label" htmlFor="adventurer-name">
          冒険者名
        </label>
        <input
          id="adventurer-name"
          className="text-input"
          maxLength={24}
          placeholder="例: ルミナ、アッシュ、ミナト"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <div className="progress-row">
          <strong>
            Question {currentIndex + 1} / {QUESTIONS.length}
          </strong>
          <span className="subtle">{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="question-card">
        <div>
          <span className="chip">{currentQuestion.category}</span>
          <h2 className="question-title">{currentQuestion.question}</h2>
        </div>

        <div className="option-grid">
          {currentQuestion.options.map((option, optionIndex) => {
            const selected = answers[currentIndex] === optionIndex;

            return (
              <button
                key={option.title}
                type="button"
                className={`option-button${selected ? " selected" : ""}`}
                onClick={() => selectAnswer(optionIndex)}
              >
                <span className="option-title">{option.title}</span>
                <span className="option-copy">{option.description}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="status-text">{error}</div>

      <div className="wizard-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={goBack}
          disabled={currentIndex === 0 || isPending}
        >
          前の質問へ
        </button>

        {isLast ? (
          <button
            type="button"
            className="submit-button"
            onClick={submitDiagnosis}
            disabled={isPending}
          >
            {isPending ? "診断中..." : "結果を生成する"}
          </button>
        ) : (
          <button
            type="button"
            className="cta"
            onClick={goNext}
            disabled={isPending}
          >
            次の質問へ
          </button>
        )}
      </div>
    </div>
  );
}
