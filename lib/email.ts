import { Resend } from "resend";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(6, "Phone is required"),
  note: z.string().max(1000).optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactSchema>;

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL ?? "notifications@lienson.vn";
const adminEmail = process.env.ADMIN_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(data: ContactPayload) {
  if (!resend || !adminEmail) {
    console.warn(
      "[contact] Email service not configured. Set RESEND_API_KEY and ADMIN_EMAIL."
    );
    return { ok: false, skipped: true };
  }

  const subject = `Yêu cầu mua hàng từ ${data.name}`;
  const htmlBody = `
    <h2>Thông tin yêu cầu mua</h2>
    <ul>
      <li><strong>Họ tên:</strong> ${data.name}</li>
      <li><strong>Số điện thoại:</strong> ${data.phone}</li>
    </ul>
    <p><strong>Ghi chú:</strong></p>
    <p>${data.note ?? "Không có"}</p>
  `;

  await resend.emails.send({
    from: resendFrom,
    to: adminEmail,
    subject,
    html: htmlBody,
  });

  return { ok: true };
}
