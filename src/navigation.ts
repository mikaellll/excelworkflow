import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Accueil',
      href: getPermalink('/'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'À propos',
      href: getPermalink('/about'),
    },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Formations',
      href: getPermalink('/formation'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Formations',
      links: [
        { text: 'Excel & IA', href: getPermalink('/formation') + '#excel-ia' },
        { text: 'Python Data Science', href: getPermalink('/formation') + '#python' },
        { text: 'Power BI & DAX', href: getPermalink('/formation') + '#powerbi' },
        { text: 'Automatisation Excel', href: getPermalink('/formation') + '#automatisation' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'À propos', href: getPermalink('/about') },
        { text: 'Mentions Légales', href: getPermalink('/terms') },
        { text: 'Politique de Confidentialité', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Mentions Légales', href: getPermalink('/terms') },
    { text: 'Politique de Confidentialité', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/excelworkflow' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@excelworkflow' },
  ],
  footNote: `
    © ${new Date().getFullYear()} <a href="https://excelworkflow.com" class="font-semibold hover:text-emerald-400 transition-colors">ExcelWorkflow</a>. Tous droits réservés. &nbsp;|&nbsp; <a href="https://mickaelcode.com" class="text-xs hover:text-emerald-400 transition-colors" target="_blank" rel="noopener">développé par mickael</a>
  `,
};
