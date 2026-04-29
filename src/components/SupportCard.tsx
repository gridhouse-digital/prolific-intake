import { Mail, Phone } from 'lucide-react'
import { SUPPORT_LINES } from '../lib/content'

export function SupportCard() {
  return (
    <aside className="support-card">
      <div className="eyebrow">Need help?</div>
      <h2>Quick support if the code or form gets stuck.</h2>

      <div className="support-stack">
        <a className="support-row" href="tel:+12152452285">
          <Phone size={18} />
          <span>
            <strong>{SUPPORT_LINES.mainLineDisplay}</strong>
            <small>Main intake line</small>
          </span>
        </a>

        <a className="support-row" href="tel:+12675286140">
          <Phone size={18} />
          <span>
            <strong>{SUPPORT_LINES.secondaryLineDisplay}</strong>
            <small>Alternate phone</small>
          </span>
        </a>

        <a className="support-row" href={`mailto:${SUPPORT_LINES.intakeEmail}`}>
          <Mail size={18} />
          <span>
            <strong>Intake email</strong>
            <small>{SUPPORT_LINES.intakeEmail}</small>
          </span>
        </a>
      </div>
    </aside>
  )
}
