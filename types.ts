export interface HeroData {
  title_es: string
  title_en: string
  subtitle_es: string
  subtitle_en: string
  btn1Text_es: string
  btn1Text_en: string
  btn1Link: string
  btn2Text_es: string
  btn2Text_en: string
  btn2Link: string
  backgroundImage: any
}


export interface ServicePoint {
  id: string
  title_es: string
  title_en: string
  description_es: string
  description_en: string
  image: any
}

export interface ContentData {
  hero: HeroData
  services: {
    title_es: string
    title_en: string
    subtitle_es: string
    subtitle_en: string
    points: ServicePoint[]
  }
  liveTitle_es: string
  liveTitle_en: string
  whyUs_es: string[]
  whyUs_en: string[]
  footerTag_es: string
  footerTag_en: string
}


export interface TourPoint {
  id: string;
  title: string;
  description: string;
  imageUrl: string;  // Cambia 'image' por 'imageUrl'
  details: string[];
  price: string;
}

export interface Service {
  title: string;
  icon: string;
}