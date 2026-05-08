import type { MessageThread } from "@/lib/case-types";

/** dakt-vaka-131.html — 053-M Twitch chat + 053-P e-posta (numara 053) */
export const messageThreads053: MessageThread[] = [
  {
    id: "053-M",
    caseId: "053",
    platform: "twitch",
    title: "Twitch Chat Logu — Son Yayın (son 30 dk)",
    participants: [
      { name: "zeynepcasts", isUser: true, isVictim: true },
      { name: "ModMelis" },
      { name: "TheRealOnur" },
      { name: "xShadow_99" },
      { name: "gamerboi44" },
      { name: "YASAKLI_KLN_847", isPerpetrator: false },
    ],
    meta: {
      deviceInfo: "053-M · Dijital Adli — Twitch Chat",
      forensicNote:
        "<strong>Çıkarsama:</strong> \"YASAKLI_KLN_847\" hesabı → IP analizi: <strong>Kaan Tekin'in ev IP'si</strong> ile eşleşiyor. \"KAPINI AÇ\" mesajı yayın sırasında — Kaan o sırada kapının önünde miydi? Kaan'ın Bağcılar'daki GSM sinyali olay saatinde doğrulanmalı.",
    },
    footerSignature: {
      role: "Dijital Adli",
      name: "B. Yıldız",
    },
    messages: [
      {
        id: "053-m-1",
        sender: "ModMelis",
        text: "zeynep bugün harika görünüyorsun 💜",
        time: "00:55",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-2",
        sender: "TheRealOnur",
        text: "her zaman harika görünüyor ❤️ 500 bit donation",
        time: "00:55",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-3",
        sender: "xShadow_99",
        text: "@zeynepcasts kedini göster",
        time: "00:56",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-4",
        sender: "gamerboi44",
        text: "yayın ne kadar sürecek",
        time: "00:57",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-5",
        sender: "TheRealOnur",
        text: "umarım sabaha kadar 😍",
        time: "00:58",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-6",
        sender: "ModMelis",
        text: "@TheRealOnur sakin ol biraz 😅",
        time: "00:58",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-7",
        sender: "YASAKLI_KLN_847",
        text: "zeynep seni izliyorum. her gece. pencerenin ışığı 🪟",
        time: "00:59",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-8",
        sender: "ModMelis",
        type: "system",
        text: "",
        systemText: "[MESAJ SİLİNDİ — MOD AKSİYONU: ModMelis]",
        time: "00:59",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-9",
        sender: "YASAKLI_KLN_847",
        text: "silsen de görüyorum. KAPINI AÇ.",
        time: "01:00",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-10",
        sender: "ModMelis",
        type: "system",
        text: "",
        systemText: "[KULLANICI YASAKLANDI]",
        time: "01:00",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-11",
        sender: "ModMelis",
        text: "@zeynepcasts bir troll daha hallettim 🛡️",
        time: "01:00",
        date: "3 Kasım 2024",
      },
      {
        id: "053-m-12",
        sender: "zeynepcasts",
        text: "teşekkürler melis ❤️ alışıyorum artık",
        time: "01:06",
        date: "3 Kasım 2024",
        status: "read",
      },
      {
        id: "053-m-13",
        sender: "zeynepcasts",
        text: "bir saniye arkadaşlar",
        time: "01:06",
        date: "3 Kasım 2024",
        status: "read",
      },
      {
        id: "053-m-14",
        sender: "ModMelis",
        type: "system",
        text: "",
        systemText: "[01:07:04 — STREAM OFFLINE]",
        time: "01:07",
        date: "3 Kasım 2024",
      },
    ],
  },
  {
    id: "053-P",
    caseId: "053",
    platform: "email",
    title: "Berk → Deniz (VoltUp) — 02.11.2024",
    participants: [
      { name: "Berk Savaş", isUser: true, isPerpetrator: true },
      { name: "Deniz Acar" },
    ],
    meta: {
      deviceInfo: "053-P · E-posta Analizi",
      forensicNote:
        "<strong>Çıkarsama:</strong> Berk, olay gecesi Zeynep'e gideceğini Deniz'e <strong>önceden</strong> bildirmiş. \"Bu gece hallolacak\" ve \"son şansın\" — mali baskı doruktaydı.",
    },
    footerSignature: {
      role: "E-posta Analizi",
      name: "T. Kılıç",
    },
    messages: [
      {
        id: "053-p-1",
        sender: "Berk Savaş",
        text: `Deniz,

Zeynep'i ikna edeceğim. Bu gece gidiyorum. Yarın sabah imzalı sözleşme elinde olacak. Endişelenme.

— Berk`,
        time: "19:22",
        date: "2 Kasım 2024",
        emailFrom: "berk@berkmedia.co",
        emailTo: "deniz.acar@voltup.com.tr",
        emailSubject: "Bu gece hallolacak",
        type: "text",
      },
      {
        id: "053-p-2",
        sender: "Deniz Acar",
        text: `Berk, son şansın bu. 15 Kasım son tarih. Peşin iade başlar.

— Deniz`,
        time: "19:45",
        date: "2 Kasım 2024",
        emailFrom: "deniz.acar@voltup.com.tr",
        emailTo: "berk@berkmedia.co",
        emailSubject: "Re: Bu gece hallolacak",
        type: "text",
      },
    ],
  },
];
