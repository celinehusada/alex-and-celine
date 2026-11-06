import type { Gallery } from '../types/wedding';

export const galleries: Gallery[] = [
{
  city: 'Hong Kong',
  blurb: { en: 'Where we first met.', id: 'Tempat kami pertama kali bertemu.' },
  photos: [
  {
    src: "/fc12921a-7b60-4348-9ec6-eaf40aef1aee.jpg",
    alt: 'Alex and Celine on a neon-lit Hong Kong street at night',
    caption: { en: 'Central', id: 'Central' },
    orientation: 'landscape'
  },
  {
    src: "/dfc87429-229f-4d28-9f7e-2a7c7dcc091b.jpg",
    alt: 'Alex and Celine on the Star Ferry',
    caption: { en: 'Star Ferry', id: 'Star Ferry' },
    orientation: 'portrait'
  },
  {
    src: "/d4504da1-2401-4d67-b752-a84100191a22.jpg",
    alt: 'Alex and Celine eating noodles at a Hong Kong street food stall',
    caption: { en: 'Dinner at a dai pai dong', id: 'Makan malam di dai pai dong' },
    orientation: 'landscape'
  }]

},
{
  city: 'London',
  blurb: { en: 'A city we love to visit together.', id: 'Kota yang selalu ingin kami kunjungi bersama.' },
  photos: [
  {
    src: "/4a87d3ed-dc4f-4e9b-abbf-e3e61cf5ceed.jpg",
    alt: 'Alex and Celine walking down a London street',
    caption: { en: 'Marylebone', id: 'Marylebone' },
    orientation: 'landscape'
  },
  {
    src: "/9b33c3e0-03e7-4f72-830f-861b5ad5a1e4.jpg",
    alt: 'Alex and Celine on the top deck of a London bus',
    caption: { en: 'On the top deck', id: 'Di dek atas bus' },
    orientation: 'portrait'
  },
  {
    src: "/c717ba96-b08d-4c81-a257-8a18733a2527.jpg",
    alt: 'Alex jogging through a London park while Celine waves from a bench',
    caption: { en: 'Morning in the park', id: 'Pagi di taman' },
    orientation: 'landscape'
  }]

},
{
  city: 'Bali',
  blurb: { en: 'Where we will say “I do”.', id: 'Tempat kami akan mengucap janji suci.' },
  photos: [
  {
    src: "/1306f0aa-632e-44c6-ac9d-902a4de9f962.jpg",
    alt: 'Alex and Celine on a clifftop above the ocean in Bali',
    caption: { en: 'The cliffs', id: 'Di atas tebing' },
    orientation: 'portrait'
  },
  {
    src: "/fe330110-66eb-4116-b21b-1f3dbf36a252.jpg",
    alt: 'Alex and Celine walking along a Nusa Dua beach at sunset',
    caption: { en: 'Nusa Dua at sunset', id: 'Senja di Nusa Dua' },
    orientation: 'landscape'
  },
  {
    src: "/16cc91c0-e65b-4c08-888a-772ddf9c7d0c.jpg",
    alt: 'Alex peeling a mango for Celine on a villa terrace',
    caption: { en: 'An afternoon at the villa', id: 'Sore di vila' },
    orientation: 'portrait'
  }]

}];