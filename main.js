/* Zella Studios homepage — interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, html = '') => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (html) n.innerHTML = html;
    return n;
  };
  const fmt = (n) => Math.round(n).toLocaleString('en-GB');

  /* ---------- Mobile nav menu ---------- */
  const siteNav = $('#siteNav'), navToggle = $('#navToggle'), navMenu = $('#navMenu');
  function setNavOpen(open) {
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  navToggle.addEventListener('click', () => setNavOpen(!siteNav.classList.contains('is-open')));
  navMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setNavOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNavOpen(false); });

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function runCount(node) {
    const target = Number(node.dataset.count), suffix = node.dataset.suffix || '';
    if (reduceMotion) { node.textContent = target + suffix; return; }
    const start = performance.now(), dur = 1600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    counters.forEach((n) => { n.textContent = '0' + (n.dataset.suffix || ''); });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { runCount(e.target); io.unobserve(e.target); }
    }), { threshold: 0.5 });
    counters.forEach((n) => io.observe(n));
  }

  /* ---------- Hats ---------- */
  const hats = [
    ['bd', 'Business development', true], ['enq', 'Answering enquiries', true], ['docs', 'Chasing documents', true],
    ['reports', 'Writing reports', true], ['updates', 'Client updates', true], ['proposals', 'Following up proposals', true],
    ['diary', 'Booking appointments', true], ['onboard', 'Onboarding new clients', true], ['reviews', 'Asking for reviews', true],
    ['crm', 'Updating the CRM', true], ['marketing', 'Marketing', true], ['web', 'Fixing the website', true],
    ['data', 'Admin & data entry', true], ['hr', 'Team management', false]
  ];
  const picked = new Set(['enq', 'docs', 'reports', 'updates', 'proposals']);
  const hatsGrid = $('#hats-grid');
  const callout = $('.callout', hatsGrid);
  hats.forEach(([id, label]) => {
    const b = el('button', { type: 'button', class: 'chip', 'aria-pressed': String(picked.has(id)) }, `<span class="chip__dot"></span>${label}`);
    b.addEventListener('click', () => {
      picked.has(id) ? picked.delete(id) : picked.add(id);
      b.setAttribute('aria-pressed', String(picked.has(id)));
      updateHats();
    });
    hatsGrid.insertBefore(b, callout);
  });
  function updateHats() {
    const sel = hats.filter(([id]) => picked.has(id));
    const count = sel.length;
    const auto = sel.filter((h) => h[2]).length;
    $('#hatCount').textContent = count;
    $('#autoCount').textContent = `${auto} of them we can automate`;
    $('#hatBar').style.width = (count ? Math.round(auto / count * 100) : 0) + '%';
    let msg = 'Tap the jobs you do each week to see how many could run without you.';
    if (count >= 1 && count <= 3) msg = 'A good start. Even a few automated hats free up hours every week.';
    if (count >= 4 && count <= 7) msg = "That's a full-time job before you've done any actual growing. Most of it can run on its own.";
    if (count >= 8) msg = "You're the whole back office. Let us take the repetitive work off you so you can lead the firm again.";
    $('#hatMsg').textContent = msg;
  }
  updateHats();

  /* ---------- Customer journey tabs ---------- */
  const stages = [
    { group: 'LEADS', groupName: 'Get more leads', name: 'Your database', title: "There's new business in your database already.", problem: 'Past enquiries, lapsed clients and upcoming remortgages or renewals sit in your CRM, and nobody has time to contact them.', outcome: 'New business from contacts you already have, with no extra ad spend.',
      items: [['Database reactivation', 'Personalised campaigns that restart conversations with past enquiries and lapsed clients.'], ['Renewal & remortgage reminders', 'Clients contacted at the right moment, before a competitor gets there first.'], ['Referral prompts', 'Happy clients asked for an introduction at the right time.']] },
    { group: 'LEADS', groupName: 'Get more leads', name: 'Reviews', title: 'Get found, and get chosen.', problem: 'Clients compare firms online before they ever pick up the phone, and asking for reviews is easy to forget.', outcome: 'More reviews, better visibility on Google and more enquiries, without more ad spend.',
      items: [['Automatic review requests', 'Sent when a case completes, while the client is happiest.'], ['Smart feedback routing', 'Hear about any issues privately before they become public.'], ['Review monitoring', 'Stay on top of what clients are saying about you.']] },
    { group: 'LEADS', groupName: 'Get more leads', name: 'New enquiries', title: 'More of the right enquiries coming in.', problem: "Your website looks fine but doesn't generate enquiries, so you rely on referrals alone.", outcome: 'A steady flow of new enquiries alongside your referrals.',
      items: [['Websites built to convert', 'Clear, fast and designed around one goal: enquiries.'], ['Google & Meta ads', 'Campaigns that reach people actively looking for your services.'], ['AI-powered outreach', 'Personalised prospecting that books conversations for you.']] },
    { group: 'WIN', groupName: 'Win more of them', name: 'Instant replies', title: 'Reply first, win the client.', problem: 'Enquiries from your website and comparison sites go to whoever replies first, and yours wait until the morning.', outcome: 'Every enquiry answered within a minute, day or night.',
      items: [['Instant email & SMS replies', 'A personal, professional response the moment someone gets in touch.'], ['AI receptionist', 'Answers calls, captures what the client needs and books them in.'], ['Straight into your CRM', 'Every enquiry logged automatically, nothing lost in an inbox.']] },
    { group: 'WIN', groupName: 'Win more of them', name: 'Follow-ups', title: "Good opportunities don't go quiet.", problem: 'Proposals and quotes go out, and nobody has time to follow them up.', outcome: 'More proposals turned into signed clients.',
      items: [['Proposal follow-ups', "Polite, well-timed messages in your firm's voice."], ['Nurture sequences', "Helpful updates that keep you front of mind until they're ready."], ['Appointment reminders', 'Fewer no-shows, and a fuller diary.']] },
    { group: 'CAPACITY', groupName: 'Take on more without hiring', name: 'Document chasing', title: 'Files that keep moving on their own.', problem: 'Your team spends hours asking clients for payslips, ID and signed forms, often more than once.', outcome: 'Fewer stalled files, and hours back for your team every week.',
      items: [['Automatic document requests', "Clients reminded politely until everything's in."], ['Simple client uploads', 'One link for clients to send what you need.'], ['Status at a glance', "See what's outstanding on every file."]] },
    { group: 'CAPACITY', groupName: 'Take on more without hiring', name: 'Reports & letters', title: 'Hours of paperwork, done in minutes.', problem: 'Suitability reports, letters and onboarding packs take hours to write, which caps how many clients each person can handle.', outcome: 'More clients per adviser, broker or case handler.',
      items: [['Drafted from your data', 'In your templates, format and tone.'], ['Human sign-off', 'Every document checked by your team before it goes out.'], ['Filed automatically', 'Saved, logged and tracked against the client record.']] },
    { group: 'CAPACITY', groupName: 'Take on more without hiring', name: 'Client updates', title: 'Fewer "any news?" calls.', problem: "Clients ring for updates because they don't know where things stand, and every call interrupts real work.", outcome: 'Happier clients and a quieter phone.',
      items: [['Automatic progress updates', 'Clients told what has happened at every milestone.'], ['Onboarding sequences', 'Welcome, what happens next, and what we need from you.'], ['A clear pipeline', 'Always know what needs to happen next on every client.']] }
  ];
  const pad = (i) => String(i + 1).padStart(2, '0');
  const tabs = $('#tabs');
  const tabButtons = stages.map((s, i) => {
    const b = el('button', { type: 'button', role: 'tab', class: 'tab', id: `tab-${i}`, 'aria-controls': 'stagePanel' }, `<span>${s.group}</span>${s.name}`);
    b.addEventListener('click', () => selectStage(i));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + stages.length) % stages.length;
        selectStage(n); tabButtons[n].focus();
      }
    });
    tabs.appendChild(b);
    return b;
  });
  function selectStage(i) {
    const s = stages[i];
    tabButtons.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    $('#stagePanel').setAttribute('aria-labelledby', `tab-${i}`);
    $('#stageMeta').textContent = `${s.groupName.toUpperCase()} · ${s.name.toUpperCase()}`;
    $('#stageTitle').textContent = s.title;
    $('#stageProblem').textContent = s.problem;
    $('#stageOutcome').textContent = s.outcome;
    const list = $('#stageItems');
    list.innerHTML = '';
    s.items.forEach(([t, d], j) => list.appendChild(el('div', { class: 'item' }, `<div class="item__n">${pad(j)}</div><div><strong>${t}</strong><span>${d}</span></div>`)));
  }
  selectStage(3);

  /* ---------- Speed-to-lead simulator ---------- */
  const steps = [
    ['Enquiry submitted', 'Sarah asks about a remortgage on your website at 9:42pm.', '00:00'],
    ['Instant reply sent', '“Hi Sarah, thanks for getting in touch. Here’s what happens next…”', '00:08'],
    ['Added to your CRM', 'Contact details, enquiry and source logged automatically.', '00:09'],
    ['Key details captured', 'A short follow-up gathers what your adviser needs to know.', '00:40'],
    ['Appointment booked', 'A call with your adviser appears in the diary. Nobody lifted a finger.', '00:58']
  ];
  const simList = $('#simSteps');
  const stepEls = steps.map(([t, d, time]) => {
    const li = el('li', { class: 'sim__step' }, `<div class="sim__rail"><div class="sim__dot"></div><div class="sim__line"></div></div><div class="sim__body"><div class="sim__row"><span>${t}</span><span>${time}</span></div><p>${d}</p></div>`);
    simList.appendChild(li);
    return li;
  });
  let simTimer = null;
  function setSim(step) {
    stepEls.forEach((li, i) => { li.classList.toggle('is-done', i <= step); li.classList.toggle('is-passed', i < step); });
    $('#simClock').textContent = steps[Math.max(0, step)][2];
  }
  setSim(4);
  const simBtn = $('#simBtn');
  simBtn.addEventListener('click', () => {
    clearInterval(simTimer);
    let step = 0; setSim(0);
    simBtn.querySelector('span').textContent = 'Lead coming in…';
    simTimer = setInterval(() => {
      step += 1; setSim(step);
      if (step >= steps.length - 1) { clearInterval(simTimer); simBtn.querySelector('span').textContent = 'Simulate a new lead'; }
    }, 900);
  });

  /* ---------- Cost of standing still calculator ---------- */
  const lostIn = $('#lost'), valueIn = $('#value'), hoursIn = $('#hours'), rateIn = $('#rate');
  function updateCalc() {
    const lost = Number(lostIn.value), val = Number(valueIn.value), h = Number(hoursIn.value), r = Number(rateIn.value);
    const lostYear = lost * val * 12, adminYear = h * r * 48, total = lostYear + adminYear;
    $('#lostOut').textContent = lost;
    $('#valueOut').textContent = `£${fmt(val)}`;
    $('#hoursOut').textContent = `${h} hrs`;
    $('#rateOut').textContent = `£${r}`;
    $('#yearly').textContent = `£${fmt(total)}`;
    $('#lostYear').textContent = `£${fmt(lostYear)}`;
    $('#adminYear').textContent = `£${fmt(adminYear)}`;
    $('#halfValue').textContent = `£${fmt(total / 2)} a year`;
    $('#hoursFreed').textContent = `back in your firm, plus ${fmt(h * 48 / 2)} hours of your team's time freed up for clients. Without hiring anyone.`;
  }
  [lostIn, valueIn, hoursIn, rateIn].forEach((n) => n.addEventListener('input', updateCalc));
  updateCalc();

  /* ---------- Comparison table ---------- */
  const compare = [
    ['How you pay', 'Big retainers and scopes that keep growing', 'Scoped around the outcome you actually need'],
    ['Speed', 'Months of meetings before anything goes live', 'Modern AI tooling means we build fast'],
    ['Focus', 'Marketing activity and monthly reports', 'More clients, and the capacity to serve them'],
    ['Who does the work', 'Passed down to junior teams', 'Founder-led, from first call to launch'],
    ['After launch', 'Another invoice and another report', 'Systems that keep working in the background']
  ];
  const cross = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A3A3AD" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const tick = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6E01FC" stroke-width="2.6" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';
  const body = $('#compareBody');
  compare.forEach(([k, a, z]) => body.appendChild(el('tr', {}, `<td>${k}</td><td><div class="cell">${cross}<span>${a}</span></div></td><td><div class="cell">${tick}<span>${z}</span></div></td>`)));

  /* ---------- FAQ accordion ---------- */
  const faqs = [
    ['Who do you work with?', 'Owner-led professional services firms, including mortgage brokers, financial planners, accountants, conveyancers, estate agents and recruiters, where growth is limited by time rather than ambition.'],
    ['Will AI replace my team?', 'No. It takes the repetitive work off their plate so they can spend more time with clients. Anything that goes to a client is checked and signed off by your team.'],
    ['Is it safe to use AI with client information?', "Yes, when it's set up properly, which is exactly what we do. We only connect platforms that meet recognised data protection standards, and we only give each workflow access to the data it actually needs, never your whole client database. Client information is never used to train public AI models, and everything stays hosted in reputable, access-controlled systems. Anything client-facing is checked and signed off by your team before it goes out, so a person is always accountable for what's sent. We'll map out exactly what data moves where as part of your free discovery call, and you keep full control over what gets connected."],
    ['Can you work with our CRM or case management system?', 'Usually, yes. We start with the systems you already use and only recommend something new when it will clearly save time or win more business.'],
    ['Do I need to be technical?', 'Not at all. We handle the setup, the connections and the testing, and explain everything in plain English.'],
    ['What does it cost?', "Every project is scoped after your free discovery call, so you only pay for what will actually make a difference to your firm, not a fixed package that may not fit."]
  ];
  const faqWrap = $('#faqs');
  const faqEls = faqs.map(([q, a], i) => {
    const item = el('div', { class: 'faq' });
    const btn = el('button', { type: 'button', 'aria-expanded': 'false', 'aria-controls': `faq-a-${i}`, id: `faq-q-${i}` },
      `<span>${q}</span><span class="faq__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span>`);
    const ans = el('div', { class: 'faq__a', id: `faq-a-${i}`, role: 'region', 'aria-labelledby': `faq-q-${i}` }, a);
    ans.hidden = true;
    btn.addEventListener('click', () => toggleFaq(i));
    item.append(btn, ans);
    faqWrap.appendChild(item);
    return { item, btn, ans };
  });
  function toggleFaq(i) {
    faqEls.forEach((f, j) => {
      const open = j === i ? f.ans.hidden : false;
      f.ans.hidden = !open;
      f.btn.setAttribute('aria-expanded', String(open));
      f.item.classList.toggle('is-open', open);
    });
  }
  toggleFaq(0);

  /* ---------- Booking tabs: enquiry form vs. direct calendar booking ---------- */
  const tabEnquiry = $('#tabEnquiry'), tabCalendar = $('#tabCalendar');
  const formPane = $('#formPane'), calendarPane = $('#calendarPane');
  const bookingIframe = $('.booking-iframe', calendarPane);
  function selectBookingTab(showCalendar) {
    tabEnquiry.setAttribute('aria-selected', String(!showCalendar));
    tabCalendar.setAttribute('aria-selected', String(showCalendar));
    formPane.hidden = showCalendar;
    calendarPane.hidden = !showCalendar;
    if (showCalendar && !bookingIframe.src && bookingIframe.dataset.src) {
      bookingIframe.src = bookingIframe.dataset.src;
    }
  }
  tabEnquiry.addEventListener('click', () => selectBookingTab(false));
  tabCalendar.addEventListener('click', () => selectBookingTab(true));

  /* ---------- Audit form ----------
     Submits to Web3Forms (https://web3forms.com/) with the access key already set
     in index.html. */
  const form = $('#auditForm'), done = $('#formDone'), err = $('#formError');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.textContent;
  const validityMessage = err.textContent;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { err.textContent = validityMessage; err.hidden = false; form.querySelector(':invalid').focus(); return; }
    err.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Submission failed');
      form.hidden = true; done.hidden = false; done.querySelector('h3').setAttribute('tabindex', '-1'); done.querySelector('h3').focus();
    } catch (networkErr) {
      err.textContent = "Something went wrong sending that. Please try again, or email us directly at jen@zella-studios.com.";
      err.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });
  $('#resetForm').addEventListener('click', () => { form.reset(); done.hidden = true; form.hidden = false; $('#fname').focus(); });

  /* ---------- Cookie / GDPR banner ----------
     TODO: if you add GA4 / Meta Pixel (see AGENTS.md), only load them after
     "Accept all" — check localStorage.getItem('zella-cookie-consent') === 'all'
     before injecting any tracking script. */
  const cookieBanner = $('#cookieBanner');
  let consent = null;
  try { consent = localStorage.getItem('zella-cookie-consent'); } catch (e) { /* storage unavailable */ }
  if (!consent) cookieBanner.hidden = false;
  function setConsent(value) {
    try { localStorage.setItem('zella-cookie-consent', value); } catch (e) { /* storage unavailable */ }
    cookieBanner.hidden = true;
  }
  $('#cookieAccept').addEventListener('click', () => setConsent('all'));
  $('#cookieDecline').addEventListener('click', () => setConsent('essential'));

  $('#year').textContent = new Date().getFullYear();
})();
