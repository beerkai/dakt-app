import type { MessageThread } from "@/lib/case-types";

export const messageThreads104: MessageThread[] = [
  {
    id: "104-mt-emails",
    caseId: "104",
    platform: "email",
    title: "E-posta Yazışması — Vedat Somer & Zürih Hukuk",
    participants: [{ name: "Av. Keller" }, { name: "Vedat Somer" }],
    meta: {
      deviceInfo: "104-N · İsviçre Bankası Transfer Yazışmaları",
      forensicNote:
        "<strong>Çıkarsama:</strong> Kurbanın asıl amacı şirketin son hasat kârını tamamen yurtdışına çıkarmak ve şirketi iflasa sürüklemektir. Aylin'in bu durumdan haberdar olması en güçlü motiftir.",
    },
    footerSignature: {
      role: "Mali Suçlar İnceleme",
      name: "T. Yılmaz",
    },
    messages: [
      {
        id: "104-em-1",
        sender: "Vedat Somer",
        text: `Sayın Keller,

Son hasat ödemelerinin tamamı bu cuma günü şirketin hesabına geçecek. Pazartesi sabahı açılışla birlikte bahsettiğimiz UBS hesabına tam aktarımı yapın. Şirketin buradaki borçlarıyla ben ilgilenmiyorum, banka haczi başlatabilir. Ben haftaya Lozan'da olacağım.

Kız kardeşime hiçbir şekilde bilgi verilmeyecek.

— Vedat Somer`,
        time: "14:22",
        date: "18 Eylül 2024",
        emailFrom: "vedat@somerbaglari.com",
        emailTo: "hkeller@zurich-law.ch",
        emailSubject: "Pazartesi Transferi Hakkında (Gizli)",
      },
      {
        id: "104-em-2",
        sender: "Av. Keller",
        text: `Sayın Somer,

Talimatınız alınmıştır. İşlemler Pazartesi sabah 09:00 itibarıyla başlatılacaktır. Şirket ortaklık yapısı gereği itiraz süreci olabilir ancak para İsviçre'ye geçtiğinde geri dönüşü zor olacaktır.

Lozan'daki ofisimizde görüşmek üzere.

— Heinrich Keller`,
        time: "09:14",
        date: "19 Eylül 2024",
        emailFrom: "hkeller@zurich-law.ch",
        emailTo: "vedat@somerbaglari.com",
        emailSubject: "Re: Pazartesi Transferi Hakkında (Gizli)",
      },
      {
        id: "104-em-3",
        sender: "Vedat Somer",
        text: `Harika. Aylin zaten her zamanki gibi hiçbir şeyi kontrol etmiyor. Toprakla uğraşsın dursun. Pazartesi görüşürüz.`,
        time: "10:05",
        date: "19 Eylül 2024",
        emailFrom: "vedat@somerbaglari.com",
        emailTo: "hkeller@zurich-law.ch",
        emailSubject: "Re: Pazartesi Transferi Hakkında (Gizli)",
      },
    ],
  },
];
