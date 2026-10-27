// ==========================================================================
// THEPRO3DSTUDIO - Showreel Video Modal
// Video <source> has no src until the play button is clicked, so the file
// is never fetched unless the visitor actually opens it.
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('whyChoosePlayBtn');
    const modal = document.getElementById('whyChooseVideoModal');
    if (!playBtn || !modal) return;

    const backdrop = document.getElementById('whyChooseVideoBackdrop');
    const closeBtn = document.getElementById('whyChooseVideoClose');
    const video = document.getElementById('whyChooseVideo');
    const source = video ? video.querySelector('source') : null;

    function openModal() {
        if (source && source.dataset.src && !source.src) {
            source.src = source.dataset.src;
            video.load();
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (video) video.play().catch(() => {});
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (video) video.pause();
    }

    playBtn.addEventListener('click', openModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
});
