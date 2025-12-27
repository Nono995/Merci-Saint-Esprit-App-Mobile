// Bible Louis Segond 1910 - Structure optimisée
export const BIBLE_BOOKS = [
  // Ancien Testament
  { id: 'gen', name: 'Genèse', testament: 'AT', chapters: 50 },
  { id: 'exo', name: 'Exode', testament: 'AT', chapters: 40 },
  { id: 'lev', name: 'Lévitique', testament: 'AT', chapters: 27 },
  { id: 'nom', name: 'Nombres', testament: 'AT', chapters: 36 },
  { id: 'deu', name: 'Deutéronome', testament: 'AT', chapters: 34 },
  { id: 'jos', name: 'Josué', testament: 'AT', chapters: 24 },
  { id: 'jug', name: 'Juges', testament: 'AT', chapters: 21 },
  { id: 'rut', name: 'Ruth', testament: 'AT', chapters: 4 },
  { id: '1sa', name: '1 Samuel', testament: 'AT', chapters: 31 },
  { id: '2sa', name: '2 Samuel', testament: 'AT', chapters: 24 },
  { id: '1ro', name: '1 Rois', testament: 'AT', chapters: 22 },
  { id: '2ro', name: '2 Rois', testament: 'AT', chapters: 25 },
  { id: '1ch', name: '1 Chroniques', testament: 'AT', chapters: 29 },
  { id: '2ch', name: '2 Chroniques', testament: 'AT', chapters: 36 },
  { id: 'esd', name: 'Esdras', testament: 'AT', chapters: 10 },
  { id: 'neh', name: 'Néhémie', testament: 'AT', chapters: 13 },
  { id: 'est', name: 'Esther', testament: 'AT', chapters: 10 },
  { id: 'job', name: 'Job', testament: 'AT', chapters: 42 },
  { id: 'psa', name: 'Psaumes', testament: 'AT', chapters: 150 },
  { id: 'pro', name: 'Proverbes', testament: 'AT', chapters: 31 },
  { id: 'ecc', name: 'Ecclésiaste', testament: 'AT', chapters: 12 },
  { id: 'can', name: 'Cantique', testament: 'AT', chapters: 8 },
  { id: 'isa', name: 'Ésaïe', testament: 'AT', chapters: 66 },
  { id: 'jer', name: 'Jérémie', testament: 'AT', chapters: 52 },
  { id: 'lam', name: 'Lamentations', testament: 'AT', chapters: 5 },
  { id: 'eze', name: 'Ézéchiel', testament: 'AT', chapters: 48 },
  { id: 'dan', name: 'Daniel', testament: 'AT', chapters: 12 },
  { id: 'ose', name: 'Osée', testament: 'AT', chapters: 14 },
  { id: 'joe', name: 'Joël', testament: 'AT', chapters: 3 },
  { id: 'amo', name: 'Amos', testament: 'AT', chapters: 9 },
  { id: 'abd', name: 'Abdias', testament: 'AT', chapters: 1 },
  { id: 'jon', name: 'Jonas', testament: 'AT', chapters: 4 },
  { id: 'mic', name: 'Michée', testament: 'AT', chapters: 7 },
  { id: 'nah', name: 'Nahum', testament: 'AT', chapters: 3 },
  { id: 'hab', name: 'Habacuc', testament: 'AT', chapters: 3 },
  { id: 'sop', name: 'Sophonie', testament: 'AT', chapters: 3 },
  { id: 'agg', name: 'Aggée', testament: 'AT', chapters: 2 },
  { id: 'zac', name: 'Zacharie', testament: 'AT', chapters: 14 },
  { id: 'mal', name: 'Malachie', testament: 'AT', chapters: 4 },

  // Nouveau Testament
  { id: 'mat', name: 'Matthieu', testament: 'NT', chapters: 28 },
  { id: 'mar', name: 'Marc', testament: 'NT', chapters: 16 },
  { id: 'luc', name: 'Luc', testament: 'NT', chapters: 24 },
  { id: 'jea', name: 'Jean', testament: 'NT', chapters: 21 },
  { id: 'act', name: 'Actes', testament: 'NT', chapters: 28 },
  { id: 'rom', name: 'Romains', testament: 'NT', chapters: 16 },
  { id: '1co', name: '1 Corinthiens', testament: 'NT', chapters: 16 },
  { id: '2co', name: '2 Corinthiens', testament: 'NT', chapters: 13 },
  { id: 'gal', name: 'Galates', testament: 'NT', chapters: 6 },
  { id: 'eph', name: 'Éphésiens', testament: 'NT', chapters: 6 },
  { id: 'phi', name: 'Philippiens', testament: 'NT', chapters: 4 },
  { id: 'col', name: 'Colossiens', testament: 'NT', chapters: 4 },
  { id: '1th', name: '1 Thessaloniciens', testament: 'NT', chapters: 5 },
  { id: '2th', name: '2 Thessaloniciens', testament: 'NT', chapters: 3 },
  { id: '1ti', name: '1 Timothée', testament: 'NT', chapters: 6 },
  { id: '2ti', name: '2 Timothée', testament: 'NT', chapters: 4 },
  { id: 'tit', name: 'Tite', testament: 'NT', chapters: 3 },
  { id: 'phm', name: 'Philémon', testament: 'NT', chapters: 1 },
  { id: 'heb', name: 'Hébreux', testament: 'NT', chapters: 13 },
  { id: 'jam', name: 'Jacques', testament: 'NT', chapters: 5 },
  { id: '1pe', name: '1 Pierre', testament: 'NT', chapters: 5 },
  { id: '2pe', name: '2 Pierre', testament: 'NT', chapters: 3 },
  { id: '1jo', name: '1 Jean', testament: 'NT', chapters: 5 },
  { id: '2jo', name: '2 Jean', testament: 'NT', chapters: 1 },
  { id: '3jo', name: '3 Jean', testament: 'NT', chapters: 1 },
  { id: 'jud', name: 'Jude', testament: 'NT', chapters: 1 },
  { id: 'rev', name: 'Apocalypse', testament: 'NT', chapters: 22 }
];

export const SAMPLE_VERSES = {
  'jea-3': {
    1: "Il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs,",
    2: "qui vint, lui, auprès de Jésus, de nuit, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui.",
    3: "Jésus lui répondit: En vérité, en vérité, je te le dis, si un homme ne naît de nouveau, il ne peut voir le royaume de Dieu.",
    16: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
    17: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui."
  },
  'psa-23': {
    1: "L'Éternel est mon berger: je ne manquerai de rien.",
    2: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles.",
    3: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, À cause de son nom.",
    4: "Quand je marche dans la vallée de l'ombre de la mort, Je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent.",
    5: "Tu dresses devant moi une table, En face de mes adversaires; Tu oins d'huile ma tête, Et ma coupe déborde.",
    6: "Oui, le bonheur et la grâce m'accompagneront Tous les jours de ma vie, Et j'habiterai dans la maison de l'Éternel Jusqu'à la fin de mes jours."
  },
  'rom-8': {
    1: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus Christ.",
    28: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
    31: "Que dirons-nous donc à l'égard de ces choses? Si Dieu est pour nous, qui sera contre nous?",
    38: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir,",
    39: "ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus Christ notre Seigneur."
  },
  'phi-4': {
    4: "Réjouissez-vous toujours dans le Seigneur; je le répète, réjouissez-vous.",
    6: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.",
    7: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos coeurs et vos pensées en Jésus Christ.",
    13: "Je puis tout par celui qui me fortifie."
  },
  'pro-3': {
    1: "Mon fils, n'oublie pas mes enseignements, Et que ton coeur garde mes préceptes;",
    5: "Confie-toi en l'Éternel de tout ton coeur, Et ne t'appuie pas sur ta sagesse;",
    6: "Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers."
  },
  'gen-1': {
    1: "Au commencement, Dieu créa les cieux et la terre.",
    2: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
    3: "Dieu dit: Que la lumière soit! Et la lumière fut.",
    27: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme."
  },
  'mat-5': {
    3: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!",
    4: "Heureux les affligés, car ils seront consolés!",
    5: "Heureux les débonnaires, car ils hériteront la terre!",
    14: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée;",
    16: "Que votre lumière luise ainsi devant les hommes, afin qu'ils voient vos bonnes oeuvres, et qu'ils glorifient votre Père qui est dans les cieux."
  },
  'mat-6': {
    9: "Voici donc comment vous devez prier: Notre Père qui es aux cieux! Que ton nom soit sanctifié;",
    10: "que ton règne vienne; que ta volonté soit faite sur la terre comme au ciel.",
    11: "Donne-nous aujourd'hui notre pain quotidien;",
    33: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus."
  },
  'jea-14': {
    1: "Que votre coeur ne se trouble point. Croyez en Dieu, et croyez en moi.",
    6: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
    27: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre coeur ne se trouble point, et ne s'alarme point."
  },
  'act-1': {
    8: "Mais vous recevrez une puissance, le Saint Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu'aux extrémités de la terre."
  },
  'gen-2': {
    1: "Ainsi furent achevés les cieux et la terre, et toute leur armée.",
    2: "Dieu acheva au septième jour son oeuvre, qu'il avait faite: et il se reposa au septième jour de toute son oeuvre, qu'il avait faite.",
    3: "Dieu bénit le septième jour, et il le sanctifia, parce qu'en ce jour il se reposa de toute son oeuvre qu'il avait créée en la faisant."
  },
  'psa-1': {
    1: "Heureux l'homme qui ne marche pas selon le conseil des méchants, Qui ne s'arrête pas sur la voie des pécheurs, Et qui ne s'assied pas en compagnie des moqueurs,",
    2: "Mais qui trouve son plaisir dans la loi de l'Éternel, Et qui la médite jour et nuit!",
    3: "Il est comme un arbre planté près d'un courant d'eau, Qui donne son fruit en sa saison, Et dont le feuillage ne se flétrit point: Tout ce qu'il fait lui réussit."
  },
  'psa-91': {
    1: "Celui qui demeure sous l'abri du Très Haut Repose à l'ombre du Tout Puissant.",
    2: "Je dis à l'Éternel: Mon refuge et ma forteresse, Mon Dieu en qui je me confie!",
    11: "Car il ordonnera à ses anges De te garder dans toutes tes voies;",
    12: "Ils te porteront sur les mains, De peur que ton pied ne heurte contre une pierre."
  },
  'jea-1': {
    1: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
    14: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père."
  },
  'mat-28': {
    18: "Jésus, s'étant approché, leur parla ainsi: Tout pouvoir m'a été donné dans le ciel et sur la terre.",
    19: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint Esprit,",
    20: "et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde."
  },
  'rut-1': {
    1: "Du temps des juges, il y eut une famine dans le pays. Un homme de Bethléhem de Juda partit, avec sa femme et ses deux fils, pour faire un séjour dans le pays de Moab.",
    2: "Le nom de cet homme était Élimélec, celui de sa femme Naomi, et ses deux fils s'appelaient Machlon et Kiljon; ils étaient Éphratiens, de Bethléhem de Juda. Arrivés au pays de Moab, ils y fixèrent leur demeure.",
    3: "Élimélec, mari de Naomi, mourut, et elle resta avec ses deux fils.",
    4: "Ils prirent des femmes Moabites, dont l'une se nommait Orpa, et l'autre Ruth, et ils habitèrent là environ dix ans.",
    5: "Machlon et Kiljon moururent aussi tous les deux, et Naomi resta privée de ses deux fils et de son mari.",
    6: "Puis elle se leva, elle et ses belles-filles, afin de quitter le pays de Moab, car elle apprit au pays de Moab que l'Éternel avait visité son peuple et lui avait donné du pain.",
    16: "Ruth répondit: Ne me presse pas de te laisser, de retourner loin de toi! Où tu iras j'irai, où tu demeureras je demeurerai; ton peuple sera mon peuple, et ton Dieu sera mon Dieu;",
    17: "où tu mourras je mourrai, et j'y serai enterrée. Que l'Éternel me traite dans toute sa rigueur, si autre chose que la mort vient à me séparer de toi!",
    22: "Ainsi revinrent du pays de Moab Naomi et sa belle-fille, Ruth la Moabite. Elles arrivèrent à Bethléhem au commencement de la moisson des orges."
  },
  'jos-1': {
    1: "Après la mort de Moïse, serviteur de l'Éternel, l'Éternel dit à Josué, fils de Nun, serviteur de Moïse:",
    2: "Moïse, mon serviteur, est mort; maintenant, lève-toi, passe ce Jourdain, toi et tout ce peuple, pour entrer dans le pays que je donne aux enfants d'Israël.",
    3: "Tout lieu que foulera la plante de votre pied, je vous le donne, comme je l'ai dit à Moïse.",
    5: "Nul ne tiendra devant toi, tant que tu vivras. Je serai avec toi, comme j'ai été avec Moïse; je ne te délaisserai point, je ne t'abandonnerai point.",
    6: "Fortifie-toi et prends courage, car c'est toi qui mettras ce peuple en possession du pays que j'ai juré à leurs pères de leur donner.",
    7: "Fortifie-toi seulement et aie bon courage, en agissant fidèlement selon toute la loi que Moïse, mon serviteur, t'a prescrite; ne t'en détourne ni à droite ni à gauche, afin de réussir dans tout ce que tu entreprendras.",
    8: "Que ce livre de la loi ne s'éloigne point de ta bouche; médite-le jour et nuit, pour agir fidèlement selon tout ce qui y est écrit; car c'est alors que tu auras du succès dans tes entreprises, c'est alors que tu réussiras.",
    9: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras."
  },
  'jos-24': {
    1: "Josué assembla toutes les tribus d'Israël à Sichem, et il convoqua les anciens d'Israël, ses chefs, ses juges et ses officiers. Et ils se présentèrent devant Dieu.",
    2: "Josué dit à tout le peuple: Ainsi parle l'Éternel, le Dieu d'Israël: Vos pères, Térach, père d'Abraham et père de Nachor, habitaient anciennement de l'autre côté du fleuve, et ils servaient d'autres dieux.",
    14: "Maintenant, craignez l'Éternel, et servez-le avec intégrité et fidélité. Faites disparaître les dieux qu'ont servis vos pères de l'autre côté du fleuve et en Égypte, et servez l'Éternel.",
    15: "Et si vous ne trouvez pas bon de servir l'Éternel, choisissez aujourd'hui qui vous voulez servir, ou les dieux que servaient vos pères au delà du fleuve, ou les dieux des Amoréens dans le pays desquels vous habitez. Moi et ma maison, nous servirons l'Éternel.",
    16: "Le peuple répondit, et dit: Loin de nous la pensée d'abandonner l'Éternel, et de servir d'autres dieux!",
    24: "Le peuple dit à Josué: Nous servirons l'Éternel, notre Dieu, et nous obéirons à sa voix."
  },
  'exo-20': {
    1: "Alors Dieu prononça toutes ces paroles, en disant:",
    2: "Je suis l'Éternel, ton Dieu, qui t'ai fait sortir du pays d'Égypte, de la maison de servitude.",
    3: "Tu n'auras pas d'autres dieux devant ma face.",
    8: "Souviens-toi du jour du repos, pour le sanctifier.",
    12: "Honore ton père et ta mère, afin que tes jours se prolongent dans le pays que l'Éternel, ton Dieu, te donne.",
    13: "Tu ne tueras point.",
    14: "Tu ne commettras point d'adultère.",
    15: "Tu ne déroberas point.",
    16: "Tu ne porteras point de faux témoignage contre ton prochain.",
    17: "Tu ne convoiteras point la maison de ton prochain; tu ne convoiteras point la femme de ton prochain, ni son serviteur, ni sa servante, ni son boeuf, ni son âne, ni aucune chose qui appartienne à ton prochain."
  },
  'isa-40': {
    1: "Consolez, consolez mon peuple, Dit votre Dieu.",
    8: "L'herbe sèche, la fleur tombe; Mais la parole de notre Dieu subsiste éternellement.",
    28: "Ne le sais-tu pas? ne l'as-tu pas appris? C'est le Dieu d'éternité, l'Éternel, Qui a créé les extrémités de la terre; Il ne se fatigue point, il ne se lasse point; On ne peut sonder son intelligence.",
    29: "Il donne de la force à celui qui est fatigué, Et il augmente la vigueur de celui qui tombe en défaillance.",
    30: "Les adolescents se fatiguent et se lassent, Et les jeunes hommes chancellent;",
    31: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point."
  },
  'eph-2': {
    8: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.",
    9: "Ce n'est point par les oeuvres, afin que personne ne se glorifie.",
    10: "Car nous sommes son ouvrage, ayant été créés en Jésus Christ pour de bonnes oeuvres, que Dieu a préparées d'avance, afin que nous les pratiquions."
  },
  '2ti-3': {
    16: "Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice,",
    17: "afin que l'homme de Dieu soit accompli et propre à toute bonne oeuvre."
  }
};

export const loadChapter = (bookId, chapter) => {
  const key = `${bookId}-${chapter}`;
  // console.log('Chargement chapitre:', key); // Commenté pour réduire les logs
  
  if (SAMPLE_VERSES[key]) {
    // console.log('Versets trouvés:', Object.keys(SAMPLE_VERSES[key]).length); // Commenté
    return Promise.resolve(SAMPLE_VERSES[key]);
  }
  
  // console.log('Chapitre non disponible localement, tentative via API'); // Commenté
  return Promise.resolve(null);
};
