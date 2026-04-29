import { describe, expect, it } from 'vitest'
import {
  ACCESS_CODE_ALPHABET,
  buildAccessCode,
  buildStaffMessage,
  extractLast4,
  normalizeAccessCode,
} from './intake'

describe('intake helpers', () => {
  it('normalizes access codes', () => {
    expect(normalizeAccessCode('  phc-2285-k7m4q9  ')).toBe('PHC-2285-K7M4Q9')
  })

  it('extracts last four digits from phone input', () => {
    expect(extractLast4('(215) 245-2285')).toBe('2285')
    expect(extractLast4('53')).toBe('')
  })

  it('builds access code using supplied suffix', () => {
    expect(buildAccessCode('2285', 'K7M4Q9')).toBe('PHC-2285-K7M4Q9')
  })

  it('uses the typo-resistant alphabet', () => {
    expect(ACCESS_CODE_ALPHABET.includes('0')).toBe(false)
    expect(ACCESS_CODE_ALPHABET.includes('1')).toBe(false)
    expect(ACCESS_CODE_ALPHABET.includes('O')).toBe(false)
    expect(ACCESS_CODE_ALPHABET.includes('I')).toBe(false)
  })

  it('builds the staff message template with the generated code', () => {
    expect(buildStaffMessage('PHC-2285-K7M4Q9')).toContain('PHC-2285-K7M4Q9')
  })
})
