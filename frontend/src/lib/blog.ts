export type BlogLang = 'en' | 'fr';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type BlogPostTranslation = {
  title: string;
  description: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  translations: Record<BlogLang, BlogPostTranslation>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'bridging-the-learning-gap-in-mena',
    date: '2026-03-11',
    tags: ['MENA', 'L&D', 'Workforce', 'Corporate training'],
    coverImage: '/blog/cover-1.jpg',
    coverAlt: 'Globe on a desk',
    translations: {
      en: {
        title:
          'Bridging the Learning Gap in MENA: Why Adaptable Learning Is Now a Business Imperative',
        description:
          'The region has talent and momentum, but learning models must evolve: modular, adaptive, practical programs aligned with real economic needs.',
        blocks: [
          {
            type: 'p',
            text: 'Across the Middle East and North Africa, the conversation around education and professional development is evolving rapidly. The region holds one of the youngest and most dynamic populations globally, yet access to high-quality, relevant learning remains uneven.',
          },
          { type: 'p', text: 'The challenge is not a lack of talent. It is a lack of alignment.' },
          {
            type: 'p',
            text: 'Despite strong potential and pockets of excellence, the broader learning ecosystem still struggles to keep pace with the realities of modern economies and fast-changing industries.',
          },
          { type: 'h2', text: 'A Region Full of Talent, Yet Unevenly Equipped' },
          {
            type: 'p',
            text: 'The MENA region is rich in human potential. However, access to high-quality learning experiences remains inconsistent.',
          },
          {
            type: 'p',
            text: 'Many learners do not benefit from the same exposure, infrastructure, or adaptability found in more mature education systems. Traditional models, still widely used, often fail to reflect the real demands of today’s workplace.',
          },
          { type: 'p', text: 'This creates a gap — not in capability, but in opportunity.' },
          { type: 'h2', text: 'The Limits of Standardized Learning Models' },
          {
            type: 'p',
            text: 'For decades, standardized, one-size-fits-all programs have shaped education and training systems. While effective in the past, they are no longer suited to the current environment.',
          },
          { type: 'p', text: 'Today’s workforce must be:' },
          {
            type: 'ul',
            items: ['agile', 'digitally fluent', 'capable of continuous learning', 'equipped with both technical and human skills'],
          },
          {
            type: 'p',
            text: 'Yet many programs in the region still rely on outdated content, rigid structures, and limited practical application.',
          },
          {
            type: 'p',
            text: 'As a result, learners complete programs without necessarily being prepared for real-world challenges.',
          },
          { type: 'h2', text: 'A Growing Disconnect Between Learning and Economic Reality' },
          { type: 'p', text: 'At the same time, many MENA economies are undergoing major transformations.' },
          {
            type: 'p',
            text: 'From energy diversification to digitalization, entrepreneurship, and industrial development, the region is moving fast.',
          },
          { type: 'p', text: 'However, learning systems are not evolving at the same speed.' },
          { type: 'p', text: 'This creates a structural misalignment:' },
          {
            type: 'ul',
            items: [
              'companies struggle to find job-ready talent',
              'employees lack relevant, applicable skills',
              'economic growth is slowed by capability gaps',
            ],
          },
          { type: 'h2', text: 'The Shift Toward Fit-for-Purpose Learning' },
          { type: 'p', text: 'What the region needs is not more content, but better-designed learning.' },
          {
            type: 'p',
            text: 'Fit-for-purpose, adaptive, and modular development programs offer a more relevant alternative to traditional approaches.',
          },
          { type: 'p', text: 'These programs focus on:' },
          {
            type: 'ul',
            items: [
              'real business needs rather than generic curricula',
              'sector-specific skills (energy, tech, finance, healthcare, etc.)',
              'flexibility and accessibility',
              'practical application over theory',
            ],
          },
          { type: 'p', text: 'Learning becomes something that supports performance, not just completion.' },
          { type: 'h2', text: 'Why A-La-Carte and Modular Learning Matters' },
          {
            type: 'p',
            text: 'A-la-carte learning allows individuals and organizations to focus on what truly matters.',
          },
          { type: 'p', text: 'Instead of following long, rigid programs, learners can:' },
          {
            type: 'ul',
            items: ['acquire skills when they are needed', 'adapt learning paths to their roles', 'stay aligned with industry evolution'],
          },
          { type: 'p', text: 'This approach makes learning:' },
          { type: 'ul', items: ['faster', 'more relevant', 'more efficient', 'ultimately, more impactful'] },
          { type: 'h2', text: 'Learning & Development as a Business Driver' },
          {
            type: 'p',
            text: 'Organizations across MENA are increasingly recognizing that their competitive advantage lies in their people.',
          },
          { type: 'p', text: 'However, this requires a shift in mindset.' },
          { type: 'p', text: 'Training is no longer about certification. It is about capability.' },
          { type: 'p', text: 'Companies investing in targeted, adaptable development are already seeing:' },
          {
            type: 'ul',
            items: [
              'improved productivity',
              'stronger leadership pipelines',
              'higher employee engagement and retention',
              'faster adoption of new technologies',
              'better operational performance',
            ],
          },
          { type: 'p', text: 'In this context, learning becomes a strategic lever — not a support function.' },
          { type: 'h2', text: 'Toward a New Learning Architecture in MENA' },
          { type: 'p', text: 'To fully unlock its potential, the region must move from a static education model to a dynamic learning ecosystem.' },
          { type: 'p', text: 'The future of learning in MENA should be:' },
          {
            type: 'ul',
            items: [
              'Inclusive: accessible regardless of location or background',
              'Adaptive: evolving with industry needs',
              'Practical: grounded in real-world challenges',
              'Human-centric: developing leadership, resilience, and curiosity',
              'Digitally enabled: using technology to scale impact',
            ],
          },
          { type: 'h2', text: 'Conclusion' },
          { type: 'p', text: 'The MENA region has the talent, ambition, and momentum to transform its economies.' },
          { type: 'p', text: 'What is needed now is a learning model that matches that ambition.' },
          {
            type: 'p',
            text: 'As business leaders, educators, and innovators, the responsibility is clear: to design development programs that are relevant, flexible, and aligned with real economic needs.',
          },
          { type: 'p', text: 'Because in the end, the future of our economies will not be defined by resources — but by the people we develop.' },
        ],
      },
      fr: {
        title:
          "Réduire le Learning Gap au MENA : pourquoi l'apprentissage adaptable est devenu un impératif business",
        description:
          "La région regorge de talents, mais les modèles de formation doivent évoluer : des parcours modulaires, adaptatifs et pratiques, alignés sur la réalité économique.",
        blocks: [
          {
            type: 'p',
            text: "À travers le Moyen-Orient et l’Afrique du Nord, la conversation autour de l’éducation et du développement professionnel évolue rapidement. La région possède l’une des populations les plus jeunes et dynamiques au monde, mais l’accès à un apprentissage de qualité, pertinent et à jour reste inégal.",
          },
          { type: 'p', text: "Le défi n’est pas un manque de talent. C’est un manque d’alignement." },
          {
            type: 'p',
            text: "Malgré un fort potentiel et des pôles d’excellence, l’écosystème global de l’apprentissage peine encore à suivre le rythme des économies modernes et des industries en constante mutation.",
          },
          { type: 'h2', text: 'Une région pleine de talents, mais inégalement équipée' },
          {
            type: 'p',
            text: "La région MENA regorge de potentiel humain. Pourtant, l’accès à des expériences d’apprentissage de haute qualité reste inconstant.",
          },
          {
            type: 'p',
            text: "De nombreux apprenants ne bénéficient pas de la même exposition, des mêmes infrastructures ou de la même adaptabilité que dans des systèmes éducatifs plus matures. Les modèles traditionnels, encore largement utilisés, reflètent rarement les exigences réelles du monde du travail actuel.",
          },
          { type: 'p', text: "Cela crée un écart — non pas de capacité, mais d’opportunité." },
          { type: 'h2', text: 'Les limites des modèles standardisés' },
          {
            type: 'p',
            text: "Pendant des décennies, des programmes standardisés « one-size-fits-all » ont façonné les systèmes d’éducation et de formation. Efficaces hier, ils ne sont plus adaptés à l’environnement actuel.",
          },
          { type: 'p', text: "Aujourd’hui, la main-d’œuvre doit être :" },
          {
            type: 'ul',
            items: [
              'agile',
              'à l’aise avec le digital',
              'capable d’apprendre en continu',
              'dotée à la fois de compétences techniques et humaines',
            ],
          },
          {
            type: 'p',
            text: "Pourtant, de nombreux programmes dans la région reposent encore sur des contenus dépassés, des structures rigides et une application pratique limitée.",
          },
          {
            type: 'p',
            text: "Résultat : les apprenants terminent des parcours sans être réellement préparés aux défis du terrain.",
          },
          { type: 'h2', text: 'Un décalage croissant entre apprentissage et réalité économique' },
          { type: 'p', text: "Dans le même temps, de nombreuses économies MENA traversent des transformations majeures." },
          {
            type: 'p',
            text: "Diversification énergétique, digitalisation, entrepreneuriat, développement industriel… la région avance vite.",
          },
          { type: 'p', text: "Mais les systèmes d’apprentissage n’évoluent pas à la même vitesse." },
          { type: 'p', text: 'Cela crée un désalignement structurel :' },
          {
            type: 'ul',
            items: [
              'les entreprises peinent à recruter des talents « job-ready »',
              'les collaborateurs manquent de compétences applicables et pertinentes',
              'la croissance est ralentie par des écarts de capacités',
            ],
          },
          { type: 'h2', text: 'Vers un apprentissage « fit-for-purpose »' },
          { type: 'p', text: "Ce dont la région a besoin, ce n’est pas de plus de contenu, mais d’un apprentissage mieux conçu." },
          {
            type: 'p',
            text: "Des programmes adaptatifs, modulaires et « fit-for-purpose » offrent une alternative plus pertinente aux approches traditionnelles.",
          },
          { type: 'p', text: 'Ils se concentrent sur :' },
          {
            type: 'ul',
            items: [
              'les besoins business réels plutôt que des curricula génériques',
              'des compétences spécifiques par secteur (énergie, tech, finance, santé, etc.)',
              'la flexibilité et l’accessibilité',
              'la pratique plutôt que la théorie',
            ],
          },
          { type: 'p', text: "L’apprentissage devient un levier de performance, pas seulement un passage à valider." },
          { type: 'h2', text: 'Pourquoi le « à la carte » et le modulaire comptent' },
          { type: 'p', text: "L’apprentissage à la carte permet aux individus et aux organisations de se concentrer sur l’essentiel." },
          { type: 'p', text: 'Au lieu de suivre des programmes longs et rigides, les apprenants peuvent :' },
          {
            type: 'ul',
            items: [
              'acquérir des compétences au moment où elles sont nécessaires',
              'adapter les parcours à leurs rôles',
              'rester alignés avec l’évolution de leur industrie',
            ],
          },
          { type: 'p', text: 'Cette approche rend la formation :' },
          { type: 'ul', items: ['plus rapide', 'plus pertinente', 'plus efficiente', 'et au final, plus impactante'] },
          { type: 'h2', text: 'Le Learning & Development comme moteur business' },
          { type: 'p', text: "Partout dans la région, les organisations comprennent de plus en plus que leur avantage compétitif vient de leurs talents." },
          { type: 'p', text: "Mais cela suppose un changement d’état d’esprit." },
          { type: 'p', text: "La formation n’est plus une question de certification. C’est une question de capacité." },
          { type: 'p', text: 'Les entreprises qui investissent dans des parcours ciblés et adaptables observent déjà :' },
          {
            type: 'ul',
            items: [
              'une productivité améliorée',
              'des pipelines de leadership renforcés',
              'un engagement et une rétention plus élevés',
              'une adoption plus rapide des nouvelles technologies',
              'une meilleure performance opérationnelle',
            ],
          },
          { type: 'p', text: "Dans ce contexte, l’apprentissage devient un levier stratégique — pas une simple fonction support." },
          { type: 'h2', text: 'Vers une nouvelle architecture de l’apprentissage au MENA' },
          {
            type: 'p',
            text: "Pour libérer tout son potentiel, la région doit passer d’un modèle statique à un écosystème d’apprentissage dynamique.",
          },
          { type: 'p', text: "Le futur de l’apprentissage au MENA devrait être :" },
          {
            type: 'ul',
            items: [
              'Inclusif : accessible quel que soit le lieu ou le parcours',
              'Adaptatif : évoluant avec les besoins des industries',
              'Pratique : ancré dans des défis concrets',
              'Centré humain : développant leadership, résilience et curiosité',
              'Porté par le digital : utilisant la technologie pour scaler l’impact',
            ],
          },
          { type: 'h2', text: 'Conclusion' },
          { type: 'p', text: 'La région MENA a le talent, l’ambition et l’élan pour transformer ses économies.' },
          { type: 'p', text: "Ce qu’il faut maintenant, c’est un modèle d’apprentissage à la hauteur de cette ambition." },
          {
            type: 'p',
            text: "En tant que leaders business, éducateurs et innovateurs, la responsabilité est claire : concevoir des programmes pertinents, flexibles et alignés sur les besoins économiques réels.",
          },
          { type: 'p', text: "Car au final, l’avenir de nos économies ne sera pas défini par les ressources — mais par les personnes que nous développons." },
        ],
      },
    },
  },
  {
    slug: 'why-modern-learning-is-a-strategic-imperative',
    date: '2026-04-11',
    tags: ['Modern learning', 'Performance', 'L&D', 'Strategy'],
    coverImage: '/blog/cover-2.jpg',
    coverAlt: 'Team collaborating around a laptop',
    translations: {
      en: {
        title: 'Why Modern Learning Is a Strategic Imperative for High-Performance Organizations',
        description:
          'In a world of rapid change, modern learning becomes a strategic driver: faster capability building, higher relevance, measurable impact.',
        blocks: [
          {
            type: 'p',
            text: 'In today’s environment, where technologies, markets, and customer expectations evolve at unprecedented speed, organizations face a critical challenge: their ability to develop talent often lags behind the pace of change.',
          },
          {
            type: 'p',
            text: 'What increasingly differentiates high-performing organizations is not only what they know, but how fast they can learn, adapt, and build new capabilities.',
          },
          { type: 'p', text: 'Learning is no longer a support function. It is a strategic driver of performance.' },

          { type: 'h2', text: 'Why Traditional Training Models No Longer Work' },
          {
            type: 'p',
            text: 'Many organizations still rely on training approaches designed for a more stable and predictable world. These models tend to be linear, standardized, and disconnected from real operational needs.',
          },
          { type: 'p', text: 'In today’s context, this creates significant limitations.' },
          { type: 'p', text: 'Traditional training often results in:' },
          {
            type: 'ul',
            items: [
              'slow time-to-competency, delaying impact on the ground',
              'low knowledge retention and limited practical application',
              'weak alignment with evolving roles, technologies, and business priorities',
            ],
          },
          {
            type: 'p',
            text: 'As a result, organizations experience operational inefficiencies, increased costs, and growing talent gaps.',
          },

          { type: 'h2', text: 'The Shift Toward Modern Learning' },
          {
            type: 'p',
            text: 'Modern learning is not simply about moving content online. It is about fundamentally rethinking how capabilities are developed.',
          },
          { type: 'p', text: 'It focuses on three key dimensions:' },
          { type: 'ul', items: ['speed: enabling faster skill acquisition', 'relevance: aligning learning with real business needs', 'impact: ensuring knowledge is applied in practice'] },
          { type: 'p', text: 'Data increasingly supports this shift.' },
          { type: 'p', text: 'Organizations adopting modern learning approaches report:' },
          {
            type: 'ul',
            items: [
              'up to 50% faster time-to-competency',
              'up to 40% reduction in training delivery costs',
              'up to 45% increase in knowledge retention',
              'strong learner preference for flexible, digital formats',
            ],
          },
          { type: 'p', text: 'These results demonstrate that modern learning is not just more efficient — it is more effective.' },

          { type: 'h2', text: 'Learning as a Driver of Business Performance' },
          {
            type: 'p',
            text: 'Organizations that invest in adaptive and targeted learning approaches consistently outperform others.',
          },
          { type: 'p', text: 'The impact is visible across multiple dimensions:' },
          {
            type: 'ul',
            items: [
              'higher productivity and operational efficiency',
              'faster adoption of new technologies and processes',
              'stronger leadership development and internal mobility',
              'improved employee engagement and retention',
              'greater consistency in quality, safety, and execution',
            ],
          },
          {
            type: 'p',
            text: 'Learning, in this context, becomes a core business capability — directly linked to performance and growth.',
          },

          { type: 'h2', text: 'Building a Learning Architecture for Today’s Reality' },
          {
            type: 'p',
            text: 'High-performing organizations are moving away from isolated training initiatives toward integrated learning ecosystems.',
          },
          { type: 'p', text: 'These systems are:' },
          {
            type: 'ul',
            items: [
              'adaptive, evolving alongside business needs',
              'modular and on-demand, enabling just-in-time learning',
              'application-focused, grounded in real tasks and scenarios',
              'human-centric, supporting autonomy, motivation, and mastery',
              'digitally enabled, leveraging data, technology, and scalable platforms',
            ],
          },
          {
            type: 'p',
            text: 'This transformation shifts learning from a one-time intervention to a continuous process embedded in daily work.',
          },

          { type: 'h2', text: 'Conclusion' },
          {
            type: 'p',
            text: 'The organizations that will lead in the coming years are not necessarily those with the most resources, but those with the strongest ability to learn and adapt.',
          },
          { type: 'p', text: 'Modern learning enables companies to:' },
          { type: 'ul', items: ['move faster', 'reduce costs', 'strengthen capabilities at scale'] },
          {
            type: 'p',
            text: 'For organizations committed to building resilient, high-performance teams, investing in modern learning is no longer optional. It is a strategic decision that directly shapes future performance.',
          },
        ],
      },
      fr: {
        title:
          "Pourquoi l’apprentissage moderne est un impératif stratégique pour les organisations à haute performance",
        description:
          "Dans un monde qui change vite, l’apprentissage moderne devient un moteur stratégique : acquisition plus rapide, pertinence accrue, impact mesurable sur le terrain.",
        blocks: [
          {
            type: 'p',
            text: "Dans l’environnement actuel, où les technologies, les marchés et les attentes clients évoluent à une vitesse inédite, les organisations font face à un défi critique : leur capacité à développer les talents est souvent en retard par rapport au rythme du changement.",
          },
          {
            type: 'p',
            text: "Ce qui différencie de plus en plus les organisations les plus performantes, ce n’est pas seulement ce qu’elles savent, mais la vitesse à laquelle elles apprennent, s’adaptent et construisent de nouvelles capacités.",
          },
          { type: 'p', text: "L’apprentissage n’est plus une fonction support. C’est un driver stratégique de la performance." },

          { type: 'h2', text: 'Pourquoi les modèles de formation traditionnels ne fonctionnent plus' },
          {
            type: 'p',
            text: "Beaucoup d’organisations s’appuient encore sur des approches de formation conçues pour un monde plus stable et prévisible. Ces modèles sont souvent linéaires, standardisés, et déconnectés des besoins opérationnels réels.",
          },
          { type: 'p', text: "Dans le contexte actuel, cela crée des limites importantes." },
          { type: 'p', text: 'La formation traditionnelle entraîne souvent :' },
          {
            type: 'ul',
            items: [
              'un time-to-competency lent, qui retarde l’impact sur le terrain',
              'une faible rétention et une application pratique limitée',
              'un alignement faible avec l’évolution des rôles, technologies et priorités business',
            ],
          },
          { type: 'p', text: "Résultat : inefficacités opérationnelles, coûts en hausse et gaps de compétences qui se creusent." },

          { type: 'h2', text: "Le passage vers l’apprentissage moderne" },
          {
            type: 'p',
            text: "L’apprentissage moderne ne consiste pas simplement à mettre du contenu en ligne. Il s’agit de repenser en profondeur la manière dont les capacités sont développées.",
          },
          { type: 'p', text: 'Il repose sur trois dimensions clés :' },
          {
            type: 'ul',
            items: [
              'vitesse : accélérer l’acquisition de compétences',
              'pertinence : aligner la formation avec les besoins business réels',
              'impact : s’assurer que les connaissances sont appliquées en pratique',
            ],
          },
          { type: 'p', text: 'Les données confirment de plus en plus cette transition.' },
          { type: 'p', text: "Les organisations qui adoptent des approches modernes observent notamment :" },
          {
            type: 'ul',
            items: [
              'jusqu’à 50% de time-to-competency en moins',
              'jusqu’à 40% de réduction des coûts de délivrance',
              'jusqu’à 45% d’augmentation de la rétention',
              'une forte préférence des apprenants pour des formats flexibles et digitaux',
            ],
          },
          { type: 'p', text: "Ces résultats montrent que l’apprentissage moderne est non seulement plus efficient — mais aussi plus efficace." },

          { type: 'h2', text: 'L’apprentissage comme levier de performance business' },
          {
            type: 'p',
            text: "Les organisations qui investissent dans des parcours adaptatifs et ciblés surperforment plus souvent que les autres.",
          },
          { type: 'p', text: 'L’impact se voit à plusieurs niveaux :' },
          {
            type: 'ul',
            items: [
              'productivité et efficience opérationnelle plus élevées',
              'adoption plus rapide de nouvelles technologies et processus',
              'développement du leadership et mobilité interne renforcés',
              'engagement et rétention améliorés',
              'plus de constance en qualité, sécurité et exécution',
            ],
          },
          { type: 'p', text: "Dans ce contexte, l’apprentissage devient une capacité cœur, directement liée à la croissance et à la performance." },

          { type: 'h2', text: "Construire une architecture d’apprentissage adaptée à la réalité d’aujourd’hui" },
          {
            type: 'p',
            text: "Les organisations à haute performance s’éloignent des initiatives isolées pour construire des écosystèmes d’apprentissage intégrés.",
          },
          { type: 'p', text: 'Ces systèmes sont :' },
          {
            type: 'ul',
            items: [
              'adaptatifs, évoluant avec les besoins business',
              'modulaires et à la demande, pour du just-in-time learning',
              'orientés application, ancrés dans des tâches et scénarios réels',
              'centrés humain, soutenant autonomie, motivation et maîtrise',
              'portés par le digital, exploitant data, technologie et plateformes scalables',
            ],
          },
          { type: 'p', text: "Cette transformation fait passer l’apprentissage d’une intervention ponctuelle à un processus continu intégré au travail quotidien." },

          { type: 'h2', text: 'Conclusion' },
          {
            type: 'p',
            text: "Les organisations qui domineront demain ne seront pas forcément celles qui ont le plus de ressources, mais celles qui savent apprendre et s’adapter le plus vite.",
          },
          { type: 'p', text: "L’apprentissage moderne permet aux entreprises de :" },
          { type: 'ul', items: ['aller plus vite', 'réduire les coûts', 'renforcer les capacités à grande échelle'] },
          {
            type: 'p',
            text: "Pour les organisations engagées dans la construction d’équipes résilientes et performantes, investir dans l’apprentissage moderne n’est plus optionnel. C’est une décision stratégique qui façonne directement la performance future.",
          },
        ],
      },
    },
  },
  {
    slug: 'your-teams-are-not-underperforming-your-training-is',
    date: '2026-04-11',
    tags: ['Algeria', 'Corporate training', 'Performance', 'L&D'],
    coverImage: '/blog/cover-3.jpg',
    coverAlt: 'Team in a meeting',
    translations: {
      en: {
        title: 'Your Teams Are Not Underperforming — Your Training Is',
        description:
          'If KPIs don’t move after training, the issue is rarely your people. It’s how learning is designed: generic content instead of performance-driven capability building.',
        blocks: [
          { type: 'p', text: 'Every year, companies across Algeria invest significantly in corporate training.' },
          { type: 'p', text: 'Budgets are allocated. Programs are delivered. Teams attend sessions.' },
          { type: 'p', text: 'Yet when performance is reviewed, the same questions keep coming back:' },
          { type: 'ul', items: ['Why aren’t KPIs improving?', 'Why is productivity still inconsistent?', 'Why does engagement drop shortly after training ends?'] },
          { type: 'p', text: 'The issue is rarely the people.' },
          { type: 'p', text: 'More often, it is the way training is designed.' },

          { type: 'h2', text: 'The Real Problem: Generic Training' },
          { type: 'p', text: 'Most corporate training programs follow a standardized approach. They are:' },
          { type: 'ul', items: ['designed for broad audiences', 'disconnected from specific business contexts', 'focused on content rather than performance'] },
          { type: 'p', text: 'In trying to serve everyone, they end up serving no one.' },
          {
            type: 'p',
            text: 'Teams attend, participate, and complete the training — but struggle to apply what they have learned in real operational situations.',
          },
          { type: 'p', text: 'The result is predictable:' },
          { type: 'ul', items: ['limited impact', 'low retention', 'no measurable improvement in performance'] },

          { type: 'h2', text: 'Why Traditional Training Fails to Deliver Results' },
          { type: 'p', text: 'Training often fails not because it lacks quality, but because it lacks relevance.' },
          { type: 'p', text: 'When learning is not aligned with:' },
          { type: 'ul', items: ['real business challenges', 'team-specific needs', 'operational realities'] },
          { type: 'p', text: '…it becomes theoretical rather than actionable.' },
          { type: 'p', text: 'Without a direct link to performance, training becomes an isolated activity instead of a driver of results.' },

          { type: 'h2', text: 'A Different Approach: Performance-Driven Learning' },
          { type: 'p', text: 'At Basma Learning, training is not designed as a standalone experience. It is built as a performance tool.' },
          { type: 'p', text: 'This approach starts with understanding the organization:' },
          { type: 'ul', items: ['engaging directly with teams', 'identifying operational gaps', 'analyzing performance data and business objectives'] },
          { type: 'p', text: 'From there, learning is designed around real use cases, not generic scenarios.' },
          { type: 'p', text: 'Programs are:' },
          { type: 'ul', items: ['project-based', 'context-specific', 'directly linked to business KPIs'] },
          { type: 'p', text: 'The focus shifts from delivering content to enabling measurable improvement.' },

          { type: 'h2', text: 'From Learning to Performance' },
          { type: 'p', text: 'Effective training should lead to visible outcomes. This includes:' },
          { type: 'ul', items: ['improved productivity', 'better execution consistency', 'stronger team alignment', 'measurable progress on key business indicators'] },
          { type: 'p', text: 'When learning is designed with performance in mind, it becomes a lever for operational excellence.' },

          { type: 'h2', text: 'Conclusion' },
          { type: 'p', text: 'If training looks good but fails to deliver results, the problem is not effort — it is strategy.' },
          { type: 'p', text: 'Organizations that want to see real impact must move beyond generic programs and adopt a more targeted, performance-driven approach.' },
          { type: 'p', text: 'Because ultimately, training should not just inform.' },
          { type: 'p', text: 'It should transform how teams perform.' },
        ],
      },
      fr: {
        title: "Vos équipes ne sous-performent pas — c’est votre formation qui sous-performe",
        description:
          "Si les KPI ne bougent pas après une formation, le problème vient rarement des équipes. Il vient souvent d’un apprentissage trop générique, déconnecté de la performance.",
        blocks: [
          { type: 'p', text: "Chaque année, des entreprises en Algérie investissent massivement dans la formation corporate." },
          { type: 'p', text: "Des budgets sont alloués. Des programmes sont délivrés. Des équipes assistent aux sessions." },
          { type: 'p', text: "Et pourtant, au moment d’évaluer la performance, les mêmes questions reviennent :" },
          { type: 'ul', items: ['Pourquoi les KPI ne s’améliorent pas ?', 'Pourquoi la productivité reste inconstante ?', 'Pourquoi l’engagement retombe juste après la formation ?'] },
          { type: 'p', text: "Le problème vient rarement des personnes." },
          { type: 'p', text: "Il vient le plus souvent de la manière dont la formation est conçue." },

          { type: 'h2', text: 'Le vrai problème : la formation générique' },
          { type: 'p', text: "La majorité des programmes corporate suivent une approche standardisée. Ils sont :" },
          { type: 'ul', items: ['pensés pour un public trop large', 'déconnectés des contextes business spécifiques', 'centrés sur le contenu plutôt que sur la performance'] },
          { type: 'p', text: "En voulant servir tout le monde, ils finissent par ne servir personne." },
          {
            type: 'p',
            text: "Les équipes participent, complètent… mais peinent à appliquer ce qu’elles ont appris dans des situations opérationnelles réelles.",
          },
          { type: 'p', text: 'Le résultat est prévisible :' },
          { type: 'ul', items: ['impact limité', 'faible rétention', 'aucune amélioration mesurable de la performance'] },

          { type: 'h2', text: 'Pourquoi la formation traditionnelle ne délivre pas de résultats' },
          { type: 'p', text: "La formation échoue souvent non pas par manque de qualité, mais par manque de pertinence." },
          { type: 'p', text: "Lorsque l’apprentissage n’est pas aligné avec :" },
          { type: 'ul', items: ['les défis business réels', 'les besoins spécifiques des équipes', 'les réalités opérationnelles'] },
          { type: 'p', text: "…il devient théorique au lieu d’être actionnable." },
          { type: 'p', text: "Sans lien direct avec la performance, la formation devient une activité isolée au lieu d’être un levier de résultats." },

          { type: 'h2', text: 'Une approche différente : un apprentissage orienté performance' },
          { type: 'p', text: "Chez Basma Learning, la formation n’est pas pensée comme une expérience standalone. Elle est construite comme un outil de performance." },
          { type: 'p', text: "Cette approche commence par comprendre l’organisation :" },
          { type: 'ul', items: ['échanger directement avec les équipes', 'identifier les gaps opérationnels', 'analyser la donnée et les objectifs business'] },
          { type: 'p', text: "Ensuite, l’apprentissage est conçu autour de cas d’usage réels, pas de scénarios génériques." },
          { type: 'p', text: 'Les programmes sont :' },
          { type: 'ul', items: ['basés projets', 'contextualisés', 'directement liés aux KPI business'] },
          { type: 'p', text: "Le focus passe du contenu à l’amélioration mesurable sur le terrain." },

          { type: 'h2', text: "De l’apprentissage à la performance" },
          { type: 'p', text: "Une formation efficace doit produire des résultats visibles. Par exemple :" },
          { type: 'ul', items: ['productivité améliorée', 'exécution plus constante', 'meilleur alignement des équipes', 'progression mesurable sur des indicateurs clés'] },
          { type: 'p', text: "Quand l’apprentissage est conçu avec la performance en tête, il devient un levier d’excellence opérationnelle." },

          { type: 'h2', text: 'Conclusion' },
          { type: 'p', text: "Si une formation “fait bien” mais ne produit pas de résultats, le problème n’est pas l’effort — c’est la stratégie." },
          { type: 'p', text: "Pour obtenir un impact réel, il faut dépasser les programmes génériques et adopter une approche ciblée, orientée performance." },
          { type: 'p', text: "Parce qu’au final, la formation ne doit pas seulement informer." },
          { type: 'p', text: "Elle doit transformer la manière dont les équipes performent." },
        ],
      },
    },
  },
];

export function getBlogPosts(lang: BlogLang) {
  return BLOG_POSTS.map((post) => {
    const t = post.translations[lang];
    return {
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      coverImage: post.coverImage,
      coverAlt: post.coverAlt,
      title: t.title,
      description: t.description,
    };
  });
}

export function getBlogPost(lang: BlogLang, slug: string) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    slug: post.slug,
    date: post.date,
    tags: post.tags,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    ...post.translations[lang],
  };
}
