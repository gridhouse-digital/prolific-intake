export const SUPPORT_LINES = {
  intakeEmail: 'intake@prolifichcs.com',
  mainLineDisplay: '(215) 245-2285',
  mainLineNumber: '(215) 245-2285',
  secondaryLineDisplay: '(267) 528-6140',
  secondaryLineNumber: '(267) 528-6140',
}

export const STAFF_SEND_SUBJECT = 'Prolific Homecare LLC Admissions / Intake Access Details'

export function buildStaffEmailTemplate(clientName?: string, code?: string) {
  const greetingName = clientName?.trim() ? ` ${clientName.trim()}` : ''
  const resolvedCode = code || '{{CODE}}'

  return `Hello${greetingName},

You have been invited to complete the Prolific Homecare LLC Admissions / Intake form.

Please use the secure link below to begin:
https://intake.prolifichcs.com

Your secure access code:
${resolvedCode}

For privacy, please keep this code confidential and use it only for your admissions / intake form.

If you need assistance, please contact our Admissions Team at intake@prolifichcs.com or (215) 245-2285.
Alternate phone: (267) 528-6140

Kind regards,
Prolific Homecare LLC
Admissions Team`
}

export const STAFF_SEND_TEMPLATE = buildStaffEmailTemplate()

export const VERIFY_ERROR_COPY: Record<string, string> = {
  expired: 'That access code has expired. Request a callback and our team can help you continue.',
  invalid: 'We could not verify that code. Double-check the format and try again.',
  rate_limited: 'Too many attempts from this device right now. Please wait a bit and try again.',
  revoked: 'That access code is no longer active. Request a callback and we will help you restart.',
  used: 'That access code has reached its use limit. Request a callback and we will help you continue.',
}
