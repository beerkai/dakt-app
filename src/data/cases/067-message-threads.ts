import type { MessageThread } from "@/lib/case-types";

export const messageThreads067: MessageThread[] = [
  {
    id: "067-mt-emails",
    caseId: "067",
    platform: "email",
    title: "E-posta Yazışması — Ferhat & Kerem",
    participants: [{ name: "Ferhat Yıldırım" }, { name: "Kerem Avcıoğlu" }],
    meta: {
      deviceInfo: "067-K · İç Posta Sunucu Kayıtları",
      forensicNote:
        "<strong>Çıkarsama:</strong> Ferhat'ın motifi belgesellenmiş. Madde 18 sözlü tehdit. Ancak bu motif fırsat değildir.",
    },
    footerSignature: {
      role: "İT Adli Birim",
      name: "M. Sezer",
    },
    messages: [
      {
        id: "067-em-1",
        sender: "Ferhat Yıldırım",
        text: `Kerem,

Dördüncü kez yazıyorum. Bu konu daha fazla ertelenemez. İstiyorum ki:

1) B hesabı için ortak imza yetkisi verilsin
2) Mart sonu kâr payı yeniden hesaplansın
3) Madde 18 yeniden müzakereye açılsın

Avukatımı devreye sokabilirim.

— Ferhat`,
        time: "11:47",
        date: "28 Şubat 2024",
        emailFrom: "ferhat@avcioglumuzayede.com",
        emailTo: "kerem@avcioglumuzayede.com",
        emailSubject: "Hesap Yetkilendirmesi — SON CEVAP BEKLİYORUM",
      },
      {
        id: "067-em-2",
        sender: "Kerem Avcıoğlu",
        text: `Ferhat,

Tartışmayı kapatıyorum. Ortaklık yapısı değişmeyecek. Madde 18 zaten lehine — ben ölünce her şey senin. Bunu sevmiyor musun?

Avukatın ne istersen yapsın.

— K.`,
        time: "09:12",
        date: "1 Mart 2024",
        emailFrom: "kerem@avcioglumuzayede.com",
        emailTo: "ferhat@avcioglumuzayede.com",
        emailSubject: "Re: Hesap Yetkilendirmesi",
      },
      {
        id: "067-em-3",
        sender: "Ferhat Yıldırım",
        text: `Yarın sabah konuşalım. Geç kalma.`,
        time: "23:51",
        date: "13 Mart 2024",
        emailFrom: "ferhat@avcioglumuzayede.com",
        emailTo: "kerem@avcioglumuzayede.com",
        emailSubject: "Yarın",
      },
    ],
  },
];
