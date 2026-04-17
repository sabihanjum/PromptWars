/**
 * @fileoverview Testing suite for core algorithm logic and PWA sanitation functions.
 */
import { describe, it, expect } from 'vitest';

export function calculateEta(queueLength, outputRate) {
    if (queueLength < 0 || outputRate <= 0) return 0;
    return Math.ceil(queueLength / outputRate);
}

export function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

describe('MatchDay Core Logic', () => {
    it('calculates correct ETA for crowd queues', () => {
        expect(calculateEta(10, 2)).toBe(5);
        expect(calculateEta(15, 2)).toBe(8); // tests Math.ceil logic
        expect(calculateEta(0, 5)).toBe(0);
    });

    it('rejects negative queue lengths gracefully', () => {
        expect(calculateEta(-5, 2)).toBe(0);
    });

    it('sanitizes harmful XSS input sequences', () => {
        const raw = "<script>alert('hack')</script>";
        const safe = sanitizeInput(raw);
        expect(safe).toBe("scriptalert('hack')/script"); // tags stripped
    });
});
