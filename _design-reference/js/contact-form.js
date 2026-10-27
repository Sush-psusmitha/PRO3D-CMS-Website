// ==========================================================================
// THEPRO3DSTUDIO - Services Contact Form
// Canvas-drawn captcha (no third-party lib) + client-side validation +
// AJAX submit to contact.php, matching the fields it expects:
// name, email, contact (10-digit), country (dial code), message.
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('servicesContactForm');
    if (!form) return;

    const statusEl = document.getElementById('scfStatus');
    const submitBtn = document.getElementById('scfSubmitBtn');
    const captchaCanvas = document.getElementById('scfCaptchaCanvas');
    const captchaInput = document.getElementById('scfCaptchaInput');
    const captchaRefreshBtn = document.getElementById('scfCaptchaRefresh');
    const ctx = captchaCanvas ? captchaCanvas.getContext('2d') : null;
    let captchaCode = '';

    function drawCaptcha(code) {
        if (!ctx) return;
        const w = captchaCanvas.width;
        const h = captchaCanvas.height;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#F2F2F2';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = 'rgba(79, 82, 242, ' + (0.15 + Math.random() * 0.2) + ')';
            ctx.beginPath();
            ctx.moveTo(Math.random() * w, Math.random() * h);
            ctx.lineTo(Math.random() * w, Math.random() * h);
            ctx.stroke();
        }

        ctx.font = 'bold 22px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        const charWidth = w / code.length;
        for (let i = 0; i < code.length; i++) {
            ctx.save();
            const x = charWidth * i + charWidth / 2;
            const y = h / 2 + (Math.random() * 6 - 3);
            const angle = (Math.random() * 30 - 15) * Math.PI / 180;
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillStyle = '#1E1E1E';
            ctx.fillText(code[i], 0, 0);
            ctx.restore();
        }

        for (let i = 0; i < 25; i++) {
            ctx.fillStyle = 'rgba(30, 30, 30, ' + (0.08 + Math.random() * 0.12) + ')';
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        captchaCode = code;
        drawCaptcha(code);
    }

    generateCaptcha();

    if (captchaRefreshBtn) {
        captchaRefreshBtn.addEventListener('click', () => {
            generateCaptcha();
            captchaInput.value = '';
            captchaInput.focus();
        });
    }

    function setError(fieldId, message) {
        const errorEl = form.querySelector('[data-error-for="' + fieldId + '"]');
        const inputEl = document.getElementById(fieldId);
        if (errorEl) errorEl.textContent = message || '';
        if (inputEl) inputEl.classList.toggle('has-error', !!message);
    }

    function validate() {
        let valid = true;

        const name = document.getElementById('scfName');
        if (!name.value.trim()) {
            setError('scfName', 'Please enter your name.');
            valid = false;
        } else if (!/^[a-zA-Z ]+$/.test(name.value.trim())) {
            setError('scfName', 'Name should include only letters and spaces.');
            valid = false;
        } else {
            setError('scfName', '');
        }

        const email = document.getElementById('scfEmail');
        if (!email.value.trim()) {
            setError('scfEmail', 'Please enter your email.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            setError('scfEmail', 'Please enter a valid email address.');
            valid = false;
        } else {
            setError('scfEmail', '');
        }

        const phone = document.getElementById('scfPhone');
        if (!/^[0-9]{10}$/.test(phone.value.trim())) {
            setError('scfPhone', 'Please enter a valid 10-digit phone number.');
            valid = false;
        } else {
            setError('scfPhone', '');
        }

        const message = document.getElementById('scfMessage');
        if (!message.value.trim()) {
            setError('scfMessage', 'Please enter a message.');
            valid = false;
        } else {
            setError('scfMessage', '');
        }

        if (captchaInput.value.trim().toUpperCase() !== captchaCode.toUpperCase()) {
            setError('scfCaptchaInput', 'The code entered does not match.');
            valid = false;
        } else {
            setError('scfCaptchaInput', '');
        }

        const consent = document.getElementById('scfConsent');
        const consentWrap = consent.closest('.form-consent');
        if (!consent.checked) {
            valid = false;
            if (consentWrap) consentWrap.classList.add('has-error');
        } else if (consentWrap) {
            consentWrap.classList.remove('has-error');
        }

        return valid;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusEl.textContent = '';
        statusEl.className = 'form-status';

        if (!validate()) return;

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, { method: 'POST', body: formData });
            const text = (await response.text()).trim();
            const plainText = text.replace(/<[^>]+>/g, '');

            if (/query has been received/i.test(text)) {
                statusEl.textContent = plainText;
                statusEl.classList.add('form-status-success');
                form.reset();
                generateCaptcha();
            } else {
                statusEl.textContent = plainText || 'Something went wrong. Please try again.';
                statusEl.classList.add('form-status-error');
                generateCaptcha();
                captchaInput.value = '';
            }
        } catch (err) {
            statusEl.textContent = 'Something went wrong. Please try again later.';
            statusEl.classList.add('form-status-error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});
