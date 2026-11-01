import type { CatPattern } from '../cat/types'

export type BreedTag = {
  label: string
  tone?: 'lilac' | 'pink' | 'blue'
}

export type BreedStat = {
  label: string
  value: string
  hint: string
  bar?: number
}

export type Breed = {
  id: string
  name: string
  line: string
  eyebrow: string
  summary: string
  coat: string
  pattern: CatPattern
  story: string
  note: string
  stats: BreedStat[]
  tags: BreedTag[]
  action: string
  saveLabel: string
  asideLabel: string
}

export const breeds: Breed[] = [
  {
    id: 'british-shorthair',
    name: 'British Shorthair',
    line: 'Plush and unhurried',
    eyebrow: 'Coat · Temperament · Home',
    summary:
      'A dense coat, round face, and quiet company. Content in a small home when the day stays calm.',
    coat: '#b3aec4',
    pattern: 'solid',
    story:
      'A round face, copper eyes, and a coat that feels like short velvet. This cat keeps its own hours, stays close without asking for a show, and settles into a small home when the rooms stay calm.',
    note:
      'Brush once a week to lift the dense undercoat. Play stays short and on the floor. A sunny seat, a steady routine, and quiet company are enough.',
    stats: [
      { label: 'Calm index', value: 'Settled', hint: 'Content to watch the room', bar: 86 },
      { label: 'Voice', value: 'Soft', hint: 'A brief meow, then silence' },
      { label: 'Coat care', value: 'Weekly', hint: 'Dense plush coat' },
      { label: 'Company', value: 'Beside you', hint: 'Near, never in the way' },
    ],
    tags: [
      { label: 'Plush coat' },
      { label: 'Quiet', tone: 'pink' },
      { label: 'Apartment', tone: 'blue' },
    ],
    action: 'Open breed guide',
    saveLabel: 'Save this breed',
    asideLabel: 'All breeds',
  },
  {
    id: 'siamese',
    name: 'Siamese',
    line: 'Vocal and devoted',
    eyebrow: 'Voice · Energy · Company',
    summary:
      'A slim body, large ears, and a loud hello. Wants people nearby and will say so.',
    coat: '#f0d2aa',
    pattern: 'solid',
    story:
      'A slim body, deep blue eyes, and a voice that carries down the hall. This cat follows the person it has chosen and will say so, often, until someone answers.',
    note:
      'The coat needs almost no brushing. What it does need is company: a lap, a conversation, and a door that is not shut for long.',
    stats: [
      { label: 'Voice index', value: 'Loud', hint: 'Will tell you about the day', bar: 92 },
      { label: 'Energy', value: 'High', hint: 'Follows you from room to room' },
      { label: 'Coat care', value: 'Light', hint: 'Short coat, little brushing' },
      { label: 'Company', value: 'Devoted', hint: 'Wants a person in sight' },
    ],
    tags: [
      { label: 'Talkative' },
      { label: 'Devoted', tone: 'pink' },
      { label: 'Active', tone: 'blue' },
    ],
    action: 'Open breed guide',
    saveLabel: 'Save this breed',
    asideLabel: 'All breeds',
  },
  {
    id: 'maine-coon',
    name: 'Maine Coon',
    line: 'Gentle and large',
    eyebrow: 'Size · Coat · Family',
    summary:
      'A long body, tufted ears, and a soft voice for such a big cat. Needs room to stretch.',
    coat: '#e0893f',
    pattern: 'stripes',
    story:
      'A long body, tufted ears, and a soft chirp that does not match the size. This cat is gentle in a busy room and needs space to stretch out all the way.',
    note:
      'Comb the belly and the trousers of the coat a few times a week. Offer a tall perch and a floor that has room for a real run.',
    stats: [
      { label: 'Size', value: 'Large', hint: 'Room to stretch matters', bar: 78 },
      { label: 'Voice', value: 'Chirp', hint: 'A soft trill for a big cat' },
      { label: 'Coat care', value: 'Regular', hint: 'Long coat, comb the belly' },
      { label: 'Company', value: 'Family', hint: 'Gentle in a busy home' },
    ],
    tags: [
      { label: 'Large' },
      { label: 'Gentle', tone: 'pink' },
      { label: 'Family', tone: 'blue' },
    ],
    action: 'Open breed guide',
    saveLabel: 'Save this breed',
    asideLabel: 'All breeds',
  },
  {
    id: 'ragdoll',
    name: 'Ragdoll',
    line: 'Soft and steady',
    eyebrow: 'Temperament · Coat · Care',
    summary:
      'A pale coat, blue eyes, and a lap that goes limp when held. Easy company, regular brushing.',
    coat: '#f7f4ef',
    pattern: 'spots',
    story:
      'A pale coat, blue eyes, and a body that goes loose when it is picked up. This cat is easy company: it follows quietly and is happy to stay in a lap.',
    note:
      'The silky coat mats if it is left alone, so a weekly brush keeps it soft. It prefers a calm room and a person who sits still for a while.',
    stats: [
      { label: 'Lap index', value: 'Steady', hint: 'Goes loose when held', bar: 90 },
      { label: 'Voice', value: 'Quiet', hint: 'A small sound, rarely a speech' },
      { label: 'Coat care', value: 'Brush', hint: 'Silky coat, weekly comb' },
      { label: 'Company', value: 'Close', hint: 'Happy as a shadow on the sofa' },
    ],
    tags: [
      { label: 'Relaxed' },
      { label: 'Affectionate', tone: 'pink' },
      { label: 'Brush weekly', tone: 'blue' },
    ],
    action: 'Open breed guide',
    saveLabel: 'Save this breed',
    asideLabel: 'All breeds',
  },
]
