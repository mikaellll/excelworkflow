import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerDataEn = {
  links: [
    { text: 'Home', href: getPermalink('/en') },
    { text: 'Blog', href: getBlogPermalink() }, /* We keep english blog at root since there's no translations ready for posts natively, or change later */
    { text: 'About', href: getPermalink('/en/about') },
  ],
  actions: [
    { variant: 'primary', text: 'Courses', href: getPermalink('/en/formation') },
  ],
};

export const footerDataEn = {
  links: [
    {
      title: 'Courses',
      links: [
        { text: 'Excel & AI', href: getPermalink('/en/formation') + '#excel-ia' },
        { text: 'Python Data Science', href: getPermalink('/en/formation') + '#python' },
        { text: 'Power BI & DAX', href: getPermalink('/en/formation') + '#powerbi' },
        { text: 'Excel Automation', href: getPermalink('/en/formation') + '#automatisation' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'About', href: getPermalink('/en/about') },
        { text: 'Legal Terms', href: getPermalink('/terms') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Legal Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/excelworkflow' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@excelworkflow' },
  ],
  footNote: `
    © ${new Date().getFullYear()} <a href="https://excelworkflow.com/en" class="font-semibold hover:text-emerald-400 transition-colors">ExcelWorkflow</a>. All rights reserved. &nbsp;|&nbsp; <a href="https://mickaelcode.com" class="text-xs hover:text-emerald-400 transition-colors" target="_blank" rel="noopener">developed by mickael</a>
  `,
};
