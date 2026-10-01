"use client";

import Link from "next/link";
import { useState } from "react";
import { Mark } from "@/components/brand";
import { btn } from "@/components/ui";
import { site } from "@/lib/site";
import { supabase } from "@/lib/supabase";

type Option = { value: string; label: string };

const GENDER: Option[] = [
  { value: "male", label: "남" },
  { value: "female", label: "여" },
];
const MARITAL: Option[] = [
  { value: "single", label: "미혼" },
  { value: "married", label: "기혼" },
];
const BAPTISM: Option[] = [
  { value: "none", label: "미세례" },
  { value: "infant", label: "유아세례" },
  { value: "baptized", label: "세례" },
  { value: "confirmed", label: "입교" },
  { value: "unknown", label: "모르겠음" },
];
const FAITH_YEARS: Option[] = [
  { value: "new", label: "처음이에요" },
  { value: "lt1", label: "1년 이하" },
  { value: "1to5", label: "1–5년" },
  { value: "5to10", label: "5–10년" },
  { value: "gt10", label: "10년 이상" },
  { value: "from_birth", label: "모태신앙" },
];
const ROLE: Option[] = [
  { value: "none", label: "직분 없음" },
  { value: "deacon", label: "집사" },
  { value: "kwonsa", label: "권사" },
  { value: "ordained_deacon", label: "안수집사" },
  { value: "elder", label: "장로" },
];
const FOUND_VIA: Option[] = [
  { value: "referral", label: "가족·지인 추천" },
  { value: "online", label: "유튜브·홈페이지·SNS" },
  { value: "nearby", label: "집 근처 교회라서" },
  { value: "moved", label: "다른 교회에서 옮겨옴" },
];

const input =
  "w-full rounded-xl bg-cream px-4 py-3.5 text-[15px] ring-1 ring-line transition outline-none placeholder:text-sub/60 focus:bg-white focus:ring-2 focus:ring-brand-blue";

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-2">
      <span className="text-sm font-bold">
        {label}
        {required && <span className="ml-1 text-brand-blue">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-sub">{hint}</span>}
      </span>
      {children}
    </div>
  );
}

// 라디오를 알약 모양 버튼으로
function Chips({ name, options, value, onChange }: { name: string; options: Option[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o.value}
          className={`cursor-pointer rounded-full px-4 py-2.5 text-sm transition has-focus-visible:ring-2 has-focus-visible:ring-brand-blue ${
            value === o.value ? "bg-navy font-bold text-cream" : "bg-cream text-ink ring-1 ring-line hover:ring-navy/40"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            onClick={() => value === o.value && onChange("")}
            className="sr-only"
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-6 border-t border-line pt-8 first:border-0 first:pt-0">
      <legend className="contents">
        <span className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-brand-yellow font-en text-sm font-bold text-navy">{step}</span>
          <span className="text-lg font-black tracking-tight lg:text-xl">{title}</span>
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

const EMPTY = {
  name: "",
  phone: "",
  gender: "",
  birth_date: "",
  address: "",
  marital_status: "",
  family_at_church: "",
  baptism: "",
  faith_years: "",
  previous_church: "",
  previous_role: "",
  found_via: "",
  message: "",
};

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

export function NewFamilyForm() {
  const [form, setForm] = useState(EMPTY);
  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const set = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // 스팸 방지용 숨김 칸
    if (!form.name.trim()) return setError("이름을 입력해 주세요.");
    if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(form.phone)) return setError("전화번호를 010-1234-5678 형식으로 입력해 주세요.");
    if (!agreed) return setError("개인정보 수집 및 이용에 동의해 주세요.");
    setError("");
    setState("sending");

    if (!supabase) {
      // 아직 Supabase 미연결: 화면 흐름만 확인
      await new Promise((r) => setTimeout(r, 600));
      setState("done");
      return;
    }
    const row = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() === "" ? null : v.trim()]));
    const { error: dbError } = await supabase.from("new_family_registrations").insert({ ...row, privacy_agreed: true });
    if (dbError) {
      console.error(dbError);
      setState("error");
      setError(`제출하지 못했습니다. 잠시 후 다시 시도하시거나 ${site.phone}로 연락 주세요.`);
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="grid justify-items-center gap-4 rounded-[28px] bg-white px-6 py-16 text-center shadow-card lg:py-24">
        <Mark className="w-14" />
        <span className="eyebrow text-brand-blue">WELCOME HOME</span>
        <h2 className="text-2xl font-black tracking-tight lg:text-3xl">
          {form.name}님,
          <br />
          {site.name}에 오신 것을 환영합니다
        </h2>
        <p className="max-w-[36ch] text-sub">
          등록 신청이 접수되었습니다. 새가족 담당자가 곧 연락드릴게요.
          {!supabase && (
            <span className="mt-2 block text-xs text-brand-blue">※ 테스트 모드라 실제로 저장되지는 않았습니다.</span>
          )}
        </p>
        <Link href="/" className={`${btn.primary} ${btn.size} mt-2`}>
          홈으로
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 rounded-[28px] bg-white p-6 shadow-card sm:p-10 lg:p-14">
      {!supabase && (
        <p className="rounded-xl bg-brand-yellow/25 px-4 py-3 text-sm text-navy">
          지금은 테스트 모드입니다. 제출해도 실제로 저장되지 않습니다.
        </p>
      )}
      {/* 스팸 방지: 사람에게는 보이지 않는 칸 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Section step="1" title="기본 정보">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="이름" required>
            <input id="nf-name" className={input} value={form.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" maxLength={40} placeholder="홍길동" />
          </Field>
          <Field label="전화번호" required>
            <input
              id="nf-phone"
              className={`${input} tabular-nums`}
              value={form.phone}
              onChange={(e) => set("phone")(formatPhone(e.target.value))}
              inputMode="numeric"
              autoComplete="tel"
              placeholder="010-1234-5678"
            />
          </Field>
          <Field label="성별">
            <Chips name="gender" options={GENDER} value={form.gender} onChange={set("gender")} />
          </Field>
          <Field label="생년월일">
            <input id="nf-birth" type="date" className={`${input} tabular-nums`} value={form.birth_date} onChange={(e) => set("birth_date")(e.target.value)} max="2026-12-31" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="주소">
              <input id="nf-address" className={input} value={form.address} onChange={(e) => set("address")(e.target.value)} autoComplete="street-address" maxLength={200} placeholder="예) 성남시 수정구 위례광장로" />
            </Field>
          </div>
          <Field label="혼인 여부">
            <Chips name="marital" options={MARITAL} value={form.marital_status} onChange={set("marital_status")} />
          </Field>
          <Field label="함께 다니는 가족" hint="대표 1명 이름, 연락처">
            <input id="nf-family" className={input} value={form.family_at_church} onChange={(e) => set("family_at_church")(e.target.value)} maxLength={100} placeholder="없으면 비워 두세요" />
          </Field>
        </div>
      </Section>

      <Section step="2" title="신앙 정보">
        <Field label="세례 여부">
          <Chips name="baptism" options={BAPTISM} value={form.baptism} onChange={set("baptism")} />
        </Field>
        <Field label="신앙 생활 기간">
          <Chips name="faith" options={FAITH_YEARS} value={form.faith_years} onChange={set("faith_years")} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="이전 교회">
            <input id="nf-prev-church" className={input} value={form.previous_church} onChange={(e) => set("previous_church")(e.target.value)} maxLength={100} placeholder="없으면 비워 두세요" />
          </Field>
          <Field label="이전 직분">
            <Chips name="role" options={ROLE} value={form.previous_role} onChange={set("previous_role")} />
          </Field>
        </div>
      </Section>

      <Section step="3" title="조금 더 알려주세요">
        <Field label="빛으로교회를 알게 된 경로">
          <Chips name="found" options={FOUND_VIA} value={form.found_via} onChange={set("found_via")} />
        </Field>
        <Field label="기도 제목 · 하고 싶은 말">
          <textarea
            id="nf-message"
            className={`${input} min-h-32 resize-y`}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            maxLength={1000}
            placeholder="편하게 적어 주세요"
          />
        </Field>
      </Section>

      <div className="grid gap-3 rounded-2xl bg-cream p-5 ring-1 ring-line">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="nf-agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-5 flex-none accent-[var(--color-brand-blue)]"
          />
          <span className="text-sm">
            <b>[필수] 개인정보 수집 및 이용에 동의합니다.</b>
          </span>
        </label>
        <button type="button" onClick={() => setShowPolicy((v) => !v)} className="w-fit pl-8 text-xs text-sub underline underline-offset-2" aria-expanded={showPolicy}>
          {showPolicy ? "내용 접기" : "내용 보기"}
        </button>
        {showPolicy && (
          <dl className="grid gap-2 pl-8 text-xs leading-relaxed text-sub">
            <div>
              <dt className="font-bold text-ink">수집 목적</dt>
              <dd>새가족 등록, 교회 생활 안내 및 연락</dd>
            </div>
            <div>
              <dt className="font-bold text-ink">수집 항목</dt>
              <dd>필수: 이름, 전화번호 / 선택: 성별, 생년월일, 주소, 혼인 여부, 가족 정보, 신앙 정보, 기도 제목</dd>
            </div>
            <div>
              <dt className="font-bold text-ink">보유 기간</dt>
              <dd>교인 등록 기간 동안 보관하며, 요청하시면 지체 없이 파기합니다. [교회 확인 필요]</dd>
            </div>
            <p>동의하지 않으실 수 있으며, 이 경우 온라인 등록 대신 예배 후 안내 데스크에서 등록하실 수 있습니다.</p>
          </dl>
        )}
      </div>

      {error && (
        <p role="alert" className="-mt-4 text-sm font-bold text-[#c2410c]">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === "sending"} className={`${btn.primary} w-full py-4 text-base disabled:opacity-60 lg:py-5 lg:text-lg`}>
        {state === "sending" ? "보내는 중…" : "새가족 등록하기"}
      </button>
    </form>
  );
}
