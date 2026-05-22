import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface LeadData {
  fullName: string;
  company?: string;
  phone: string;
  email?: string;
  messenger?: string;
  topic?: string;
  quantity?: string;
  deadline?: string;
  comment?: string;
  attachment?: MailAttachment;
}

function buildEmailHtml(lead: LeadData): string {
  const rows = [
    ['ФИО', lead.fullName],
    ['Телефон', lead.phone],
    lead.email ? ['Email', lead.email] : null,
    lead.company ? ['Компания', lead.company] : null,
    lead.messenger ? ['Способ связи', lead.messenger] : null,
    lead.topic ? ['Тема', lead.topic] : null,
    lead.quantity ? ['Тираж', lead.quantity] : null,
    lead.deadline ? ['Срок', lead.deadline] : null,
    lead.comment ? ['Комментарий', `<pre style="font-family:inherit;white-space:pre-wrap;margin:0">${lead.comment.replace(/</g, '&lt;')}</pre>`] : null,
  ].filter(Boolean) as [string, string][];

  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#475569;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 12px;color:#0f172a">${v}</td></tr>`)
    .join('');

  return `<!DOCTYPE html><html lang="ru"><body style="font-family:Arial,sans-serif;background:#f8fafc;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
  <div style="background:#0f172a;padding:24px 28px">
    <h1 style="color:#fff;margin:0;font-size:20px">Новая заявка с сайта TEEON</h1>
  </div>
  <div style="padding:24px 28px">
    <table style="width:100%;border-collapse:collapse">
      ${tableRows}
    </table>
    ${lead.attachment ? `<p style="margin-top:20px;color:#64748b;font-size:13px">📎 Прикреплён файл: <strong>${lead.attachment.filename}</strong></p>` : ''}
  </div>
  <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0">
    <p style="margin:0;font-size:12px;color:#94a3b8">Письмо отправлено автоматически с сайта TEEON</p>
  </div>
</div></body></html>`;
}

function buildEmailText(lead: LeadData): string {
  const lines = [
    'Новая заявка с сайта TEEON',
    '═══════════════════════════════════',
    `ФИО: ${lead.fullName}`,
    `Телефон: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : '',
    lead.company ? `Компания: ${lead.company}` : '',
    lead.messenger ? `Способ связи: ${lead.messenger}` : '',
    lead.topic ? `Тема: ${lead.topic}` : '',
    lead.quantity ? `Тираж: ${lead.quantity}` : '',
    lead.deadline ? `Срок: ${lead.deadline}` : '',
    lead.comment ? `\nКомментарий:\n${lead.comment}` : '',
    lead.attachment ? `\nПрикреплён файл: ${lead.attachment.filename}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

async function saveToFile(lead: LeadData): Promise<void> {
  const dir = path.join(process.cwd(), '.tmp', 'request-submissions');
  fs.mkdirSync(dir, { recursive: true });

  const ts = Date.now();
  const record = { ...lead, attachment: lead.attachment ? { filename: lead.attachment.filename } : undefined, savedAt: new Date().toISOString() };
  fs.writeFileSync(path.join(dir, `${ts}.json`), JSON.stringify(record, null, 2), 'utf-8');

  if (lead.attachment) {
    const filesDir = path.join(dir, 'files');
    fs.mkdirSync(filesDir, { recursive: true });
    fs.writeFileSync(path.join(filesDir, `${ts}-${lead.attachment.filename}`), lead.attachment.content);
  }
}

export async function sendLeadEmail(lead: LeadData): Promise<{ success: boolean; previewUrl?: string }> {
  const mode = (process.env.LEAD_EMAIL_MODE ?? 'dev').toLowerCase();

  if (mode === 'dev' || mode === '') {
    await saveToFile(lead);
    return { success: true };
  }

  let transporter: Transporter;
  let toEmail: string;

  if (mode === 'ethereal') {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    toEmail = testAccount.user;
  } else {
    // smtp mode
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });
    toEmail = process.env.LEAD_TO_EMAIL!;
  }

  const attachments = lead.attachment
    ? [{ filename: lead.attachment.filename, content: lead.attachment.content, contentType: lead.attachment.contentType }]
    : [];

  const info = await transporter.sendMail({
    from: process.env.LEAD_FROM_EMAIL ?? '"TEEON Сайт" <noreply@teeon.ru>',
    to: toEmail,
    subject: `Заявка с сайта: ${lead.topic ?? lead.fullName}`,
    text: buildEmailText(lead),
    html: buildEmailHtml(lead),
    attachments,
  });

  let previewUrl: string | undefined;
  if (mode === 'ethereal') {
    const url = nodemailer.getTestMessageUrl(info);
    if (url) {
      previewUrl = url as string;
      console.log('[mail] Ethereal preview:', previewUrl);
    }
  }

  return { success: true, previewUrl };
}
