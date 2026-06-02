"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { TemplateKey } from "./templates";
import { FAQ_EN } from "./faq";

export { FAQ_EN };

/**
 * Lightweight i18n for the marketing/landing page. The toggle in the nav
 * flips between English and Japanese; the choice is persisted to localStorage
 * so it sticks across reloads.
 */

export type Lang = "en" | "jp";

export interface LandingCopy {
  nav: { editor: string; getStarted: string };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    fineprint: string;
  };
  features: {
    heading: string;
    sub: string;
    items: { title: string; description: string }[];
  };
  preview: {
    heading: string;
    sub: string;
    use: (name: string) => string;
    downloadBlank: string;
    templateDescriptions: Record<TemplateKey, string>;
  };
  resumeTypes: {
    heading: string;
    sub: string;
    categories: {
      title: string;
      jp: string;
      blurb: string;
      items: { name: string; jp: string; desc: string }[];
    }[];
  };
  howItWorks: {
    heading: string;
    sub: string;
    steps: { title: string; desc: string }[];
  };
  faq: {
    heading: string;
    sub: string;
    items: { q: string; a: string }[];
  };
  cta: { heading: string; sub: string; button: string };
}

export const LANDING_COPY: Record<Lang, LandingCopy> = {
  en: {
    nav: { editor: "Editor", getStarted: "Get started" },
    hero: {
      badge: "English / 日本語 / नेपाली → Professional 日本語",
      titleLine1: "The Japanese resume,",
      titleLine2: "written for you.",
      subtitle:
        "Build a JIS-style 履歴書 that matches the format Japanese employers actually expect. Fill it out in any language, get a polished PDF in Japanese.",
      ctaPrimary: "Start your rirekisho",
      ctaSecondary: "See the preview",
      fineprint: "Free · No signup · Your data stays in your browser",
    },
    features: {
      heading: "Everything you need to apply in Japan",
      sub: "A traditional 履歴書, generated from a modern editor — no Japanese typewriter required.",
      items: [
        {
          title: "Authentic JIS-style format",
          description:
            "Pixel-faithful recreation of the standard rirekisho template. Two A4 pages, the exact table grid that Japanese HR expects.",
        },
        {
          title: "Type in any language",
          description:
            "Write in English, Nepali, or Japanese. Each section is rewritten into natural business Japanese before it lands on the page.",
        },
        {
          title: "Live preview",
          description:
            "See the resume update as you type. Adjust margins, swap a photo, change history rows — the sheet reflows in real time.",
        },
        {
          title: "Three export formats",
          description:
            "High-resolution PDF, XeLaTeX .tex source, or JSON backup you can re-import later. Take your data with you.",
        },
        {
          title: "No account, no tracking",
          description:
            "Everything lives in your browser. Nothing is stored on a server — leave the page and it's gone.",
        },
        {
          title: "Ready for Japan job market",
          description:
            "Fields, ふりがな lines, photo box, 配偶者 / 扶養家族 / 本人希望記入欄 — all positioned where employers expect them.",
        },
      ],
    },
    preview: {
      heading: "Four templates. Same data.",
      sub: "Switch layouts any time without retyping a thing.",
      use: (name) => `Use ${name}`,
      downloadBlank: "Download blank template",
      templateDescriptions: {
        "jis-a3":
          "Traditional 観音開き layout printed on A3 landscape — what most Japanese companies expect.",
        "jis-a4": "Same JIS fields condensed onto a single A4 portrait page.",
        "mhlw-a4":
          "2021 government-recommended layout — no gender, spouse, or commute fields. Modern and inclusive.",
        "modern-a4": "Minimal single-column A4 design for tech/startup applications.",
      },
    },
    resumeTypes: {
      heading: "Every Japanese resume format, in one place",
      sub: "Whatever role you're applying for in Japan — full-time, career change, new grad, part-time, or a global tech job — there's a format built for it.",
      categories: [
        {
          title: "Standard Full-Time Resumes",
          jp: "履歴書 · Rirekisho",
          blurb: "The fixed-format Japanese resume every employer recognises.",
          items: [
            {
              name: "MHLW Government Standard",
              jp: "厚生労働省様式",
              desc: "The modern universal default for business and tech, with an optional gender field and a balanced split between personal data and self-promotion.",
            },
            {
              name: "JIS Traditional Layout",
              jp: "JIS規格様式",
              desc: "The conservative legacy template that devotes roughly 70% of the sheet to your chronological school and work timeline.",
            },
            {
              name: "Mid-Career / Changer",
              jp: "転職用様式",
              desc: "A marketing-oriented profile for experienced professionals switching companies, with resignation-reason and expanded skill-selling columns.",
            },
            {
              name: "New Graduate",
              jp: "新卒用様式",
              desc: "A potential-focused layout for university seniors — empty work grids are replaced with prompts for research, seminars, and clubs.",
            },
          ],
        },
        {
          title: "Work History Documents",
          jp: "職務経歴書 · Shokumukeirekisho",
          blurb: "The free-form companion sheet that sells your experience.",
          items: [
            {
              name: "Reverse-Chronological",
              jp: "逆編年体形式",
              desc: "Most recent role first — the engineering gold standard for showing recruiters your current tech stack and senior capabilities.",
            },
            {
              name: "Standard Chronological",
              jp: "編年体形式",
              desc: "Oldest role first, moving forward — best for legacy industries to visualise linear promotions and steady tenure.",
            },
            {
              name: "Functional / Career",
              jp: "キャリア形式",
              desc: "Grouped by skill pillars like Cloud Architecture or Frontend — ideal for freelancers or anyone managing employment gaps.",
            },
          ],
        },
        {
          title: "Part-Time & Flexible Work",
          jp: "パート・アルバイト・派遣",
          blurb: "Compact formats built for shift work and staffing pools.",
          items: [
            {
              name: "Part-Time & Arubaito",
              jp: "パート・アルバイト用",
              desc: "A compact single-page form that minimises deep career history and centres a large weekly shift-availability grid.",
            },
            {
              name: "Dispatch Agency Profile",
              jp: "派遣登録用",
              desc: "A logistics sheet for temporary staffing registration with an itemised checklist of software, certifications, and typing speed.",
            },
          ],
        },
        {
          title: "International Tech & Corporate",
          jp: "英文レジュメ · English CV",
          blurb: "English-first formats for global hiring inside Japan.",
          items: [
            {
              name: "Western CV / English Resume",
              jp: "英文履歴書",
              desc: "A single-page, metrics-driven English document with no photo, birth date, age, or gender — aligned to global anti-bias standards for international tech hubs and multinationals in Tokyo.",
            },
          ],
        },
      ],
    },
    howItWorks: {
      heading: "How it works",
      sub: "From a blank form to a print-ready Japanese resume in four steps — no Japanese keyboard or design skills needed.",
      steps: [
        {
          title: "1. Pick a template",
          desc: "Choose the JIS or MHLW rirekisho, a mid-career, new-grad, part-time, or English CV layout. Switch any time without losing your data.",
        },
        {
          title: "2. Fill it in any language",
          desc: "Use the step-by-step editor to enter your details in English, Nepali, or Japanese. A live preview updates as you type.",
        },
        {
          title: "3. Convert to natural Japanese",
          desc: "One click rewrites every field into polished business Japanese (keigo) that matches what Japanese employers expect.",
        },
        {
          title: "4. Download a print-ready PDF",
          desc: "Export an A3 or A4 PDF sized exactly to the standard form — ready to email or print. Free, no signup.",
        },
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      sub: "Everything about building a Japanese resume (履歴書) and work-history sheet (職務経歴書).",
      items: FAQ_EN,
    },
    cta: {
      heading: "Build your rirekisho in minutes",
      sub: "Free, no signup, no email. Open the editor, fill in what you have, download the PDF.",
      button: "Open the editor",
    },
  },
  jp: {
    nav: { editor: "エディター", getStarted: "始める" },
    hero: {
      badge: "英語・日本語・ネパール語 → きれいな日本語",
      titleLine1: "あなたの履歴書を、",
      titleLine2: "プロ品質で。",
      subtitle:
        "日本の企業が実際に求めるJIS規格の履歴書を作成。どの言語で入力しても、整った日本語のPDFが手に入ります。",
      ctaPrimary: "履歴書を作成する",
      ctaSecondary: "プレビューを見る",
      fineprint: "無料 · 登録不要 · データはブラウザ内に保存",
    },
    features: {
      heading: "日本での就職に必要なすべて",
      sub: "モダンなエディターから、伝統的な履歴書を生成。日本語の入力環境は必要ありません。",
      items: [
        {
          title: "本格的なJIS規格フォーマット",
          description:
            "標準的な履歴書テンプレートを忠実に再現。日本の人事が求める正確な表組みを、そのまま再現します。",
        },
        {
          title: "どの言語でも入力可能",
          description:
            "英語・ネパール語・日本語で入力。各項目は、ページに反映される前に自然なビジネス日本語へ書き換えられます。",
        },
        {
          title: "リアルタイムプレビュー",
          description:
            "入力に合わせて履歴書が更新。余白の調整、写真の差し替え、行の追加も、その場で反映されます。",
        },
        {
          title: "3つの出力形式",
          description:
            "高解像度PDF、XeLaTeXの.texソース、後で再読み込みできるJSONバックアップ。データはいつでも持ち出せます。",
        },
        {
          title: "アカウント不要・追跡なし",
          description:
            "すべてブラウザ内で完結。サーバーには何も保存されず、ページを閉じればデータは消えます。",
        },
        {
          title: "日本の就職市場に最適化",
          description:
            "ふりがな欄、写真貼付欄、配偶者・扶養家族・本人希望記入欄まで、採用担当者が求める位置に配置。",
        },
      ],
    },
    preview: {
      heading: "4つのテンプレート、同じデータ。",
      sub: "入力し直すことなく、いつでもレイアウトを切り替えられます。",
      use: (name) => `${name} を使う`,
      downloadBlank: "空欄テンプレートをダウンロード",
      templateDescriptions: {
        "jis-a3": "観音開きのA3横レイアウト。日本企業で最も一般的な形式です。",
        "jis-a4": "同じJIS項目をA4縦1枚にまとめた形式です。",
        "mhlw-a4":
          "2021年の厚生労働省推奨様式。性別・配偶者・通勤の欄がなく、現代的で包括的です。",
        "modern-a4": "IT・スタートアップ向けの、ミニマルな1カラムA4デザインです。",
      },
    },
    resumeTypes: {
      heading: "日本の履歴書フォーマットを、すべて一か所で",
      sub: "正社員、転職、新卒、アルバイト、グローバルなIT職まで。日本での応募に合わせた様式が揃っています。",
      categories: [
        {
          title: "正社員向け履歴書",
          jp: "履歴書 · Rirekisho",
          blurb: "どの企業にも通じる、定型の日本式履歴書。",
          items: [
            {
              name: "厚生労働省様式",
              jp: "MHLW Government Standard",
              desc: "一般企業・技術職向けの現代的な標準様式。性別欄は任意で、個人情報と自己PRをバランスよく配置します。",
            },
            {
              name: "JIS規格様式",
              jp: "JIS Traditional",
              desc: "保守的な従来様式。シートの約70%を学歴・職歴の年表に充てます。",
            },
            {
              name: "転職用様式",
              jp: "Mid-Career",
              desc: "経験者向けのアピール重視プロフィール。退職理由欄や、拡張されたスキルPR欄を備えます。",
            },
            {
              name: "新卒用様式",
              jp: "New Graduate",
              desc: "実務経験のない学生向け。空欄の職歴欄に代えて、研究・ゼミ・サークルの記入欄を用意します。",
            },
          ],
        },
        {
          title: "職務経歴書",
          jp: "職務経歴書 · Shokumukeirekisho",
          blurb: "経験を売り込む、自由記述の添付書類。",
          items: [
            {
              name: "逆編年体形式",
              jp: "Reverse-Chronological",
              desc: "直近の職務を最上部に。現在の技術スタックと役職レベルを即座に伝える、エンジニアの定番です。",
            },
            {
              name: "編年体形式",
              jp: "Chronological",
              desc: "古い職務から時系列で記載。昇進や勤続を見せたい伝統的な業界に最適です。",
            },
            {
              name: "キャリア形式",
              jp: "Functional",
              desc: "「クラウド設計」「フロントエンド」などスキル別に整理。フリーランスや空白期間がある方に向いています。",
            },
          ],
        },
        {
          title: "パート・アルバイト・派遣",
          jp: "パート・アルバイト・派遣",
          blurb: "シフト勤務や登録向けの、コンパクトな様式。",
          items: [
            {
              name: "パート・アルバイト用",
              jp: "Part-Time / Arubaito",
              desc: "1枚完結。詳細な経歴より、週間シフト希望の記入欄を中心に配置します。",
            },
            {
              name: "派遣登録用",
              jp: "Dispatch Registration",
              desc: "登録向けの実務シート。ソフト・資格・タイピング速度を項目化したチェックリスト形式です。",
            },
          ],
        },
        {
          title: "英文レジュメ",
          jp: "英文レジュメ · English CV",
          blurb: "外資・グローバル採用向けの英語フォーマット。",
          items: [
            {
              name: "英文履歴書",
              jp: "Western CV / English Resume",
              desc: "成果を数値で示す1枚の英語書類。写真・生年月日・年齢・性別を省き、国際基準に準拠。東京の外資・グローバルテック向けです。",
            },
          ],
        },
      ],
    },
    howItWorks: {
      heading: "使い方",
      sub: "空欄のフォームから、印刷できる日本式の履歴書まで4ステップ。日本語キーボードもデザインの知識も不要です。",
      steps: [
        {
          title: "1. テンプレートを選ぶ",
          desc: "JISまたは厚生労働省様式の履歴書、転職・新卒・アルバイト用、英文CVから選択。データを保ったまま、いつでも切り替えられます。",
        },
        {
          title: "2. どの言語でも入力",
          desc: "ステップ式エディターで、英語・ネパール語・日本語のいずれでも入力。入力に合わせてプレビューがリアルタイムで更新されます。",
        },
        {
          title: "3. 自然な日本語へ変換",
          desc: "ワンクリックで各項目を、日本企業が求める整ったビジネス日本語（敬語）に書き換えます。",
        },
        {
          title: "4. 印刷用PDFをダウンロード",
          desc: "標準様式に正確に合わせたA3またはA4のPDFを出力。メールや印刷にそのまま使えます。無料・登録不要。",
        },
      ],
    },
    faq: {
      heading: "よくある質問",
      sub: "日本式の履歴書・職務経歴書の作成に関するご質問にお答えします。",
      items: [
        {
          q: "ResumeJPは無料ですか？",
          a: "はい、完全無料です。登録もメールも不要。データはブラウザ内に保存され、印刷用PDFをすぐにダウンロードできます。",
        },
        {
          q: "履歴書と職務経歴書の違いは何ですか？",
          a: "履歴書は、写真・学歴・職歴を定型フォーマットでまとめた個人プロフィールです。職務経歴書は、担当業務・スキル・実績を自由記述で詳しく書く書類です。日本の中途採用では両方を提出するのが一般的で、ResumeJPはどちらにも対応しています。",
        },
        {
          q: "英語で履歴書を作成できますか？",
          a: "はい。英語・ネパール語・日本語で入力し、ワンクリックで各項目を自然なビジネス日本語に書き換えられます。外資・グローバルテック向けの英文履歴書（英文CV）フォーマットもあります。",
        },
        {
          q: "どのテンプレートを使えばいいですか？",
          a: "正社員には厚生労働省様式またはJIS履歴書、転職時は転職用、学生は新卒用、シフト勤務はパート・アルバイト用、外資には英文CVが適しています。入力し直さずにいつでも切り替えられます。",
        },
        {
          q: "履歴書に写真を追加できますか？",
          a: "はい。写真（最大5MB）をアップロードすると、右上の標準的な30×40mmの写真欄に合わせて自動でリサイズされます。",
        },
        {
          q: "どの形式で出力できますか？",
          a: "正しいA3・A4サイズの高解像度の印刷用PDFに加え、XeLaTeXの.texソースと再読み込み可能なJSONバックアップを出力できます。手書き用の空欄テンプレートもダウンロードできます。",
        },
        {
          q: "データのプライバシーは守られますか？",
          a: "はい。すべてブラウザ内で動作します。履歴書はご自身の端末のローカルストレージに保存され、サーバーには一切保存されません。タブを閉じればデータは消えます。",
        },
        {
          q: "アルバイトや派遣にも使えますか？",
          a: "はい。週間シフト希望やスキルのチェックリストを重視した、コンパクトなパート・アルバイト用および派遣登録用のレイアウトを用意しています。",
        },
      ],
    },
    cta: {
      heading: "数分で履歴書が完成",
      sub: "無料・登録不要・メール不要。エディターを開いて、手元の情報を入力し、PDFをダウンロード。",
      button: "エディターを開く",
    },
  },
};

const STORAGE_KEY = "rirekisho-lang-v1";

export function loadLang(): Lang {
  if (typeof window === "undefined") return "en";
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "jp" ? "jp" : "en";
}

export function saveLang(lang: Lang): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

export function useLang(): [Lang, (l: Lang) => void, boolean] {
  const [lang, setLang] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setLang(loadLang());
    setHydrated(true);
  }, []);
  function update(l: Lang) {
    setLang(l);
    saveLang(l);
  }
  return [lang, update, hydrated];
}

/* ============================================================
   Editor i18n
   ============================================================ */

export interface EditorCopy {
  header: {
    home: string;
    autosaved: string;
    loadSample: string;
    clear: string;
    import: string;
    translate: string;
  };
  nav: { back: string; next: string; review: string; stepOf: (i: number, n: number) => string };
  template: { title: string; description: string };
  personal: {
    section: string;
    sectionDesc: string;
    fullName: string;
    furigana: string;
    dob: string;
    gender: string;
    male: string;
    female: string;
    select: string;
    nationality: string;
    photo: string;
    photoHint: string;
    uploadPhoto: string;
    remove: string;
    addressSection: string;
    postalCode: string;
    address: string;
    phone: string;
    email: string;
    contactSection: string;
    contactDesc: string;
    sameAsAbove: string;
  };
  education: { title: string; description: string; add: string; empty: string };
  work: { title: string; description: string; add: string };
  licenses: { title: string; description: string; add: string };
  extras: {
    selfPrSection: string;
    selfPrDesc: string;
    selfPrLabel: string;
    commuteSection: string;
    commuteTime: string;
    dependents: string;
    spouse: string;
    spouseSupport: string;
    yes: string;
    no: string;
    select: string;
    prefSection: string;
    prefDesc: string;
    prefLabel: string;
  };
  preview: {
    title: string;
    back: string;
    edit: string;
    downloadTemplate: string;
    downloadTemplateTitle: string;
    downloadPdf: string;
    backToEditing: string;
    downloadedOk: string;
    downloadAgain: string;
    returnHome: string;
    typography: string;
    font: string;
    boldness: string;
    weightLight: string;
    weightMedium: string;
    weightBold: string;
  };
  toasts: {
    imported: string;
    invalidJson: string;
    translated: string;
    translateFailed: string;
    sampleLoaded: string;
    pdfDownloaded: string;
    pdfFailed: string;
    templateDownloaded: string;
    templateFailed: string;
    sheetNotFound: string;
    photoNotImage: string;
    photoTooLarge: string;
    photoReadFailed: string;
    cleared: string;
    clearConfirm: string;
  };
}

export const EDITOR_COPY: Record<Lang, EditorCopy> = {
  en: {
    header: {
      home: "Home",
      autosaved: "Autosaved",
      loadSample: "Load sample",
      clear: "Clear",
      import: "Import",
      translate: "Translate",
    },
    nav: {
      back: "Back",
      next: "Next",
      review: "Review",
      stepOf: (i, n) => `Step ${i} of ${n}`,
    },
    template: {
      title: "Choose a template",
      description:
        "Pick the layout you want. You can change this at any time from the Template step — your form data is preserved.",
    },
    personal: {
      section: "Personal information",
      sectionDesc:
        "Top block of the rirekisho. You can write in any language — the Translate button will convert everything to Japanese for the final PDF.",
      fullName: "Full name (氏名)",
      furigana: "Furigana (ふりがな)",
      dob: "Date of birth (生年月日)",
      gender: "Gender (性別)",
      male: "男 / Male",
      female: "女 / Female",
      select: "Select",
      nationality: "Nationality (国籍)",
      photo: "Photo (写真)",
      photoHint: "JPEG/PNG · max 5 MB · auto-resized to fit the photo cell",
      uploadPhoto: "Upload photo",
      remove: "Remove",
      addressSection: "Current address (現住所)",
      postalCode: "Postal code (〒)",
      address: "Address",
      phone: "Phone (電話)",
      email: "Email (メールアドレス)",
      contactSection: "Alternate contact (連絡先)",
      contactDesc:
        "Only fill this if you want post/calls sent somewhere other than your current address.",
      sameAsAbove: "Same as current address (renders 同上)",
    },
    education: {
      title: "Education · 学歴",
      description:
        "Add one row per milestone. Enter dates and a single line of free text. Order matches the rendered table (oldest at top).",
      add: "Add education row",
      empty: "No education yet — add your first school.",
    },
    work: {
      title: "Work history · 職歴",
      description:
        "Each row is one line in the 職歴 table. Use entries like '株式会社○○ 入社' and '一身上の都合により退社'. End with '現在に至る'.",
      add: "Add work row",
    },
    licenses: {
      title: "Licenses & qualifications · 免許・資格",
      description: "JLPT, driving licence, certifications, etc.",
      add: "Add license",
    },
    extras: {
      selfPrSection: "Self PR · 特技・自己PR",
      selfPrDesc:
        "Strengths, motivation, why you want to join. 3–4 sentences in business Japanese.",
      selfPrLabel: "特技、自己PRなど",
      commuteSection: "Commute & family",
      commuteTime: "Commute time (通勤時間)",
      dependents: "Dependents excl. spouse (扶養家族)",
      spouse: "Spouse (配偶者)",
      spouseSupport: "Spouse support obligation (配偶者の扶養義務)",
      yes: "有 / Yes",
      no: "無 / No",
      select: "Select",
      prefSection: "Personal preference · 本人希望記入欄",
      prefDesc: "Salary, location, hours, etc. Many candidates simply write 「貴社の規定に従います。」",
      prefLabel: "本人希望記入欄",
    },
    preview: {
      title: "Review your resume",
      back: "Back",
      edit: "Edit",
      downloadTemplate: "Download template",
      downloadTemplateTitle: "Download a blank copy of this form (no data filled in)",
      downloadPdf: "Download PDF",
      backToEditing: "Back to editing",
      downloadedOk: "PDF downloaded successfully",
      downloadAgain: "Download again",
      returnHome: "Return to Home",
      typography: "Typography",
      font: "Font",
      boldness: "Boldness",
      weightLight: "Light",
      weightMedium: "Medium",
      weightBold: "Bold",
    },
    toasts: {
      imported: "Imported",
      invalidJson: "Invalid JSON file",
      translated: "Translated to Japanese",
      translateFailed: "Translation failed — check ANTHROPIC_API_KEY",
      sampleLoaded: "Sample data loaded",
      pdfDownloaded: "PDF downloaded",
      pdfFailed: "Failed to generate PDF",
      templateDownloaded: "Blank template downloaded",
      templateFailed: "Failed to generate template",
      cleared: "Form cleared",
      clearConfirm: "Clear all entered data? This cannot be undone.",
      sheetNotFound: "Sheet element not found — open the Preview step first.",
      photoNotImage: "Please choose an image file (JPEG or PNG).",
      photoTooLarge: "Photo is too large — please use an image under 5 MB.",
      photoReadFailed: "Could not read that image — try a different file.",
    },
  },
  jp: {
    header: {
      home: "ホーム",
      autosaved: "自動保存",
      loadSample: "サンプルを読み込む",
      clear: "クリア",
      import: "インポート",
      translate: "翻訳",
    },
    nav: {
      back: "戻る",
      next: "次へ",
      review: "確認",
      stepOf: (i, n) => `ステップ ${i} / ${n}`,
    },
    template: {
      title: "テンプレートを選択",
      description:
        "希望のレイアウトを選んでください。テンプレートのステップからいつでも変更でき、入力済みのデータは保持されます。",
    },
    personal: {
      section: "基本情報",
      sectionDesc:
        "履歴書の上部です。どの言語でも入力できます。「翻訳」ボタンで、最終PDF用にすべて日本語へ変換されます。",
      fullName: "氏名",
      furigana: "ふりがな",
      dob: "生年月日",
      gender: "性別",
      male: "男性",
      female: "女性",
      select: "選択",
      nationality: "国籍",
      photo: "写真",
      photoHint: "JPEG/PNG · 最大5MB · 写真欄に合わせて自動リサイズ",
      uploadPhoto: "写真をアップロード",
      remove: "削除",
      addressSection: "現住所",
      postalCode: "郵便番号（〒）",
      address: "住所",
      phone: "電話",
      email: "メールアドレス",
      contactSection: "連絡先",
      contactDesc: "現住所以外に郵便・連絡を希望する場合のみ入力してください。",
      sameAsAbove: "現住所と同じ（「同上」と表示）",
    },
    education: {
      title: "学歴",
      description:
        "節目ごとに1行ずつ追加します。年月と1行の自由記述を入力してください。並び順は表示される表と同じです（古い順に上から）。",
      add: "学歴を追加",
      empty: "学歴がまだありません。最初の学校を追加してください。",
    },
    work: {
      title: "職歴",
      description:
        "各行が職歴表の1行になります。「株式会社○○ 入社」「一身上の都合により退社」などを使い、最後は「現在に至る」で締めます。",
      add: "職歴を追加",
    },
    licenses: {
      title: "免許・資格",
      description: "日本語能力試験、運転免許、各種資格など。",
      add: "資格を追加",
    },
    extras: {
      selfPrSection: "特技・自己PR",
      selfPrDesc: "強み、志望動機、入社したい理由など。ビジネス日本語で3〜4文程度。",
      selfPrLabel: "特技、自己PRなど",
      commuteSection: "通勤・家族",
      commuteTime: "通勤時間",
      dependents: "扶養家族（配偶者を除く）",
      spouse: "配偶者",
      spouseSupport: "配偶者の扶養義務",
      yes: "有",
      no: "無",
      select: "選択",
      prefSection: "本人希望記入欄",
      prefDesc: "給料・勤務地・勤務時間など。「貴社の規定に従います。」と書く方も多くいます。",
      prefLabel: "本人希望記入欄",
    },
    preview: {
      title: "履歴書を確認",
      back: "戻る",
      edit: "編集",
      downloadTemplate: "テンプレートをダウンロード",
      downloadTemplateTitle: "この様式の空欄コピーをダウンロード（データなし）",
      downloadPdf: "PDFをダウンロード",
      backToEditing: "編集に戻る",
      downloadedOk: "PDFをダウンロードしました",
      downloadAgain: "もう一度ダウンロード",
      returnHome: "ホームに戻る",
      typography: "書体",
      font: "フォント",
      boldness: "太さ",
      weightLight: "細字",
      weightMedium: "標準",
      weightBold: "太字",
    },
    toasts: {
      imported: "インポートしました",
      invalidJson: "JSONファイルが正しくありません",
      translated: "日本語に翻訳しました",
      translateFailed: "翻訳に失敗しました — ANTHROPIC_API_KEY を確認してください",
      sampleLoaded: "サンプルデータを読み込みました",
      pdfDownloaded: "PDFをダウンロードしました",
      pdfFailed: "PDFの生成に失敗しました",
      templateDownloaded: "空欄テンプレートをダウンロードしました",
      templateFailed: "テンプレートの生成に失敗しました",
      cleared: "フォームをクリアしました",
      clearConfirm: "入力したデータをすべて消去しますか？元に戻せません。",
      sheetNotFound: "シートが見つかりません — 先にプレビュー画面を開いてください。",
      photoNotImage: "画像ファイル（JPEG／PNG）を選択してください。",
      photoTooLarge: "写真が大きすぎます — 5MB未満の画像を使用してください。",
      photoReadFailed: "画像を読み込めませんでした — 別のファイルをお試しください。",
    },
  },
};

/** Context so editor sub-components read the active language + copy. */
interface EditorI18n {
  lang: Lang;
  copy: EditorCopy;
}

const EditorI18nContext = createContext<EditorI18n>({
  lang: "en",
  copy: EDITOR_COPY.en,
});

export const EditorI18nProvider = EditorI18nContext.Provider;

export function useEditorI18n(): EditorI18n {
  return useContext(EditorI18nContext);
}
