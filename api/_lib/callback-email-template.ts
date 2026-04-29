export interface CallbackPayload {
  at: string
  bestTime: string
  message?: string
  name: string
  phone: string
  service: string
}

export const DEFAULT_CALLBACK_EMAIL_FROM = 'callback@prolifichcs.com'

export function normalizeEnvValue(value: string | undefined) {
  return value?.replace(/\r?\n/g, '').trim() ?? ''
}

export function normalizeEmailAddress(value: string | undefined) {
  return normalizeEnvValue(value).replace(/\s+/g, '')
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function sanitizeTagValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 256) || 'not_provided'
}

export function buildCallbackEmailTags(payload: CallbackPayload) {
  return [
    { name: 'type', value: 'callback_request' },
    { name: 'client', value: 'prolific_homecare' },
    { name: 'source', value: 'intake_portal' },
    { name: 'service', value: sanitizeTagValue(payload.service) },
  ]
}

export function buildCallbackEmailContent(payload: CallbackPayload) {
  const subject = `New intake callback request from ${payload.name}`
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333333; line-height: 1.6; background: #f3f3f3; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 16px 36px rgba(20,40,71,0.08);">
        <div style="padding: 24px; background: linear-gradient(135deg, #224278 0%, #2ea3f2 100%); color: #ffffff;">
          <div style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.84; margin-bottom: 10px;">Prolific Homecare Intake</div>
          <h2 style="margin: 0; font-size: 24px; line-height: 1.2;">New callback request</h2>
          <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.88;">A visitor needs help getting through the private intake flow.</p>
        </div>
        <div style="padding: 24px;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 10px 14px; border: 1px solid #e2e2e2; font-weight: 700; width: 34%; background: #f3f3f3;">Name</td><td style="padding: 10px 14px; border: 1px solid #e2e2e2;">${escapeHtml(payload.name)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e2e2e2; font-weight: 700; background: #f3f3f3;">Phone</td><td style="padding: 10px 14px; border: 1px solid #e2e2e2;">${escapeHtml(payload.phone)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e2e2e2; font-weight: 700; background: #f3f3f3;">Best time</td><td style="padding: 10px 14px; border: 1px solid #e2e2e2;">${escapeHtml(payload.bestTime)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e2e2e2; font-weight: 700; background: #f3f3f3;">Message</td><td style="padding: 10px 14px; border: 1px solid #e2e2e2;">${escapeHtml(payload.message || 'Not provided')}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e2e2e2; font-weight: 700; background: #f3f3f3;">Submitted at</td><td style="padding: 10px 14px; border: 1px solid #e2e2e2;">${escapeHtml(payload.at)}</td></tr>
          </table>
        </div>
      </div>
    </div>
  `.trim()

  const text = [
    'New intake callback request',
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Best time: ${payload.bestTime}`,
    `Message: ${payload.message || 'Not provided'}`,
    `Submitted at: ${payload.at}`,
  ].join('\n')

  return { html, subject, text }
}
