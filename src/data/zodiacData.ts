export interface ZodiacStar {
    id: string;
    name: string;
    bayer?: string;
    constellation: string;
    ra: number; // Right Ascension in Hours
    dec: number; // Declination in Degrees
    mag: number;
    spectral: string;
}

export interface ConstellationLines {
    id: string; // Constellation ID (e.g., 'Ari')
    lines: [string, string][]; // Pairs of Star IDs
}

export const ZODIAC_STARS: ZodiacStar[] = [
    // Aries
    { id: 'Ari-Hamal', name: 'Hamal', bayer: 'α Ari', constellation: 'Aries', ra: 2.11, dec: 23.46, mag: 2.01, spectral: 'K2' },
    { id: 'Ari-Sheratan', name: 'Sheratan', bayer: 'β Ari', constellation: 'Aries', ra: 1.91, dec: 20.80, mag: 2.64, spectral: 'A5' },
    { id: 'Ari-Mesarthim', name: 'Mesarthim', bayer: 'γ Ari', constellation: 'Aries', ra: 1.89, dec: 19.28, mag: 3.86, spectral: 'A0' },
    { id: 'Ari-41', name: '41 Ari', bayer: '41 Ari', constellation: 'Aries', ra: 3.08, dec: 27.26, mag: 3.63, spectral: 'B8' },

    // Taurus
    { id: 'Tau-Aldebaran', name: 'Aldebaran', bayer: 'α Tau', constellation: 'Taurus', ra: 4.60, dec: 16.51, mag: 0.87, spectral: 'K5' },
    { id: 'Tau-Elnath', name: 'Elnath', bayer: 'β Tau', constellation: 'Taurus', ra: 5.43, dec: 28.60, mag: 1.65, spectral: 'B7' },
    { id: 'Tau-Alcyone', name: 'Alcyone', bayer: 'η Tau', constellation: 'Taurus', ra: 3.79, dec: 24.10, mag: 2.85, spectral: 'B7' },
    { id: 'Tau-Tianguan', name: 'Tianguan', bayer: 'ζ Tau', constellation: 'Taurus', ra: 5.63, dec: 21.14, mag: 2.97, spectral: 'B2' },

    // Gemini
    { id: 'Gem-Pollux', name: 'Pollux', bayer: 'β Gem', constellation: 'Gemini', ra: 7.76, dec: 28.03, mag: 1.16, spectral: 'K0' },
    { id: 'Gem-Castor', name: 'Castor', bayer: 'α Gem', constellation: 'Gemini', ra: 7.58, dec: 31.88, mag: 1.58, spectral: 'A1' },
    { id: 'Gem-Alhena', name: 'Alhena', bayer: 'γ Gem', constellation: 'Gemini', ra: 6.63, dec: 16.39, mag: 1.93, spectral: 'A0' },

    // Cancer
    { id: 'Cnc-Acubens', name: 'Acubens', bayer: 'α Cnc', constellation: 'Cancer', ra: 8.97, dec: 11.85, mag: 4.25, spectral: 'A5' },
    { id: 'Cnc-Altarf', name: 'Altarf', bayer: 'β Cnc', constellation: 'Cancer', ra: 8.27, dec: 9.18, mag: 3.52, spectral: 'K4' },
    { id: 'Cnc-AsellusAustralis', name: 'Asellus Australis', bayer: 'δ Cnc', constellation: 'Cancer', ra: 8.74, dec: 18.15, mag: 3.94, spectral: 'K0' },

    // Leo
    { id: 'Leo-Regulus', name: 'Regulus', bayer: 'α Leo', constellation: 'Leo', ra: 10.14, dec: 11.96, mag: 1.36, spectral: 'B7' },
    { id: 'Leo-Denebola', name: 'Denebola', bayer: 'β Leo', constellation: 'Leo', ra: 11.82, dec: 14.57, mag: 2.14, spectral: 'A3' },
    { id: 'Leo-Algieba', name: 'Algieba', bayer: 'γ Leo', constellation: 'Leo', ra: 10.33, dec: 19.84, mag: 2.01, spectral: 'K0' },

    // Virgo
    { id: 'Vir-Spica', name: 'Spica', bayer: 'α Vir', constellation: 'Virgo', ra: 13.42, dec: -11.16, mag: 0.98, spectral: 'B1' },
    { id: 'Vir-Porrima', name: 'Porrima', bayer: 'γ Vir', constellation: 'Virgo', ra: 12.69, dec: -1.45, mag: 2.74, spectral: 'F0' },
    { id: 'Vir-Vindemiatrix', name: 'Vindemiatrix', bayer: 'ε Vir', constellation: 'Virgo', ra: 13.04, dec: 10.96, mag: 2.85, spectral: 'G8' },

    // Libra
    { id: 'Lib-Zubenelgenubi', name: 'Zubenelgenubi', bayer: 'α Lib', constellation: 'Libra', ra: 14.84, dec: -16.04, mag: 2.75, spectral: 'A3' },
    { id: 'Lib-Zubeneschamali', name: 'Zubeneschamali', bayer: 'β Lib', constellation: 'Libra', ra: 15.28, dec: -9.38, mag: 2.61, spectral: 'B8' },

    // Scorpius
    { id: 'Sco-Antares', name: 'Antares', bayer: 'α Sco', constellation: 'Scorpius', ra: 16.49, dec: -26.43, mag: 0.96, spectral: 'M1' },
    { id: 'Sco-Graffias', name: 'Graffias', bayer: 'β Sco', constellation: 'Scorpius', ra: 16.09, dec: -19.80, mag: 2.56, spectral: 'B1' },
    { id: 'Sco-Dschubba', name: 'Dschubba', bayer: 'δ Sco', constellation: 'Scorpius', ra: 16.00, dec: -22.62, mag: 2.29, spectral: 'B0' },
    { id: 'Sco-Shaula', name: 'Shaula', bayer: 'λ Sco', constellation: 'Scorpius', ra: 17.56, dec: -37.10, mag: 1.62, spectral: 'B2' },

    // Sagittarius
    { id: 'Sgr-KausAustralis', name: 'Kaus Australis', bayer: 'ε Sgr', constellation: 'Sagittarius', ra: 18.40, dec: -34.38, mag: 1.79, spectral: 'B9' },
    { id: 'Sgr-Nunki', name: 'Nunki', bayer: 'σ Sgr', constellation: 'Sagittarius', ra: 18.92, dec: -26.29, mag: 2.05, spectral: 'B2' },

    // Capricornus
    { id: 'Cap-DenebAlgedi', name: 'Deneb Algedi', bayer: 'δ Cap', constellation: 'Capricornus', ra: 21.78, dec: -16.13, mag: 2.85, spectral: 'A5' },
    { id: 'Cap-Dabih', name: 'Dabih', bayer: 'β Cap', constellation: 'Capricornus', ra: 20.35, dec: -14.78, mag: 3.05, spectral: 'F8' },

    // Aquarius
    { id: 'Aqr-Sadalsuud', name: 'Sadalsuud', bayer: 'β Aqr', constellation: 'Aquarius', ra: 21.52, dec: -5.57, mag: 2.90, spectral: 'G0' },
    { id: 'Aqr-Sadalmelik', name: 'Sadalmelik', bayer: 'α Aqr', constellation: 'Aquarius', ra: 22.09, dec: -0.32, mag: 2.95, spectral: 'G2' },

    // Pisces
    { id: 'Psc-Alpherg', name: 'Alpherg', bayer: 'η Psc', constellation: 'Pisces', ra: 1.52, dec: 15.34, mag: 3.62, spectral: 'G7' },
    { id: 'Psc-Alrescha', name: 'Alrescha', bayer: 'α Psc', constellation: 'Pisces', ra: 2.03, dec: 2.76, mag: 3.82, spectral: 'A0' },
];

export const ZODIAC_LINES: ConstellationLines[] = [
    {
        id: 'Ari',
        lines: [['Ari-Hamal', 'Ari-Sheratan'], ['Ari-Sheratan', 'Ari-Mesarthim']]
    },
    {
        id: 'Tau',
        lines: [['Tau-Aldebaran', 'Tau-Elnath'], ['Tau-Aldebaran', 'Tau-Tianguan']] // Simplified V shape + Horns
    },
    {
        id: 'Gem',
        lines: [['Gem-Pollux', 'Gem-Castor'], ['Gem-Alhena', 'Gem-Pollux']]
    },
    {
        id: 'Cnc',
        lines: [['Cnc-Acubens', 'Cnc-Altarf'], ['Cnc-AsellusAustralis', 'Cnc-Altarf']] // Y shape roughly
    },
    {
        id: 'Leo',
        lines: [['Leo-Regulus', 'Leo-Algieba'], ['Leo-Algieba', 'Leo-Denebola']] // Sickle + Body
    },
    {
        id: 'Vir',
        lines: [['Vir-Spica', 'Vir-Porrima'], ['Vir-Vindemiatrix', 'Vir-Porrima']]
    },
    {
        id: 'Lib',
        lines: [['Lib-Zubenelgenubi', 'Lib-Zubeneschamali']]
    },
    {
        id: 'Sco',
        lines: [['Sco-Antares', 'Sco-Graffias'], ['Sco-Antares', 'Sco-Dschubba'], ['Sco-Antares', 'Sco-Shaula']] // Simplified Hook
    },
    {
        id: 'Sgr',
        lines: [['Sgr-KausAustralis', 'Sgr-Nunki']] // Teapot top
    },
    {
        id: 'Cap',
        lines: [['Cap-DenebAlgedi', 'Cap-Dabih']]
    },
    {
        id: 'Aqr',
        lines: [['Aqr-Sadalsuud', 'Aqr-Sadalmelik']]
    },
    {
        id: 'Psc',
        lines: [['Psc-Alpherg', 'Psc-Alrescha']]
    }
];
