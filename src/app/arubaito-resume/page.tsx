import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialShell, Eyebrow, StampLink } from "@/components/editorial/EditorialShell";
import { SHIDO_CATEGORIES } from "@/lib/shibodoki";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/arubaito-resume`;

export const metadata: Metadata = {
  title: "Part-Time (Arubaito) Resume Maker — Free 履歴書 for バイト",
  description:
    "Make a Japanese part-time (アルバイト) resume free. Residence-status fields, a weekly shift-availability grid, a Japanese-level field, and ready-to-use 志望動機 examples by job type — fill in any language and download a print-ready PDF.",
  keywords: [
    "arubaito resume template",
    "part time job resume Japan",
    "バイト 履歴書 書き方",
    "コンビニ バイト 履歴書",
    "アルバイト 履歴書 志望動機 例文",
    "外国人 アルバイト 履歴書",
    "履歴書 見本 バイト",
    "part time rirekisho",
  ],
  alternates: { canonical: "/arubaito-resume" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Part-Time (Arubaito) Resume Maker — Free 履歴書 for バイト",
    description:
      "Free part-time rirekisho with shift grid, residence-status fields, and 志望動機 examples. Fill in any language, download a print-ready PDF.",
  },
};

const PAGE_FAQ: { q: string; a: string }[] = [
  {
    q: "Is the part-time (arubaito) resume really free?",
    a: "Yes — completely free with no account, no email, and no watermark. Fill it in online in any language and download a print-ready PDF instantly.",
  },
  {
    q: "What should a foreigner include on a part-time rirekisho?",
    a: "The four things arubaito employers look at first are your residence status and work permission (e.g. 留学 with 資格外活動許可, within 28 hours/week), your weekly shift availability, your Japanese level (JLPT or conversational), and a short 志望動機. ResumeJP's part-time template puts all four near the top.",
  },
  {
    q: "Do I need a 志望動機 for a part-time job?",
    a: "Yes, a short one — usually two or three sentences. It is the field most applicants get stuck on. This page has ready-to-edit examples by job type (convenience store, restaurant, cafe, factory, retail and more) that you can adapt in a minute.",
  },
  {
    q: "How many hours can I work on a student visa?",
    a: "With a 資格外活動許可, student-visa holders may work up to 28 hours per week (up to 40 hours per week during the school's official long vacations). State this clearly on your resume so employers know you are allowed to work.",
  },
  {
    q: "Can I print the resume at a convenience store?",
    a: "Yes. Download the PDF, upload it to 7-Eleven netprint or ネットワークプリント (FamilyMart/Lawson), get a reservation number, and print at the in-store machine for about ¥20 per A4 page.",
  },
];

const FOUR_THINGS: { jp: string; title: string; body: ReactNode }[] = [
  {
    jp: "在留資格",
    title: "Residence status & work permission",
    body: (
      <>
        Foreign applicants must show they are allowed to work. If you are a student (留学) or
        dependent (家族滞在) with a 資格外活動許可, state it with the 28-hour note — see{" "}
        <InlineLink href="/blog/28-hour-rule-students-work-limit">the 28-hour rule explained</InlineLink>.
      </>
    ),
  },
  {
    jp: "シフト",
    title: "Weekly shift availability",
    body: <>Which days and times can you work? For hourly work, a clear shift grid matters more than your education.</>,
  },
  {
    jp: "日本語",
    title: "Japanese level",
    body: <>JLPT level if you have it, or conversational ability (日常会話レベル) — saying so is far better than leaving it blank.</>,
  },
  {
    jp: "志望動機",
    title: "Motivation",
    body: <>Two or three honest sentences on why this store. Use an example below to get unstuck.</>,
  },
];

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[var(--ink)] underline decoration-[var(--seal)] decoration-[1.5px] underline-offset-[3px] hover:text-[var(--seal)]"
    >
      {children}
    </Link>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16">
      <Eyebrow>{label}</Eyebrow>
      <h2 className="mt-3 font-display text-2xl sm:text-[2rem] font-medium leading-tight tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const PARA = "text-[0.95rem] sm:text-[1.03rem] leading-[1.8] text-[var(--ink-soft)]";

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Part-Time (Arubaito) Resume", item: PAGE_URL },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "ResumeJP — Part-Time (Arubaito) Resume Maker",
        url: PAGE_URL,
        image: `${PAGE_URL}/opengraph-image`,
        screenshot: `${PAGE_URL}/opengraph-image`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Residence status (在留資格) fields",
          "Weekly shift-availability grid",
          "Japanese-level (JLPT) field",
          "志望動機 examples by job type",
          "Print-ready PDF download",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: PAGE_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function ArubaitoResumePage() {
  return (
    <EditorialShell>
      <JsonLd />

      <header>
        <Eyebrow>アルバイト · Part-time rirekisho</Eyebrow>
        <h1 className="mt-4 font-display text-[2.1rem] sm:text-[3rem] font-medium leading-[1.06] tracking-tight text-[var(--ink)]">
          A part-time resume
          <br />
          that fits how
          <span className="text-[var(--seal)]"> baito</span> hiring works
        </h1>
        <p className="mt-6 max-w-xl text-[0.97rem] sm:text-[1.08rem] leading-[1.75] text-[var(--ink-soft)]">
          A part-time rirekisho (履歴書) is not a shorter full-time one — employers look at
          completely different things. For an arubaito, a store manager checks your work
          permission, your shift availability, your Japanese level, and a short 志望動機.
          ResumeJP&apos;s template is built around exactly those. Fill it in any language and
          download a print-ready PDF — free, no account.
        </p>
        <div className="mt-7">
          <StampLink href="/editor">Start a part-time resume</StampLink>
        </div>
      </header>

      <Section label="優先順位 · Read first" title="What arubaito employers check first">
        <ol className="border-t border-[var(--rule)]">
          {FOUR_THINGS.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[var(--rule)] py-5 sm:grid-cols-[3.5rem_1fr]"
            >
              <span className="font-mono text-lg text-[var(--seal)] sm:text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg text-[var(--ink)]">
                  {item.title}{" "}
                  <span className="font-jpserif text-[0.8em] text-[var(--ink-soft)]">
                    {item.jp}
                  </span>
                </h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="志望動機 · 例文" title="Motivation statements by job type">
        <p className={PARA}>
          The 志望動機 is where most part-time applicants freeze. Below are ready-to-edit examples in
          natural business Japanese, with English so you know what you are writing. Pick the closest
          one, then change the store name, your availability, and one specific reason for choosing
          this place.
        </p>

        <div className="mt-7 space-y-8">
          {SHIDO_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-baseline gap-2 border-b border-[var(--rule)] pb-2">
                <span className="font-display text-base text-[var(--ink)]">{cat.label}</span>
                <span className="font-jpserif text-sm text-[var(--ink-soft)]">{cat.jp}</span>
              </div>
              <div className="mt-3 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
                {cat.samples.map((s, i) => (
                  <div key={i} className="bg-[var(--cell)] p-4 sm:p-5">
                    <span className="eyebrow inline-flex items-center gap-2 text-[var(--ink-soft)]">
                      <span aria-hidden className="text-[var(--seal)]">
                        ○
                      </span>
                      {s.angle === "near" ? "Near home / school" : "To improve Japanese"}
                    </span>
                    <p className="mt-3 font-jpserif text-[0.95rem] leading-[1.85] text-[var(--ink)]">
                      {s.jp}
                    </p>
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--ink-soft)]">
                      {s.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="記入 · The rest of the sheet" title="Writing everything else">
        <p className={PARA}>
          Beyond these four, fill in your name with ふりがな, address, education, and any licences
          the same way as a standard resume. Part-time work usually omits a long job history — keep
          it brief. For the request field, the safe line is 「貴社の規定に従います。」 unless you
          have a real schedule limit; see{" "}
          <InlineLink href="/blog/honnin-kibo-kinyuran-part-time">
            how to fill in the 本人希望記入欄
          </InlineLink>
          . For everything else, the{" "}
          <InlineLink href="/guide/how-to-write-a-japanese-resume">full rirekisho guide</InlineLink>{" "}
          walks through each section in order.
        </p>
        <p className={`${PARA} mt-4`}>
          A smartphone photo is fine if you follow the{" "}
          <InlineLink href="/blog/rirekisho-photo-rules">rirekisho photo rules</InlineLink> (30×40
          mm, plain light background, business attire). No printer? Export the PDF and print it at a
          convenience store for about ¥20. When you are ready to hand it over, our{" "}
          <InlineLink href="/blog/phone-script-after-applying-baito">
            phone script for calling the store
          </InlineLink>{" "}
          covers the next step.
        </p>
      </Section>

      <Section label="Q&A · よくある質問" title="Frequently asked questions">
        <dl className="border-t border-[var(--rule)]">
          {PAGE_FAQ.map((f) => (
            <div key={f.q} className="border-b border-[var(--rule)] py-5">
              <dt className="font-display text-[1.05rem] leading-snug text-[var(--ink)]">{f.q}</dt>
              <dd className="mt-2 text-[0.92rem] leading-[1.7] text-[var(--ink-soft)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <div className="mt-12 flex flex-col items-start gap-4 border border-[var(--ink)] bg-[var(--cell)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-display text-xl text-[var(--ink)]">Ready to fill it in?</p>
          <p className="mt-1 text-[0.9rem] text-[var(--ink-soft)]">
            Free · no account · print-ready PDF.
          </p>
        </div>
        <StampLink href="/editor">Open the editor</StampLink>
      </div>
    </EditorialShell>
  );
}
