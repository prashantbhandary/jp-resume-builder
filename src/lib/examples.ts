/**
 * Example library for the 自己PR and full-time 志望動機 fields, by situation and
 * profession. Pairs natural business Japanese with an English gloss so foreign
 * applicants understand what they are submitting — the angle competitors
 * (Yagish, Indeed, Townwork, MyNavi) do not cover. Part-time 志望動機 examples
 * live in src/lib/shibodoki.ts and on the /arubaito-resume page.
 */
export interface Example {
  label: string;
  jp: string;
  en: string;
}

/** 自己PR by applicant situation. */
export const JIKO_PR_SITUATION: Example[] = [
  {
    label: "新卒 (New graduate)",
    jp: "私の強みは、目標に向かって粘り強く努力できる点です。大学ではゼミの研究発表に向けて半年間データ分析に取り組み、学内のコンテストで入賞しました。この継続力を活かし、貴社でも一つひとつの業務に誠実に取り組み、成長してまいりたいと考えております。",
    en: "My strength is persevering toward a goal. For my seminar I spent six months on data analysis and won a prize in an internal contest. I want to use that persistence to work sincerely at each task and grow at your company.",
  },
  {
    label: "転職 (Career change)",
    jp: "前職では法人営業として三年間、新規顧客の開拓を担当し、二年連続で売上目標を達成しました。お客様の課題を丁寧にうかがい、最適な提案を行う力には自信があります。これまでの経験を活かし、貴社の事業拡大に貢献したいと考えております。",
    en: "In my previous role I handled new-client sales for three years and hit my targets two years running. I am confident in listening to client needs and proposing the right solution, and I want to use this experience to help grow your business.",
  },
  {
    label: "ブランクあり (Returning to work)",
    jp: "育児のため一時的に仕事を離れておりましたが、その間も家計管理や地域活動を通じて段取り力と責任感を磨いてまいりました。復帰後は時間を大切にし、限られた時間で成果を出すことを心がけ、貴社に貢献したいと考えております。",
    en: "I stepped away from work for childcare, but kept sharpening my planning and sense of responsibility through household management and community activities. Returning now, I value time and aim to deliver results efficiently for your company.",
  },
];

/** 自己PR by profession / job family. */
export const JIKO_PR_PROFESSION: Example[] = [
  {
    label: "営業 (Sales)",
    jp: "私の強みは、相手の立場に立って信頼関係を築く力です。前職では担当エリアの顧客を毎月訪問し、要望を先回りして提案することでリピート率を高めました。貴社でも、お客様に長く選ばれる関係づくりに貢献したいと考えております。",
    en: "My strength is building trust by seeing things from the other person's side. I visited my clients monthly and anticipated their needs, raising the repeat rate. I want to build the kind of lasting relationships that keep customers choosing your company.",
  },
  {
    label: "事務 (Office / admin)",
    jp: "私の強みは、正確さと段取りの良さです。前職では請求書処理やデータ入力を担当し、ミスを防ぐためのチェック手順を自ら整え、月次業務を期日通りに完了させてきました。丁寧で正確な事務処理で、貴社のチームを支えたいと考えております。",
    en: "My strengths are accuracy and good planning. I handled invoicing and data entry, set up my own checking routine to prevent mistakes, and completed monthly work on schedule. I want to support your team with careful, accurate administration.",
  },
  {
    label: "IT・エンジニア (IT / engineer)",
    jp: "私の強みは、課題を分解して着実に解決する力です。前職ではWebアプリの保守を担当し、頻発していた不具合の原因を一つずつ特定して再発を防ぎ、問い合わせ件数を約30%削減しました。論理的に考え、学び続ける姿勢で貴社に貢献したいと考えております。",
    en: "My strength is breaking problems down and solving them steadily. Maintaining a web app, I identified the causes of frequent bugs one by one and cut inquiries by about 30%. I want to contribute with logical thinking and continuous learning.",
  },
  {
    label: "接客・販売 (Service / retail)",
    jp: "私の強みは、お客様一人ひとりに合わせた丁寧な接客です。前職のアパレル販売では、会話からニーズをくみ取った提案を心がけ、お客様アンケートで高い評価をいただきました。明るい対応と心配りで、貴店の売上と雰囲気づくりに貢献したいと考えております。",
    en: "My strength is attentive service tailored to each customer. In apparel retail I drew out needs through conversation and earned high marks in customer surveys. I want to contribute to your store's sales and atmosphere with a bright, considerate manner.",
  },
  {
    label: "介護 (Care / nursing)",
    jp: "私の強みは、相手の気持ちに寄り添い、根気強く支える姿勢です。前職では利用者一人ひとりの生活リズムを把握し、安心して過ごしていただけるよう声かけを大切にしました。チームと連携しながら、利用者に信頼される介護を提供したいと考えております。",
    en: "My strength is patiently supporting people with empathy. I learned each resident's daily rhythm and valued reassuring communication. Working closely with the team, I want to provide care that residents can trust.",
  },
];

/** Full-time 志望動機 by situation. */
export const SHIBO_FULLTIME: Example[] = [
  {
    label: "新卒 (New graduate)",
    jp: "学生時代に学んだ◯◯を、人々の生活に役立つ形で活かしたいと考え、貴社を志望いたしました。中でも貴社の◯◯への取り組みに強く共感しております。一日も早く戦力となれるよう努力し、長く貢献してまいりたいと考えております。",
    en: "I want to apply what I studied in a way that helps people's lives, which is why I am applying to your company — I strongly relate to your work on ___. I will work to become an asset quickly and contribute for the long term.",
  },
  {
    label: "転職 (Career change)",
    jp: "前職で培った◯◯の経験を、より◯◯に力を入れている貴社で活かしたいと考え志望いたしました。貴社の◯◯という方針に共感し、これまでの経験を通じて事業に貢献できると考えております。",
    en: "I want to apply the ___ experience I built in my previous job at your company, which focuses more on ___. I relate to your ___ approach and believe my experience can contribute to the business.",
  },
  {
    label: "未経験 (No experience in the field)",
    jp: "未経験の分野ではありますが、これまで培った◯◯の力は貴社の業務にも活かせると考えております。新しい知識を積極的に学び、一日も早く貢献できるよう努力する所存です。挑戦する姿勢を大切に取り組んでまいります。",
    en: "Although this field is new to me, I believe the ___ skills I have built can apply to your work. I will actively learn and work hard to contribute as soon as possible, valuing a willingness to take on challenges.",
  },
];
