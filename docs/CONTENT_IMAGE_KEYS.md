# Content image keys – key to path mapping

Use this for DB seeding and frontend `getContent(image_key)` for image `src`.

| content_key | Default path | Used in |
|-------------|---------------|---------|
| logo_primary | /static/primary-logo05-1.svg | Header, Footer, MobileMenuHeader, cooperation |
| cookie_icon | /static/cookie.svg | SkipCookie |
| close_icon | /static/x.svg | SkipCookie, CookiePolicyModal |
| social_instagram | /static/instagram.svg | SocialMedia, LowerBar, InfoBlock |
| social_youtube | /static/youtube.svg | SocialMedia, LowerBar, InfoBlock |
| social_facebook | /static/facebook.svg | SocialMedia, LowerBar, InfoBlock |
| social_twitter | /static/twitter.svg | SocialMedia, LowerBar, InfoBlock |
| social_telegram | /static/telegram.svg | InfoBlock |
| social_whatsapp | /static/iconwhatsapp.svg | InfoBlock, Contacts |
| bank_leumi_logo | /static/bankleumilogo-1.svg | PartnersSwiper, BankOffers |
| bank_discount_logo | /static/discountbank.svg | PartnersSwiper, BankOffers |
| bank_igud_logo | /static/bank-igud-logo.svg | PartnersSwiper |
| bank_jerusalem_logo | /static/mobile/banki184-jers.svg | PartnersSwiper |
| bank_hapoalim_logo | /static/bankhapoalim.svg | PartnersSwiper |
| bank_hapoalim_logo_alt | /static/bankhapoalimlogo-1.svg | BankOffers |
| bank_mercantile_logo | /static/bank-of-israel-symbol.svg | PartnersSwiper |
| bank_mizrahi_logo | /static/mizrahitefahotlogo-1.svg | BankOffers |
| how_it_works_icon_1 | /static/frame-14100932552.svg | HowItWorks |
| how_it_works_icon_2 | /static/frame-14100932551.svg | HowItWorks |
| how_it_works_icon_3 | /static/frame-1410093255.svg | HowItWorks |
| service_calculate_mortgage_icon | /static/calculate-mortgage-icon.png | TopServices |
| service_refinance_mortgage_icon | /static/refinance-mortgage-icon.png | TopServices |
| service_calculate_credit_icon | /static/calculate-credit-icon.png | TopServices |
| service_refinance_credit_icon | /static/refinance-credit-icon.png | TopServices |
| speaker_off | /static/speaker-off.svg | SoundButton |
| speaker_on | /static/speaker-on.svg | SoundButton |
| video_poster | /static/Background.png | VideoPoster |
| video_promo | /static/promo.mp4 | VideoPoster |
| audio_promo | /static/promo.mp3 | VideoPoster |
| about_hero_image | /static/about/frame-1410093763@3x.png | about page |
| cooperation_logo | /static/primary-logo05-1.svg | cooperation page |
| cooperation_image_1 | /static/about/frame-14100937611.svg | cooperation page |
| cooperation_image_2 | /static/about/frame-14100937612.svg | cooperation page |
| tech_realt_image | /static/menu/techRealt.png | LawyersFooter |
| contact_email_icon | /static/envelopesimple.svg | Contacts |
| contact_phone_icon | /static/phone.svg | Contacts |

**Screen location for assets:** Use `global_components` or `assets` when seeding. Frontend can load `useContentApi('global_components')` and use `getContent(key)` for image `src`.

**component_type:** Use `image` or `asset` for these items in `content_items`.
