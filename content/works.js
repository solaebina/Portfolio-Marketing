/* ============================================================================
   THE WORK

   One file. Edit it, save, refresh — there is no build step.

   Each entry becomes a row on the index page and its own page at
   case.html?id=<id>.

   ── fields ──────────────────────────────────────────────────────────────────
   id          lowercase, dashes. Becomes the web address.
   discipline  'data' | 'strategy' | 'social'
   title       the headline of the case
   thesis      ONE sentence. The whole case in a line. This is the hardest
               field to write and the one people actually read.
   client / role / year / team / timeline   the meta rail
   thumb       the image that previews the row
   hero        wide image under the title
   tags        short strings
   draft       true = hidden from the site
   external    a URL — the row links straight out, no case page is made
   sections    the case itself, below

   ── how a case is written ───────────────────────────────────────────────────
   Every case runs the same five beats, in this order. Keep the shape and new
   ones slot straight in.

     Context     where we were standing. Two short paragraphs at most.
     Problem     the sharp version. One paragraph. No solution in it yet.
     Approach    what I actually did, as numbered moves.
     Outcome     the numbers, then an honest read of what they mean.
     Reflection  what I'd carry forward, or do differently. Say a true thing.

   A sixth, 'Under the hood', is optional and only for cases where the
   machinery is the interesting part.

   ── block types ─────────────────────────────────────────────────────────────
   { type: 'text',  value: 'A paragraph.\n\nBlank line starts a new one.
                            **bold**, *italic*, [link](https://example.com)' }
   { type: 'steps', items: ['First move', 'Second move'] }
   { type: 'list',  items: ['A point', 'Another point'] }
   { type: 'stats', items: [{ value: '+38%', label: 'Retention at 90 days' }] }
   { type: 'image', src: 'images/work/x.webp', caption: 'Optional' }
   { type: 'note',  value: 'An aside, set apart from the argument.' }
   { type: 'quote', value: 'What they said.', cite: 'Name, Title' }
   ============================================================================ */

window.PORTFOLIO = {

  profile: {
    name:  'Sola Ebina',
    role:  'Marketing & Data',
    email: 'solaebina@gmail.com',
    linkedin: 'https://www.linkedin.com/in/solaebina/',
    location: 'Tokyo',
    available: true,
  },

  disciplines: {
    strategy: {
      label: 'Marketing Strategy',
      short: 'Strategy',
      line:  'Positioning, audience, channel mix, budget. The plan that turns a year of scattered work into one direction.',
      skills: ['Positioning', 'GTM Planning', 'Audience Research', 'Campaign Architecture', 'Budget & Forecasting', 'Brand Messaging'],
    },
    data: {
      label: 'Data, Analytics & AI',
      short: 'Data & AI',
      line:  'Models, dashboards and attribution — and the part that matters, which is saying out loud what the numbers mean and what to do about it.',
      skills: ['Dashboards', 'SQL', 'Attribution', 'A/B Testing', 'Forecasting', 'AI Tooling', 'Automation'],
    },
    social: {
      label: 'Social Media Marketing',
      short: 'Social',
      line:  'Community, calendars, creators, paid — and the slow craft of being worth following in the first place.',
      skills: ['Content Calendars', 'Community', 'Paid Social', 'Creator Partnerships', 'Social Listening', 'Copywriting'],
    },
  },

  works: [

    /* ──────────────────────────────────────────────────────────────────────
       DATA, ANALYTICS & AI
       ────────────────────────────────────────────────────────────────────── */

    {
      id: 'insurance-fraud-detection',
      discipline: 'data',
      title: 'Finding the claims worth investigating',
      thesis: 'An insurer was picking fraud investigations by instinct, so I built a model that scores every claim on arrival and puts the likely ones first.',
      client: 'AutoSecure Insurance',
      role: 'Data analysis, modelling',
      year: '2022',
      timeline: '6 weeks',
      thumb: 'images/work/art-insurance-fraud-detection.webp',
      hero: 'images/work/fraud-pipeline.webp',
      tags: ['Machine Learning', 'Python', 'Fraud', 'Risk'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "AutoSecure handles more than 50,000 car insurance claims a year. Its fraud rate was running about three percent above the industry norm, and every claim was reviewed by a person.\n\nAt that volume, deciding which claims to look at *closely* came down to instinct. Nobody had designed it that way. It was just what happens when the work outgrows the team." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "Instinct costs twice over. Fraudulent claims get paid because nobody had time to check them, and investigators spend hours on honest claims that were never going to be a problem. What the team needed wasn't more reviewers — it was a way to know where to look first." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: "I started with 20,000 past claims, each carrying 25 pieces of information: the customer, the vehicle, the circumstances of the incident, the size of the claim. Real claims data is messy, so a good share of the work was unglamorous. Then I tested four approaches against each other rather than betting on one, and let the results pick the winner." },
            { type: 'steps', items: [
              'Cleaned and pared back 20,000 historical claims into something a model could learn from',
              'Trained and compared four approaches, testing each ten separate ways so a lucky split couldn\'t flatter the result',
              'Deliberately tuned the winner to err towards flagging — a missed fraud costs far more than a second look at an honest claim',
              'Packaged it to score a claim the instant it is submitted, rather than in an overnight batch',
            ]},
            { type: 'image', src: 'images/work/fraud-model.webp', caption: 'Choosing where to draw the line. Catching more fraud always means flagging more honest claims, so the real question is what that trade is worth.' },
            { type: 'text', value: 'The best performer caught **92% of the fraud** in data it had never seen. It also showed which signals were doing the work: the size of the expected payout, how often that customer had claimed before, and the value of the vehicle.' },
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '70%', label: 'Better than picking claims at random' },
              { value: '92%', label: 'Of fraudulent claims caught' },
              { value: '0.07s', label: 'To score a single claim' },
              { value: '$5.9M', label: 'Projected annual saving' },
            ]},
            { type: 'text', value: "Against the old approach — investigators choosing more or less at random — the model is about four times better at putting a genuine fraud in front of someone. Modelled across a full year of claims, that comes to roughly $5.9 million in payouts avoided." },
            { type: 'note', value: "Worth being straight about that number: it's a projection from historical data, not money already saved. The recommendation I actually made was smaller and more concrete — around 2,000 targeted investigations a year is the point where the returns stop justifying the effort." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The modelling was the easy half. The half that decided whether this was ever used was the threshold conversation — how many honest customers the business was willing to inconvenience to catch one more fraud. That is not a technical question, and handing it over as one would have been a way of avoiding it.\n\nSo I brought the trade-off curve to the table instead of a single number, and let the people who own the risk pick the point on it." },
          ],
        },
        {
          title: 'Under the hood',
          blocks: [
            { type: 'list', items: [
              'Random Forest, chosen over Gradient Boosting, Decision Trees and Logistic Regression',
              'Optimised for F2 rather than accuracy, to weight recall above precision',
              '10-fold cross-validation; F2 of 0.948 on held-out data',
              'Python, scikit-learn, pandas',
            ]},
          ],
        },
      ],
    },

    {
      id: 'student-feedback-sentiment',
      discipline: 'data',
      title: 'Reading 4,500 student reviews without reading them',
      thesis: 'A university had more course feedback than anyone could get through, so I built a model that sorts it in seconds — and was honest about the third of it the model should never touch.',
      client: "Queen's University",
      role: 'Data analysis, modelling',
      year: '2025',
      timeline: '5 weeks',
      thumb: 'images/work/art-student-feedback-sentiment.webp',
      hero: 'images/work/sentiment-tool.webp',
      tags: ['NLP', 'Sentiment Analysis', 'AWS', 'Education'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "Every semester students write thousands of reviews of their courses and teaching. The university genuinely wanted to act on them — but somebody has to read all of it first, and by the time that happens the semester it describes is over." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "So the feedback piled up. Not because nobody cared, but because reading it was a full-time job nobody had. Decisions that should have been shaped by what students actually said were being made without it." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: "I trained a model on 4,500 real reviews to sort them into positive, negative and neutral. The interesting part wasn't the model — it was being honest about where it could and couldn't be trusted." },
            { type: 'steps', items: [
              'Cleaned and normalised 4,500 reviews, then hand-checked a sample to make sure the labels were sound',
              'Trained a text classifier and tested it on reviews it had never seen',
              'Measured it separately for positive, negative and neutral rather than reporting one flattering average',
              'Wrapped it in a simple tool, so someone non-technical can paste in text and see the result',
            ]},
            { type: 'image', src: 'images/work/sentiment-results.webp', caption: 'Performance broken out by category — strong on clearly positive and clearly negative reviews, weak on the ones that sit in between.' },
            { type: 'text', value: "It reads strong opinions well and struggles with lukewarm ones. On clearly positive and clearly negative reviews it's reliable; on neutral ones it's close to a coin toss.\n\nRather than bury that, I made it the main recommendation. Let the model handle the two ends of the scale, and send anything it's unsure about to a person. That keeps most of the time saved while stopping the university from acting on a misread." },
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '78%', label: 'Overall accuracy' },
              { value: '50%', label: 'Less time spent processing feedback' },
              { value: '~$5k', label: 'Staff time saved per two semesters' },
              { value: '~$81', label: 'Monthly running cost' },
            ]},
            { type: 'text', value: "Feedback that used to sit in a queue can be triaged the week it arrives, and the clear negatives — the ones worth acting on fastest — surface immediately instead of after the semester ends." },
            { type: 'note', value: "It pays for itself slowly rather than dramatically: about a 28% first-year return, with true break-even a few years out. The argument for it was never really the money. It's that the feedback finally gets used." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The 44% score on neutral reviews was the most useful result in the project, and it would have been easy to leave out. A single headline accuracy figure would have looked better and been worse — it would have sent the university off acting on a category the model can't read.\n\nI'd rather ship something with a stated edge than something that quietly has one." },
          ],
        },
        {
          title: 'Under the hood',
          blocks: [
            { type: 'list', items: [
              'AWS SageMaker with the BlazingText algorithm',
              'F1 of 82% on positive reviews, 80% on negative, 44% on neutral',
              "Validated with Cohen's Kappa, not accuracy alone",
              'Deployed as a live endpoint for real-time classification',
            ]},
          ],
        },
      ],
    },

    {
      id: 'sleep-data-for-doctors',
      discipline: 'data',
      title: "A friend's sleep data, made readable",
      thesis: 'Months of watch data sat unusable in a file nobody could open, so I turned it into one chart a sleep doctor could read in an appointment.',
      client: 'Personal project',
      role: 'Built it end to end',
      year: '2026',
      timeline: 'A weekend',
      thumb: 'images/work/art-sleep-data-for-doctors.webp',
      hero: 'images/work/sleep-chart.webp',
      tags: ['Python', 'Data Visualisation', 'Health'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "A friend was being treated for a sleep disorder. Their watch had been recording every night for months — exactly the evidence their doctor needed — but Apple Health exports it as one enormous file that no ordinary person can open, let alone bring to an appointment." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "So the appointments ran on memory. *I think I've been waking up more.* Which is a poor substitute for months of recorded data sitting on a phone." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: 'I wrote a small tool that reads the export and draws it: one row per night, colour-coded through the stages of sleep, so weeks of nights sit side by side on a single page.' },
            { type: 'steps', items: [
              'Parses the full Apple Health export, which is far too large to open by hand',
              'Pulls out the sleep records and separates deep, core, REM and awake',
              'Draws every night as one row, so patterns across weeks are visible at a glance',
              'Exports at print resolution, to be handed over in an appointment',
            ]},
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'text', value: "The doctor could see the pattern straight away — the fragmentation, which nights broke up and roughly when. It replaced a vague description with something specific to point at." },
            { type: 'note', value: "There are no percentages on this one, and it is the smallest thing here. It is also the one I'd point to first." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The data already existed and was already useful. The only thing standing between it and a better appointment was that nobody could see it.\n\nThat gap — between data being collected and data being legible — is most of what I do, and it almost never needs a model to close." },
          ],
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────────────────
       MARKETING STRATEGY
       ────────────────────────────────────────────────────────────────────── */

    {
      id: 'hotel-guest-segmentation',
      discipline: 'strategy',
      title: 'Grouping guests so the marketing stops going to everyone',
      thesis: 'A hotel was sending one offer to every guest, so I grouped 119,000 bookings by how people actually book — and stopped it discounting to people who were coming anyway.',
      client: 'Hospitality client',
      role: 'Segmentation and strategy',
      year: '2025',
      timeline: '8 weeks',
      thumb: 'images/work/art-hotel-guest-segmentation.webp',
      hero: 'images/work/hotel-clusters.webp',
      tags: ['Segmentation', 'Marketing Strategy', 'AWS', 'Hospitality'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "The hotel grouped its guests the way most places do — by hunch, and by categories that had been there for years. Business or leisure. Domestic or overseas. Fine for a rough plan, not something you can build a campaign on." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "So everyone got broadly the same offers. Guests who book eleven months ahead and guests who book the night before were treated as the same person, and the promotions meant to fill quiet periods were going to people who were coming anyway." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: "Instead of deciding the groups in advance, I let the booking data suggest them. I took 119,000 bookings and looked only at behaviour: how far ahead people book, what they pay a night, how long they stay, how much they ask for.\n\nThe method finds natural clusters without being told what to look for, which matters — it surfaces the groups that are really there rather than confirming the ones you already assumed." },
            { type: 'steps', items: [
              'Cleaned 119,000 bookings, removing extreme rates and incomplete records',
              'Clustered guests on booking behaviour rather than demographics',
              'Tested how many distinct groups the data actually supports, instead of picking a number that felt right',
              'Built a small tool that places a new booking into its group as it comes in',
            ]},
            { type: 'image', src: 'images/work/hotel-tool.webp', caption: 'The working tool: enter a booking, get the guest type and what to do about it.' },
            { type: 'text', value: 'The value is less in the clustering than in what it lets you say afterwards. Once "books far ahead, stays a while, asks for little" is a group with a name, you can write an offer for it — and stop sending that offer to everyone else.' },
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '+20%', label: 'Projected off-peak occupancy' },
              { value: '+30%', label: 'Projected marketing ROI' },
              { value: '−15%', label: 'Projected marketing spend' },
              { value: '3.1 mo', label: 'Modelled payback period' },
            ]},
            { type: 'text', value: "Modelled over a year, the case comes out at roughly $124,800 of return against $32,500 to build and run — most of it from filling quiet periods, the rest from better-targeted packages and less money spent reaching people who were never the audience." },
            { type: 'note', value: "Straight about the maths: those figures model a small property at around 50% baseline occupancy, and they're projections rather than booked revenue." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The durable part isn't the four clusters. Booking behaviour will drift and the groups will need redrawing.\n\nThe durable part is the mechanism: you stop paying to reach everyone, and the discounts go to the guests who actually need one to show up. That holds even after the numbers move." },
          ],
        },
        {
          title: 'Under the hood',
          blocks: [
            { type: 'list', items: [
              'K-Means clustering on AWS SageMaker',
              'Cluster count chosen using both the Elbow and Silhouette methods',
              'Hyperparameters tuned automatically against mean squared distance',
              'Deployed as a live endpoint for real-time classification',
            ]},
          ],
        },
      ],
    },

    {
      id: 'restaurant-satisfaction-drivers',
      discipline: 'strategy',
      title: 'What actually makes a restaurant’s customers happy',
      thesis: 'A restaurant knew its ratings mattered but not what moved them, so I modelled which parts of the evening change a satisfaction score — and by how much.',
      client: 'Wooden Heads, Kingston',
      role: 'Analysis and recommendations',
      year: '2025',
      timeline: '6 weeks',
      thumb: 'images/work/art-restaurant-satisfaction-drivers.webp',
      hero: 'images/work/restaurant-tool.webp',
      tags: ['Customer Experience', 'Predictive Modelling', 'AWS', 'Hospitality'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "Wooden Heads is an independent restaurant in a competitive part of downtown Kingston, in a market where a run of bad reviews does real damage. They knew satisfaction mattered. What they didn't know was which parts of the evening actually moved it." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "Without that, improvement is guesswork — and expensive guesswork, because the obvious lever is always to put more staff on. It's entirely possible to spend money fixing something that was never bothering anyone." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: 'I modelled satisfaction scores against everything known about a visit — waiting time, service rating, spend, group size, time of day, the occasion people were there for — to separate the factors that genuinely predict a good night from the ones that just come along for the ride.' },
            { type: 'steps', items: [
              'Cleaned the customer dataset and prepared it for modelling',
              'Tested which visit factors actually predict a satisfaction score',
              'Ran what-if scenarios: if the wait dropped by five minutes, what happens to the score?',
              'Turned it into a tool staff can use — enter a visit, get a predicted score',
            ]},
            { type: 'image', src: 'images/work/restaurant-analysis.webp', caption: 'Testing which factors hold up as predictors, and which only look important until you check.' },
            { type: 'text', value: "The point of the what-if scenarios was to make the trade-offs arguable. Instead of *service could be better*, the conversation becomes *this change moves the score this much, and costs this much* — which is something a small business can actually decide from." },
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '100%', label: 'Projected first-year ROI' },
              { value: '4–5 mo', label: 'Modelled break-even' },
              { value: '+2%', label: 'Projected repeat visits' },
              { value: '−3%', label: 'Projected service recovery costs' },
            ]},
            { type: 'text', value: "The gains here are small percentages, and that's the honest shape of it: a 2% lift in repeat visits and a 2% larger average check, which on this restaurant's numbers models out at roughly $20,000 a year against about $9,000 to build and $130 a month to run." },
            { type: 'text', value: "The more useful shift is from reactive to proactive. Instead of learning a table had a bad night from a review a week later, the conditions that produce a bad night are known in advance and can be headed off." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "Small percentages are a hard sell, and the temptation is to dress them up. But a two-percent lift on a real restaurant's numbers is a real amount of money, and saying so plainly is what made the recommendation credible to an owner who has heard a lot of pitches.\n\nThe modelling told them where not to spend, which was worth more than where to." },
          ],
        },
        {
          title: 'Under the hood',
          blocks: [
            { type: 'list', items: [
              'AWS SageMaker Linear Learner, evaluated on MSE, MAE and R²',
              '80/20 train-validation split with one-hot encoded categoricals',
              'Deployed as a live endpoint behind a simple prediction interface',
            ]},
          ],
        },
      ],
    },

    {
      id: 'pitch-research-share-of-voice',
      discipline: 'strategy',
      title: 'Finding the conversation nobody had claimed',
      thesis: 'Two prospects wanted to know where they really stood, and share-of-voice audits turned an assumed catch-up problem into a first-mover opening in both cases.',
      client: 'New business pitches',
      role: 'Research, competitive intelligence',
      year: '2025',
      timeline: '3 weeks each',
      thumb: 'images/work/art-pitch-research-share-of-voice.webp',
      hero: '',
      tags: ['Research', 'Competitive Intelligence', 'New Business'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "Prospective clients don't come into a pitch knowing where they actually stand — only where they think they stand.\n\nFor a global electronics manufacturer weighing its media presence in Japan, and separately for a global sustainability ratings platform sizing up its social footprint, the brief was the same: show us the real landscape before we commit to a strategy." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "Both had a story about their own position, and neither had checked it. Strategy built on an unchecked story is expensive to unwind a year later — and in a pitch, an unchecked story is also the fastest way to lose the room to whoever brought evidence." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: 'We ran share-of-voice and platform audits to replace assumption with evidence.' },
            { type: 'steps', items: [
              'Tracked monthly mentions across six competitors over six months',
              'Mapped every competitor account, platform by platform, local and global',
              "Sized each platform's real local audience behaviour, not its global headline number",
              'Ran the same method at smaller scale for the sustainability platform',
            ]},
            { type: 'text', value: "The manufacturer held **under 5% share of voice** while two rivals controlled **88%** of the conversation — and its own coverage was almost entirely earnings-driven, clustering around quarterly results rather than a story anyone was telling on purpose.\n\nThe platform sizing mattered as much as the share: Facebook's professional-skewing 25.7M monthly actives, LinkedIn's roughly 5M niche-but-credible reach, X's younger and faster-moving 66–71M base. That is what turned *there is a gap* into *here is exactly which channel it lives in*.\n\nFor the sustainability platform, the same method at smaller scale: a 256-follower LinkedIn page with strong but under-distributed content, set against a competitor whose CEO alone carried more than 10,000 followers across three platforms and posted in Japanese regularly." },
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'list', items: [
              '**A first-mover opportunity, not a catch-up plan.** Almost no competitor ran a properly localised social account — the market was underserved, not saturated',
              '**A named content gap.** Coverage existed, but it was reactive rather than owned narrative — a story competitors had not claimed and could still be told first',
              '**A platform-matched channel strategy**, recommending exactly where to invest and where to skip, down to channels to avoid entirely',
              '**An executive-voice gap**, a lever competitors were already using and the prospect was not',
            ]},
            { type: 'text', value: "In both cases the research didn't just inform the pitch — it became the pitch: the clearest way to show a prospect the size of the opportunity they were sitting on, and why now was the moment to move." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The finding that changed the strategy was a negative one: the absence of localised competitor accounts. Nobody briefs you to go looking for what isn't there, and it doesn't show up in a mentions count — you only see it by mapping every account by hand and noticing the column that stays empty.\n\nThat's the argument for doing the unglamorous audit properly rather than buying a dashboard." },
          ],
        },
      ],
    },

    /* ──────────────────────────────────────────────────────────────────────
       SOCIAL MEDIA
       ────────────────────────────────────────────────────────────────────── */

    {
      id: 'employer-branding-linkedin',
      discipline: 'social',
      title: 'A recruiting engine from a standing start',
      thesis: 'A semiconductor firm staffing new fabs had a LinkedIn page with no followers and no story, so we built a full-funnel content system out of real employee voices instead of recruiting copy.',
      client: 'Semiconductor manufacturer, Kumamoto',
      role: 'Employer branding, social',
      year: '2026',
      timeline: '5 months',
      thumb: 'images/work/art-employer-branding-linkedin.webp',
      hero: '',
      tags: ['Employer Branding', 'Social', 'Recruitment'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: "Our client needed to recruit fresh graduates and mid-career engineers in a market where every global chipmaker is chasing the same narrow pool of technical talent.\n\nIts LinkedIn presence in Japan had only just launched: no followers, no brand equity, and no benchmark for what good would even look like." },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "Worse than the empty channel, the employer itself was faceless. Candidates had no way to picture what a day in the job actually felt like, and there was no structured path from first awareness to a completed application." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: 'We built a full-funnel content system around real employee narratives rather than generic recruiting copy.' },
            { type: 'steps', items: [
              'A Care → Consider → Choose framework mapping each stage of the candidate journey to its own content and channels',
              'Social and paid media to attract attention at the top',
              'Deeper social and website content to build understanding in the middle',
              'Campus events paired with employee stories to drive the application itself',
              'Four Workplace Narrative Pillars — People, Career, Rewards, Business — to hold the story together as volume scaled',
            ]},
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '30', label: 'Posts ideated and crafted' },
              { value: '16.8%', label: 'Average engagement rate' },
              { value: '+2,250', label: 'Followers from a standing start' },
              { value: '44.7%', label: 'Engagement on the best post' },
            ]},
            { type: 'text', value: "Across five months, from November 2025 to March 2026, 65% of everything published was employer-branding focused rather than job-listing filler.\n\nThe top performer was a real intern story from Kumamoto, at 44.71% engagement — the clearest evidence that authentic employee voices consistently outperform generic recruiting messaging." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "The pillars did more work than the posts. Four named territories meant thirty pieces of content could be commissioned by different people over five months and still add up to one story — which is the thing that usually breaks first when volume scales.\n\nWhat started as a single new channel became the company's best proof that recruiting content works when it is built from real people, not a job description." },
          ],
        },
      ],
    },

    {
      id: 'japan-market-entry',
      discipline: 'social',
      title: "A market's voice, built in three weeks",
      thesis: 'A crypto company needed a credible Japanese presence that did not yet exist, so we built the channels, cadence, narrative and compliance layer together rather than bolting them on.',
      client: 'Crypto company',
      role: 'PR, social, localisation',
      year: '2026',
      timeline: '3 weeks to launch',
      thumb: 'images/work/art-japan-market-entry.webp',
      hero: '',
      tags: ['PR', 'Social', 'Localization'],
      draft: false,
      external: '',
      sections: [
        {
          title: 'Context',
          blocks: [
            { type: 'text', value: 'Our client needed a presence in Japan that did not yet exist. There was no local account, no local voice, and no established rhythm for how the brand should sound outside its home market — just a mandate to enter the market credibly, quickly, and without missteps.' },
          ],
        },
        {
          title: 'Problem',
          blocks: [
            { type: 'text', value: "Speed and accuracy pull against each other in a regulated category. Move fast and translated headquarters copy reads as an import, or worse, says something legal can't stand behind. Move carefully and the launch window closes." },
          ],
        },
        {
          title: 'Approach',
          blocks: [
            { type: 'text', value: 'We built the programme from the ground up, with the governance in the design rather than added afterwards.' },
            { type: 'steps', items: [
              'A Japan-facing X account and a LinkedIn Japan channel',
              'A cadence of 4–6 posts a week plus two long-form pieces a month',
              'Transcreation rather than straight translation, so headquarters-originated content reads as native Japanese thinking instead of an import',
              'A narrative track for Japan-specific messaging, alongside the always-on content',
              'Two to three ongoing editorial and KOL relationships, cultivated from the start',
              'A compliance layer — weekly standups and legal review on every public post — so speed never cost accuracy',
            ]},
          ],
        },
        {
          title: 'Outcome',
          blocks: [
            { type: 'stats', items: [
              { value: '584K+', label: 'Impressions in three weeks' },
              { value: '7,573', label: 'Total engagements' },
              { value: '3,695', label: 'New followers, almost no unfollows' },
              { value: '~27K', label: 'Daily impressions once settled' },
            ]},
            { type: 'text', value: "The channels launched on 12 July. A single day topped 250K impressions at launch, and the account then settled into a steady rhythm of roughly 27K daily impressions." },
            { type: 'note', value: "The settled number is the one that matters. It shows the early spike was the start of an audience rather than a one-off." },
          ],
        },
        {
          title: 'Reflection',
          blocks: [
            { type: 'text', value: "Putting legal review inside the weekly rhythm rather than at the end of it is what made three weeks possible. Treated as a gate, compliance is the thing that kills a launch date; treated as a standing meeting, it was just part of the cadence.\n\nWhat began as a social management request grew into a full local voice for the brand — content, narrative, relationships and governance, built in step with each other." },
          ],
        },
      ],
    },

  ],
};
