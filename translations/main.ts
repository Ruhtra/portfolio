// data/mainInfo.ts

// Função para calcular anos de experiência
const calculateYearsOfExperience = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();

    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();

    // Ajusta se ainda não completou o ano
    return months < 0 ? years - 1 : years;
};

// Função específica para calcular idade
const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();

    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();

    // Ajusta se ainda não fez aniversário este ano
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

// Dados principais com cálculos dinâmicos
export const mainInfo = {
    career: {
        startDate: "2023-07-17",
        yearsOfExperience: calculateYearsOfExperience("2023-07-17") + 2,
        currentPosition: "Analista de Suporte (Full Stack Developer)",
        currentCompany: "N3 Soluções Empresariais e Contábeis"
    },
    personal: {
        name: "Kawan Arthur",
        nickname: "Ruhtra",
        email: "kawanarthurtech@gmail.com",
        phone: "+55 (84) 9 9922-1557",
        whatsapp: "5584999221557",
        location: "Brasil, RN, Natal",
        birthDate: "2003-01-06",
        age: calculateAge("2003-01-06"),
    },
    social: {
        github: "https://github.com/ruhtra",
        linkedin: "https://linkedin.com/in/kawan.arthur",
        portfolio: "https://ruhtra.work"
    },
    get currentYear(): number {
        return new Date().getFullYear();
    }
} as const;