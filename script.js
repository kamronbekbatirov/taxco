// Translations
const translations = {
    ru: {
        'nav-about': 'О НАС',
        'nav-services': 'УСЛУГИ', 
        'nav-pricing': 'ЦЕНЫ',
        'nav-news': 'НОВОСТИ И ПУБЛИКАЦИИ',
        'nav-contact': 'КОНТАКТЫ',
        'hero-title': 'Tax Consensus',
        'hero-subtitle': 'Профессиональное налоговое консультирование в Узбекистане',
        
        // About section
        'about-title': 'О нас',
        'about-intro': 'Организация налоговых консультантов "TAX CONSENSUS" с 2012 года специализируется на вопросах налогообложения и налогового регулирования в Узбекистане. Мы стали одной из первых профессиональных организаций, посвятивших себя развитию качественного налогового консультирования для бизнеса в стране.',
        'who-we-are': 'Кто мы',
        'who-we-are-text': 'На протяжении многих лет "TAX CONSENSUS" сопровождает компании в решении самых сложных и ответственных вопросов налогообложения. Мы консультируем как местный, так и международный бизнес, помогая ориентироваться в постоянно меняющемся налоговом законодательстве Узбекистана и выстраивать надёжные налоговые стратегии.',
        'our-expertise': 'Наша экспертиза включает:',
        'expertise-1': 'налоговый консалтинг и сопровождение бизнеса по вопросам исчисления, уплаты налогов и составления отчетности;',
        'expertise-2': 'защиту интересов налогоплательщиков в налоговых органах и судах;',
        'expertise-3': 'разработку стратегий налогового планирования;',
        'expertise-4': 'анализ и минимизацию налоговых рисков;',
        'expertise-5': 'взаимодействие с государственными органами и участие в консультационных процессах по совершенствованию налогового администрирования.',
        'interaction-text': 'Мы открыто взаимодействуем как с бизнесом, так и с государственными структурами, содействуя развитию налоговой культуры и лучшего понимания правоприменительной практики.',
        'our-approach': 'Наш подход',
        'approach-text': '"TAX CONSENSUS" — это не просто консультационные услуги. Мы работаем как стратегический партнёр для бизнеса, предоставляя решения, которые основаны на глубоком понимании как законодательства, так и реальной бизнес-практики.',
        'we-are': 'Мы:',
        'value-1': 'тщательно подходим к выбору проектов, берясь за задачи, где наш опыт приносит реальную пользу клиенту;',
        'value-2': 'предлагаем индивидуальные решения, адаптированные к потребностям бизнеса;',
        'value-3': 'соблюдаем высокие стандарты профессиональной этики, независимости и конфиденциальности информации клиентов;',
        'value-4': 'стремимся к долгосрочным отношениям, основанным на доверии и взаимной ответственности.',
        'our-values': 'Наши ценности',
        'quality-value-title': 'Качество и профессионализм.',
        'quality-value-desc': 'Мы стремимся достигать наилучших результатов, соблюдая нормы действующего законодательства.',
        'responsibility-value-title': 'Ответственный подход.',
        'responsibility-value-desc': 'Мы добросовестно выполняем взятые на себя обязательства.',
        'transparency-value-title': 'Прозрачность и честность.',
        'transparency-value-desc': 'Мы строим наши консультации и взаимодействие с клиентами на открытости, ясности и профессиональной компетентности.',
        'conclusion': '"TAX CONSENSUS" — это профессиональный налоговый консультант для бизнеса в Узбекистане, работающий на пересечении законодательства, практики и интересов бизнеса.',

        // Services section
        'services-title': 'Наши практики',
        'service-comprehensive': 'Комплексный налоговый консалтинг',
        'service-comprehensive-desc': 'Мы помогаем бизнесу уверенно ориентироваться в постоянно меняющемся налоговом регулировании. Наша команда консультирует как международные, так и местные компании по вопросам налогообложения на всех этапах деятельности.',
        'service-representation': 'Представление интересов в налоговых спорах',
        'service-representation-desc': 'Мы защищаем позиции наших клиентов на всех стадиях налогового контроля и в суде.',
        'service-planning': 'Налоговое планирование и налоговый учёт',
        'service-planning-desc': 'Мы предлагаем стратегические решения, которые позволяют снизить налоговые риски и оптимизировать налоговую нагрузку.',
        'why-choose': 'Почему выбирают нас',
        'advantage-1': 'Глубокая экспертиза в налоговом законодательстве и практическом применении норм.',
        'advantage-2': 'Репутация надёжного партнёра как у представителей бизнеса, так и у государственных органов.',
        'advantage-3': 'Сильная команда налоговых консультантов, работающая в интересах клиента на всех этапах — от консультации до защиты в суде.',

        // Pricing section
        'pricing-title': 'Цены на услуги',
        'pricing-intro': 'Стоимость услуг зависит от сложности запроса, объема работ и требуемого уровня экспертизы.',
        'base-rate': '🔹 Базовая ставка для понимания ценового уровня:',
        'hourly-rate': 'Стандартная плата за 1 час налогового консультирования составляет 3 500 000 сум + НДС 12%.',
        'individual-calc': '🔹 Индивидуальный расчёт стоимости:',
        'individual-calc-desc': 'Для определения точного объема работ и времени, необходимого для выполнения запроса, мы проводим предварительное интервью с потенциальным клиентом. По итогам консультации мы формируем индивидуальное коммерческое предложение (КП) с описанием условий, стоимости и сроков предоставления услуг.',
        'transparency': 'Мы ценим прозрачность и уверены, что каждый клиент должен заранее понимать, за что он платит и какие результаты получит.',

        // News section
        'news-title': 'Новости и публикации',
        'follow-updates': 'Следите за нашими обновлениями',
        'telegram-desc': 'Актуальные новости налогового законодательства, разъяснения и профессиональные комментарии в нашем Telegram-канале:',
        'join-channel': 'Присоединиться к каналу',

        // Contact section
        'contact-title': 'Связаться с нами',
        'contact-intro': 'Чтобы связаться с нами используйте контактную информацию ниже:',
        'contact-address': '📍 Адрес:',
        'address': 'Квартира 22, дом 44, Киёт-5, город Ташкент, Республика Узбекистан, 100017',
        'contact-phone': '📞 Телефон:',
        'contact-email': '📧 Email:',
        'map-title': '🗺️ Наше местоположение',
        'map-info': 'Киёт-5, дом 44, кв. 22, 100017, Ташкент',
        'footer-text': 'Профессиональное налоговое консультирование в Узбекистане',
        
        // Booking page
        'nav-booking': 'ЗАПИСЬ',
        'booking-title': 'Запись на консультацию - TAX CONSENSUS',
        'booking-header': 'Запись на консультацию',
        'booking-subtitle': 'Выберите удобное время для встречи с налоговым консультантом',
        'booking-info-title': 'Информация о записи',
        'booking-info-1': 'Рабочие дни: понедельник - пятница',
        'booking-info-2': 'Рабочее время: 10:00 - 18:00',
        'booking-info-3': 'Обеденный перерыв: 13:00 - 14:00',
        'booking-info-4': 'Продолжительность консультации: 1 час',
        'booking-info-5': 'Вы получите email с подтверждением записи',
        'booking-name': 'Ваше имя *',
        'booking-email': 'Email *',
        'booking-phone': 'Телефон *',
        'booking-date': 'Дата консультации *',
        'booking-time': 'Выберите время *',
        'booking-notes': 'Дополнительная информация (необязательно)',
        'booking-submit': 'Записаться на консультацию',
        'booking-loading': 'Выберите дату...'
    },
    uz: {
        'nav-about': 'БИЗ ҲАҚИМИЗДА',
        'nav-services': 'ХИЗМАТЛАРИМИЗ',
        'nav-pricing': 'НАРХЛАР',
        'nav-news': 'ЯНГИЛИКЛАР ВА МАҚОЛАЛАР',
        'nav-contact': 'АЛОҚА',
        'hero-title': 'Tax Consensus',
        'hero-subtitle': 'Ўзбекистонда профессионал солиқ маслаҳатчилиги',
        
        // About section
        'about-title': 'Биз ҳақимизда',
        'about-intro': '"TAX CONSENSUS" солиқ маслаҳатчилари ташкилоти 2012 йилдан буён Ўзбекистонда солиқ қонунчилиги ва солиқ маъмуриятчилиги соҳасида ихтисослашган. Биз мамлакатимизда бизнес учун сифатли солиқ маслаҳатини ривожлантиришга бағишланган илк касбий ташкилотлардан биримиз.',
        'who-we-are': 'Биз киммиз',
        'who-we-are-text': '"TAX CONSENSUS" компанияси узоқ йиллардан буён маҳаллий ва халқаро бизнесни энг мураккаб ва масъулиятли солиқ масалаларида қўллаб-қувватлаб келмоқда. Биз қуйидаги йўналишларда амалий ёрдам берамиз:',
        'our-expertise': 'Биз қуйидаги соҳаларда фаолият олиб борамиз:',
        'expertise-1': 'солиқ маслаҳати ва солиқ ҳисоботини тузиш бўйича кўмаклашиш;',
        'expertise-2': 'солиқ органлари ва судларда манфаатларни ҳимоя қилиш;',
        'expertise-3': 'солиқ режалаштириш ва хавфларни баҳолаш;',
        'expertise-4': 'бизнес битимлари ва инвестиция лойиҳаларини солиқ жиҳатдан таҳлил қилиш;',
        'expertise-5': 'давлат органлари билан очиқ мулоқотда қатнашиш ва солиқ маъмуриятчилигини яхшилаш жараёнларига ўз ҳиссамизни қўшиш.',
        'interaction-text': 'Биз ҳар доим бизнес ва давлат ўртасида мулоқот майдони бўлишга интиламиз.',
        'our-approach': 'Бизнинг ёндашувимиз',
        'approach-text': '"TAX CONSENSUS" — бу оддий маслаҳат хизматлари эмас, балки сизнинг солиқ соҳасидаги ишончли шеригингиздир. Биз:',
        'we-are': 'Биз:',
        'value-1': 'мижозимиз учун фойда берадиган лойиҳаларни танлаймиз;',
        'value-2': 'мижоз эҳтиёжларига мос индивидуал ечимларни таклиф қиламиз;',
        'value-3': 'касбий одоб ва махфийликка қатъий риоя қиламиз;',
        'value-4': 'ишонч ва ўзаро ҳурматга асосланган узоқ муддатли ҳамкорликка интилган ҳолда фаолият олиб борамиз.',
        'our-values': 'Бизнинг қадриятларимиз',
        'quality-value-title': 'Сифат ва касбийлик',
        'quality-value-desc': 'ҳар бир мижоз учун қонун доирасида энг яхши натижага эришиш.',
        'responsibility-value-title': 'Масъулиятли ёндашув',
        'responsibility-value-desc': 'олинган мажбуриятларни сидқидилдан бажариш.',
        'transparency-value-title': 'Очиқлик ва ҳалоллик',
        'transparency-value-desc': 'мижозлар билан очиқ ва тушунарли муносабатларни қуриш.',
        'conclusion': '"TAX CONSENSUS" – бу Ўзбекистонда бизнес учун билим, тажриба ва амалиётга асосланган солиқ маслаҳатчилиги.',

        // Services section
        'services-title': 'Хизматларимиз',
        'service-comprehensive': 'Солиқ консалтинги ва бизнесни қўллаб-қувватлаш',
        'service-comprehensive-desc': '• Солиқларни ҳисоблаш ва тўлаш;\n• Солиқ ҳисоботини тузиш;\n• Солиқ объектларини аниқлаш;\n• Халқаро солиқ шартномалари бўйича маслаҳатлар;\n• Солиқ органлари билан расмий мулоқотларни ташкил этиш.',
        'service-representation': 'Солиқ соҳасида вакиллик',
        'service-representation-desc': '• Солиқ органлари ва судларда манфаатларни ҳимоя қилиш;\n• Солиқ текширувларида қатнашиш;\n• Солиқ текшируви материалларига эътирозлар тайёрлаш;\n• Солиқ низоларини судгача ҳал қилишда кўмаклашиш.',
        'service-planning': 'Солиқ режалаштириш ва таҳлил',
        'service-planning-desc': '• Солиқ ҳисоби тизимини жорий этиш;\n• Солиқ хавфлари ва оқибатларини баҳолаш;\n• Солиқ имтиёзлари ва ҚҚС қоплаш бўйича кўмак бериш;\n• Бизнес битимларини солиқ жиҳатдан оптималлаштириш.',
        'why-choose': 'Нега айнан биз?',
        'advantage-1': 'Солиқ қонунчилиги ва амалиётда катта тажриба.',
        'advantage-2': 'Бизнес ва давлат органлари ўртасидаги ишончли шерик сифатида тан олиниш.',
        'advantage-3': 'Мижоз манфаатларини барча босқичларда ҳимоя қилиш.',

        // Services lists (added)
        'consulting-support-intro': 'Биз қуйидаги йўналишларда амалий ёрдам берамиз:',
        'consulting-support-1': 'Солиқларни ҳисоблаш ва тўлаш,',
        'consulting-support-2': 'Солиқ ҳисоботини тузиш,',
        'consulting-support-3': 'Солиқ объектларини аниқлаш,',
        'consulting-support-4': 'Халқаро солиқ шартномалари бўйича маслаҳатлар,',
        'consulting-support-5': 'Солиқ органлари билан расмий мулоқотларни ташкил этиш.',
        'disputes-experience-intro': 'Бизнинг тажрибамиз қуйидагиларни қамраб олади:',
        'disputes-li-1': 'Солиқ органлари ва судларда манфаатларни ҳимоя қилиш,',
        'disputes-li-2': 'Солиқ текширувларида қатнашиш,',
        'disputes-li-3': 'Солиқ текшируви материалларига эътирозлар тайёрлаш,',
        'disputes-li-4': 'Солиқ низоларини судгача ҳал қилиш,',
        'disputes-li-5': 'Ҳуқуқни муҳофаза қилувчи ва назорат органларида вакиллик.',
        'planning-help-intro': 'Биз қуйидаги ишларга кўмаклашамиз:',
        'planning-li-1': 'Мижознинг бизнес-реалиятига мос солиқ ҳисоби тизимини йўлга қўйиш,',
        'planning-li-2': 'Битим ва лойиҳаларнинг солиқ оқибатларини таҳлил қилиш,',
        'planning-li-3': 'Солиқ хавфларини аниқлаш ва уларни камайтириш чораларини белгилаш,',
        'planning-li-4': 'Энг мақбул солиқ натижаларини қўлга киритиш учун шартномалар шартларини оптималлаштириш,',
        'planning-li-5': 'Солиқ имтиёзлари ва ҚҚС қайтариш жараёнларини амалга ошириш.',

        // Pricing section
        'pricing-title': 'Нархлар',
        'pricing-intro': 'Хизматлар қиймати сўровнинг мураккаблиги ва ҳажмига боғлиқ бўлади.',
        'base-rate': 'Асосий тариф қўйидагича белгиланган:',
        'hourly-rate': '1 соат солиқ маслаҳати — 3 500 000 сўм + 12% ҚҚС',
        'individual-calc': 'Шахсий таклиф',
        'individual-calc-desc': 'Тўлиқ нарх ва соат ҳажмни аниқлаш учун мижоз билан аввалдан суҳбат ўтказилади ва шундан сўнг шахсий тижорат таклифи тақдим этилади.',
        'transparency': 'Биз очиқ ва аниқ ҳисоб-китобларни қадрлаймиз ва мижознинг олдиндан ҳаммасини тушуниб олишига интилган ҳолда иш олиб борамиз.',

        // News section
        'news-title': 'Янгиликлар ва мақолалар',
        'follow-updates': 'Бизнинг пост ва шарҳларимизни қуйидаги телеграм каналимизда кузатиб боринг:',
        'telegram-desc': 't.me/iroda_abbasovna',
        'join-channel': 'Каналга қўшилиш',

        // Contact section
        'contact-title': 'Алоқа',
        'contact-intro': 'Биз билан боғланиш учун:',
        'contact-address': '📍 Манзил:',
        'address': '22-хонадон, 44-уй, Киёт-5, Тошкент шаҳри, Ўзбекистон Республикаси, 100017',
        'contact-phone': '📞 Телефон:',
        'contact-email': '📧 Email:',
        'map-title': '🗺️ Бизнинг жойлашувимиз',
        'map-info': 'Киёт-5, 44-уй, 22-хонадон, 100017, Тошкент',
        'footer-text': 'Ўзбекистонда профессионал солиқ маслаҳатчилиги',
        
        // Booking page
        'nav-booking': 'ЁЗУВ',
        'booking-title': 'Консультацияга ёзилиш - TAX CONSENSUS',
        'booking-header': 'Консультацияга ёзилиш',
        'booking-subtitle': 'Солиқ маслаҳатчиси билан учрашиш учун қулай вақтни танланг',
        'booking-info-title': 'Ёзув ҳақида маълумот',
        'booking-info-1': 'Иш кунлари: душанба - жума',
        'booking-info-2': 'Иш вақти: 10:00 - 18:00',
        'booking-info-3': 'Тушлик танаффуси: 13:00 - 14:00',
        'booking-info-4': 'Консультация давомийлиги: 1 соат',
        'booking-info-5': 'Сиз emailга тасдиқлама оласиз',
        'booking-name': 'Исмингиз *',
        'booking-email': 'Email *',
        'booking-phone': 'Телефон *',
        'booking-date': 'Консультация санаси *',
        'booking-time': 'Вақтни танланг *',
        'booking-notes': 'Қўшимча маълумот (мажбурий эмас)',
        'booking-submit': 'Консультацияга ёзилиш',
        'booking-loading': 'Санани танланг...'
    },
    en: {
        'nav-about': 'ABOUT US',
        'nav-services': 'SERVICES',
        'nav-pricing': 'PRICING',
        'nav-news': 'NEWS AND PUBLICATIONS',
        'nav-contact': 'CONTACT',
        'hero-title': 'Tax Consensus',
        'hero-subtitle': 'Professional Tax Consulting in Uzbekistan',
        
        // About section
        'about-title': 'About Us',
        'about-intro': 'The tax consultants organization "TAX CONSENSUS" has been specializing in taxation and tax regulation issues in Uzbekistan since 2012. We became one of the first professional organizations dedicated to developing quality tax consulting for business in the country.',
        'who-we-are': 'Who We Are',
        'who-we-are-text': 'For many years, "TAX CONSENSUS" has been accompanying companies in solving the most complex and responsible tax issues. We consult both local and international businesses, helping to navigate the constantly changing tax legislation of Uzbekistan and build reliable tax strategies.',
        'our-expertise': 'Our expertise includes:',
        'expertise-1': 'tax consulting and business support on issues of calculation, payment of taxes and reporting;',
        'expertise-2': 'protection of taxpayers\' interests in tax authorities and courts;',
        'expertise-3': 'development of tax planning strategies;',
        'expertise-4': 'analysis and minimization of tax risks;',
        'expertise-5': 'interaction with government agencies and participation in consultation processes on improving tax administration.',
        'interaction-text': 'We openly interact with both business and government structures, contributing to the development of tax culture and better understanding of law enforcement practices.',
        'our-approach': 'Our Approach',
        'approach-text': '"TAX CONSENSUS" is not just consulting services. We work as a strategic partner for business, providing solutions based on deep understanding of both legislation and real business practice.',
        'we-are': 'We:',
        'value-1': 'carefully approach the selection of projects, taking on tasks where our experience brings real benefit to the client;',
        'value-2': 'offer individual solutions adapted to business needs;',
        'value-3': 'comply with high standards of professional ethics, independence and confidentiality of client information;',
        'value-4': 'strive for long-term relationships based on trust and mutual responsibility.',
        'our-values': 'Our Values',
        'quality-value-title': 'Quality and professionalism.',
        'quality-value-desc': 'We strive to achieve the best results while complying with current legislation.',
        'responsibility-value-title': 'Responsible approach.',
        'responsibility-value-desc': 'We conscientiously fulfill our commitments.',
        'transparency-value-title': 'Transparency and honesty.',
        'transparency-value-desc': 'We build our consultations and interactions with clients on openness, clarity and professional competence.',
        'conclusion': '"TAX CONSENSUS" is a professional tax consultant for business in Uzbekistan, working at the intersection of legislation, practice and business interests.',

        // Services section
        'services-title': 'Our Practices',
        'service-comprehensive': 'Comprehensive Tax Consulting',
        'service-comprehensive-desc': 'We help businesses confidently navigate the ever-changing tax environment. We advise both international and local companies at all stages of their operations. Our support includes:',
        'service-representation': 'Representation in Tax Disputes',
        'service-representation-desc': 'We protect our clients\' interests during all stages of tax audits and in court proceedings. Our expertise includes:',
        'service-planning': 'Tax Planning and Tax Accounting',
        'service-planning-desc': 'We provide strategic solutions that reduce tax risks and optimize tax burdens. Our services include:',
        'consulting-support-intro': 'We support our clients in:',
        'consulting-support-1': 'Tax calculation and payment,',
        'consulting-support-2': 'Tax reporting preparation,',
        'consulting-support-3': 'Maintenance of tax accounting,',
        'consulting-support-4': 'Application of double taxation treaties,',
        'consulting-support-5': 'Liaising with tax authorities on tax law clarifications.',
        'disputes-experience-intro': 'Our expertise includes:',
        'disputes-li-1': 'Representation before tax authorities and courts,',
        'disputes-li-2': 'Support during tax audits,',
        'disputes-li-3': 'Preparing objections to tax audit findings,',
        'disputes-li-4': 'Pre-trial resolution of tax disputes,',
        'disputes-li-5': 'Representation in law enforcement and regulatory bodies.',
        'planning-help-intro': 'We help:',
        'planning-li-1': 'Structure tax accounting in line with the client’s business reality,',
        'planning-li-2': 'Analyze tax consequences of transactions and projects,',
        'planning-li-3': 'Identify tax risks and mitigation opportunities,',
        'planning-li-4': 'Optimize contract terms to achieve the best tax outcomes,',
        'planning-li-5': 'Implement tax benefits and VAT refunds.',
        'why-choose': 'Why Choose Us',
        'advantage-1': 'Deep expertise in tax legislation and practical application of norms.',
        'advantage-2': 'Reputation as a reliable partner among both business representatives and government agencies.',
        'advantage-3': 'Strong team of tax consultants working in the client\'s interests at all stages - from consultation to court protection.',

        // Pricing section
        'pricing-title': 'Service Pricing',
        'pricing-intro': 'Service cost depends on request complexity, scope of work and required level of expertise.',
        'base-rate': '🔹 Base rate for price level understanding:',
        'hourly-rate': 'Standard fee for 1 hour of tax consulting is 3,500,000 sum + 12% VAT.',
        'individual-calc': '🔹 Individual cost calculation:',
        'individual-calc-desc': 'To determine the exact scope of work and time required to fulfill the request, we conduct a preliminary interview with the potential client. Based on consultation results, we form an individual commercial proposal (CP) with description of conditions, cost and service delivery terms.',
        'transparency': 'We value transparency and believe that each client should understand in advance what they pay for and what results they will receive.',

        // News section
        'news-title': 'News and Publications',
        'follow-updates': 'Follow Our Updates',
        'telegram-desc': 'Current tax legislation news, explanations and professional comments in our Telegram channel:',
        'join-channel': 'Join Channel',

        // Contact section
        'contact-title': 'Contact Us',
        'contact-intro': 'To contact us, use the contact information below:',
        'contact-address': '📍 Address:',
        'address': 'Apt. 22, House 44, Kiyot-5, Tashkent, Republic of Uzbekistan, 100017',
        'contact-phone': '📞 Phone:',
        'contact-email': '📧 Email:',
        'map-title': '🗺️ Our Location',
        'map-info': 'Kiyot-5, House 44, Apt. 22, 100017, Tashkent',
        'footer-text': 'Professional Tax Consulting in Uzbekistan',
        
        // Booking page
        'nav-booking': 'BOOKING',
        'booking-title': 'Book Consultation - TAX CONSENSUS',
        'booking-header': 'Book a Consultation',
        'booking-subtitle': 'Choose a convenient time to meet with a tax consultant',
        'booking-info-title': 'Booking Information',
        'booking-info-1': 'Working days: Monday - Friday',
        'booking-info-2': 'Working hours: 10:00 AM - 6:00 PM',
        'booking-info-3': 'Lunch break: 1:00 PM - 2:00 PM',
        'booking-info-4': 'Consultation duration: 1 hour',
        'booking-info-5': 'You will receive an email confirmation',
        'booking-name': 'Your Name *',
        'booking-email': 'Email *',
        'booking-phone': 'Phone *',
        'booking-date': 'Consultation Date *',
        'booking-time': 'Select Time *',
        'booking-notes': 'Additional Information (optional)',
        'booking-submit': 'Book Consultation',
        'booking-loading': 'Select a date...'
    }
};

// Add missing translations for secondary nav buttons
translations.ru['nav-approach'] = 'НАШ ПОДХОД';
translations.ru['nav-values'] = 'НАШИ ЦЕННОСТИ';
translations.ru['nav-services-practices'] = 'НАШИ ПРАКТИКИ';
translations.ru['nav-services-disputes'] = 'ПРЕДСТАВЛЕНИЕ ИНТЕРЕСОВ В НАЛОГОВЫХ СПОРАХ';
translations.ru['nav-services-planning'] = 'НАЛОГОВОЕ ПЛАНИРОВАНИЕ И НАЛОГОВЫЙ УЧЁТ';
translations.ru['nav-services-why'] = 'ПОЧЕМУ ВЫБИРАЮТ НАС';

translations.uz['nav-approach'] = 'БИЗНИНГ ЁНДАШУВ';
translations.uz['nav-values'] = 'ҚАДРИЯТЛАРИМИЗ';
translations.uz['nav-services-practices'] = 'ХИЗМАТЛАРИМИЗ';
translations.uz['nav-services-disputes'] = 'СОЛИҚ СОҲАСИДА ВАКИЛЛИК';
translations.uz['nav-services-planning'] = 'СОЛИҚ РЕЖАЛАШТИРИШ ВА ҲИСОБ';
translations.uz['nav-services-why'] = 'НЕГА АЙНАН БИЗ?';

translations.en['nav-approach'] = 'OUR APPROACH';
translations.en['nav-values'] = 'OUR VALUES';
translations.en['nav-services-practices'] = 'OUR PRACTICES';
translations.en['nav-services-disputes'] = 'TAX DISPUTE REPRESENTATION';
translations.en['nav-services-planning'] = 'TAX PLANNING AND ACCOUNTING';
translations.en['nav-services-why'] = 'WHY CHOOSE US';

// Language functionality
let currentLanguage = 'ru';
// Preserve initial RU texts from HTML to keep manual edits
const initialRUTexts = {};

function setLanguage(lang) {
    currentLanguage = lang;
    updateContent();
    localStorage.setItem('preferred-language', lang);
    
    // Sync both language selectors
    const mainSelect = document.getElementById('language-select');
    const pageSelect = document.getElementById('page-language-select');
    
    if (mainSelect) mainSelect.value = lang;
    if (pageSelect) pageSelect.value = lang;

    // Ensure option labels show flags
    updateLanguageOptionLabels();

    // We now render flags inside <option> labels only; no need to set data-flag on container
}

function updateContent() {
    const elements = document.querySelectorAll('[data-translate]');

    if (currentLanguage === 'ru') {
        // For RU, restore texts from the original HTML (manual edits)
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (initialRUTexts[key] !== undefined) {
                element.textContent = initialRUTexts[key];
            }
        });
    } else {
        // For other languages, apply translations
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
    }

    // Update document language
    document.documentElement.lang = currentLanguage;

    // Update page title based on current page
    const pageTitle = getCurrentPageTitle();
    document.title = pageTitle;
}

function getCurrentPageTitle() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    const titles = {
        ru: {
            'index': 'TAX CONSENSUS - Налоговое консультирование',
            'about': 'О нас - TAX CONSENSUS',
            'services': 'Услуги - TAX CONSENSUS',
            'pricing': 'Цены - TAX CONSENSUS',
            'news': 'Новости - TAX CONSENSUS',
            'contact': 'Контакты - TAX CONSENSUS',
            'booking': 'Запись на консультацию - TAX CONSENSUS'
        },
        uz: {
            'index': 'TAX CONSENSUS - Soliq konsultatsiyasi',
            'about': 'Biz haqimizda - TAX CONSENSUS',
            'services': 'Xizmatlar - TAX CONSENSUS',
            'pricing': 'Narxlar - TAX CONSENSUS',
            'news': 'Yangiliklar - TAX CONSENSUS',
            'contact': 'Kontaktlar - TAX CONSENSUS',
            'booking': 'Консультацияга ёзилиш - TAX CONSENSUS'
        },
        en: {
            'index': 'TAX CONSENSUS - Tax Consulting',
            'about': 'About Us - TAX CONSENSUS',
            'services': 'Services - TAX CONSENSUS',
            'pricing': 'Pricing - TAX CONSENSUS',
            'news': 'News - TAX CONSENSUS',
            'contact': 'Contact - TAX CONSENSUS',
            'booking': 'Book Consultation - TAX CONSENSUS'
        }
    };
    
    return titles[currentLanguage][page] || titles.ru[page] || 'TAX CONSENSUS';
}

// Mobile navigation
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Initialize main hamburger menu
function initMainHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu .mobile-menu-close');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking close button
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        }
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Tab functionality
function initTabs() {
    const tabLinks = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for tab links, not regular navigation
            if (link.hasAttribute('data-tab')) {
                e.preventDefault();
                
                const targetTab = link.getAttribute('data-tab');
                
                // Force remove active class from all tabs and contents
                tabLinks.forEach(tab => {
                    tab.classList.remove('active');
                });
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    // Force hide inactive tabs
                    content.style.display = 'none';
                    content.style.visibility = 'hidden';
                    content.style.opacity = '0';
                });
                
                // Add active class to clicked tab and corresponding content
                link.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    // Force show active tab
                    targetContent.style.display = 'block';
                    targetContent.style.visibility = 'visible';
                    targetContent.style.opacity = '1';
                }
            }
        });
    });
}

// Ensure mini-nav links work properly
function initMiniNav() {
    const miniNavLinks = document.querySelectorAll('.mini-nav a');
    miniNavLinks.forEach(link => {
        // Remove any existing event listeners that might interfere
        link.addEventListener('click', (e) => {
            // Don't prevent default - let the browser handle the navigation
            console.log('Mini-nav link clicked:', link.href);
        });
    });
}

// Page hamburger menu functionality
function initPageHamburger() {
    const pageHamburger = document.querySelector('.page-hamburger');
    const pageMobileMenu = document.querySelector('.page-mobile-menu');
    const pageCloseButton = document.querySelector('.page-mobile-menu .mobile-menu-close');
    
    if (pageHamburger && pageMobileMenu) {
        pageHamburger.addEventListener('click', () => {
            pageHamburger.classList.toggle('active');
            pageMobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking close button
        if (pageCloseButton) {
            pageCloseButton.addEventListener('click', () => {
                pageHamburger.classList.remove('active');
                pageMobileMenu.classList.remove('active');
            });
        }
        
        // Close menu when clicking on a link
        const menuLinks = pageMobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                pageHamburger.classList.remove('active');
                pageMobileMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!pageHamburger.contains(e.target) && !pageMobileMenu.contains(e.target)) {
                pageHamburger.classList.remove('active');
                pageMobileMenu.classList.remove('active');
            }
        });
    }
}

// Navbar stays transparent (no background change on scroll)

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial flags ASAP (before content updates)
    const initialFlag = (currentLanguage === 'ru') ? '🇷🇺' : (currentLanguage === 'uz' ? '🇺🇿' : '🇬🇧');
    document.querySelectorAll('.language-selector').forEach(el => el.setAttribute('data-flag', initialFlag));
    // Snapshot initial RU texts from HTML once
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            initialRUTexts[key] = (element.textContent || '').trim();
        }
    });
    // Set up language selector
    const languageSelect = document.getElementById('language-select');
    
    // Load preferred language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
    }
    
    // Update content with current language
    updateContent();
    // Ensure option labels show flags
    updateLanguageOptionLabels();
    
    // Flags are handled via option labels; container pseudo-icon disabled in CSS
    // Language selector event listener
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    
    // Page header language selector
    const pageLanguageSelect = document.getElementById('page-language-select');
    if (pageLanguageSelect) {
        pageLanguageSelect.value = currentLanguage;
        pageLanguageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    
    // Make entire language selector clickable to open native picker
    function enhanceLanguageSelectorFor(container) {
        if (!container) return;
        const select = container.querySelector('select');
        if (!select) return;
        container.addEventListener('click', (ev) => {
            if (ev.target.tagName.toLowerCase() !== 'select') {
                if (typeof select.showPicker === 'function') {
                    try { select.showPicker(); } catch (_) { select.focus(); select.click(); }
                } else {
                    select.focus();
                    try { select.click(); } catch (_) {}
                }
            }
        });
    }
    document.querySelectorAll('.language-selector').forEach(enhanceLanguageSelectorFor);

    // Initialize main hamburger menu
    initMainHamburger();
    
    // Initialize tabs
    initTabs();
    
    // Initialize mini navigation
    initMiniNav();
    
    // Initialize page hamburger menu
    initPageHamburger();
});

// Replace option labels in language selects with emoji flags
function updateLanguageOptionLabels() {
    const labelByValue = { ru: '🇷🇺 RU', uz: '🇺🇿 UZ', en: '🇬🇧 EN' };
    const selects = [document.getElementById('language-select'), document.getElementById('page-language-select')].filter(Boolean);
    selects.forEach(select => {
        Array.from(select.options).forEach(opt => {
            const v = (opt.value || '').toLowerCase();
            if (labelByValue[v]) {
                // Ensure only one flag is shown: set exact label text
                opt.textContent = labelByValue[v];
            }
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768 && mobileMenu && hamburger) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}); 