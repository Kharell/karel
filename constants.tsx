import { Project, SkillCategory, ExperienceItem } from "./types";

export const PERSONAL_INFO = {
  name: "Karolus Jone Kalang",
  nickname: "Karel Kalang",
  title: "Junior Developer / Web Dev",
  location: "Makassar, Indonesia",
  phone: "081338373419",
  email: "kalangonakarel@gmail.com",
  linkedin: "https://www.linkedin.com/in/karell-kalang-053609274/",
  summary:
    "Saya adalah seorang fresh graduate Teknik Informatika dari Universitas Dipa Makassar (lulus Februari 2025). Selama masa studi, saya aktif belajar dan mengikuti kelas online Full Stack JavaScript di CodePolitan serta kelas MERN Stack di BuildWithAngga. Selain itu, saya juga belajar secara autodidak melalui YouTube dan dokumentasi resmi teknologi yang ingin saya pelajari. Di luar bidang pemrograman, saya juga memiliki kemampuan dalam desain logo dan desain baju, serta sebelumnya aktif berpartisipasi dalam berbagai organisasi/UKM kampus.",
};

export const PROJECTS: Project[] = [
  {
    title: "Sistem Pendaftaran Siswa Baru TK",
    description:
      "Aplikasi konsentrasi tingkat akhir berbasis web untuk manajemen pendaftaran siswa baru.",
    tags: ["PHP", "Full Stack", "MySQL"],
    role: "Freelance",
  },
  {
    title: "Aplikasi Skripsi Mobile Dev",
    description:
      "Aplikasi mobile berbasis Android untuk kebutuhan skripsi, menggunakan arsitektur modern.",
    tags: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vercel",
    ],
    role: "Developer",
  },
  {
    title: "Diagnosa Tekanan Darah Pasien",
    description:
      "Perancangan aplikasi web khusus untuk membantu diagnosa tekanan darah pasien secara digital.",
    tags: ["Web Dev", "UI/UX", "Laravel"],
    role: "Developer",
  },
  {
    title: "Aplikasi Inventasi Politeknik ATI Makassar",
    description:
      "Mengerjakan perojekan pengembangan aplikasi inventasi untuk Politeknik ATI Makassar. dalam mengikuti perogram magang bech 3 kementrian ketenaga kerjaan.",
    tags: ["Web Development", "Database Design", "Full Stack php"],
    role: "Developer",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Magang Batch 3 (Divisi IT)",
    company: "Politeknik ATI Makassar",
    duration: "Des 2025 – Jun 2026 (6 Bulan)",
    description: [
      "Mengerjakan pengembangan software di lingkungan Politeknik ATI Makassar.",
      "Berkontribusi aktif dalam tim IT untuk solusi digital kampus.",
    ],
  },
  {
    title: "KKL (Kuliah Kerja Lapangan)",
    company: "PT. Groce Indonesia Makassar",
    duration: "1 Bulan",
    description: [
      "Mengerjakan perancangan UI/UX web yang ditugaskan oleh perusahaan.",
      "Berkolaborasi dengan tim untuk memastikan desain sesuai dengan kebutuhan user.",
    ],
  },
  {
    title: "Anggota Study Club (BPH)",
    company: "KMK (Kerukunan Mahasiswa Katolik)",
    duration: "1 Periode",
    description: [
      "Menjabat sebagai anggota Study Club divisi Pembelajaran.",
      "Mengajar materi pengembangan web kepada anggota organisasi.",
      "Menjadi Badan Pengurus Harian (BPH) selama satu periode.",
    ],
  },
];

export const EDUCATION = {
  university: "UNIVERSITAS DIPA MAKASSAR",
  period: "2021 – 2025",
  degree: "S1 Teknik Informatika",
  ipk: "3.41",
  duration: "Selesai dalam 3.5 Tahun (Semester 7)",
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: ["React.js", "Tailwind CSS", "JavaScript", "React Native", "Expo"],
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "MySQL",
      "MongoDB (NoSQL)",
    ],
  },
  {
    title: "Tools & Testing",
    skills: ["Postman API Testing", "Laragon", "Vercel"],
  },
  {
    title: "Design & Others",
    skills: [
      "UI/UX Figma",
      "Adobe Illustrator",
      "Photoshop",
      "Desain Logo & Baju",
    ],
  },
  {
    title: "Soft Skills",
    skills: ["Komunikasi Organisasi", "Kerja Tim", "Kolaborasi"],
  },
];
