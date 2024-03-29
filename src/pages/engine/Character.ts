import { v4 as uuid } from 'uuid';

export type Attribute = {
  label: string;
  value: number;
  skills: {
    [key: string]: Skill;
  };
};

type Skill = {
  label: string;
  value: number;
};

type StrengthAttribute = Attribute & {
  skills: {
    power: Skill;
    fortitude: Skill;
    athletics: Skill;
  };
};

type DexterityAttribute = Attribute & {
  skills: {
    precision: Skill;
    stealth: Skill;
    agility: Skill;
  };
};

type IntelligenceAttribute = Attribute & {
  skills: {
    comprehension: Skill;
    medicine: Skill;
    innovation: Skill;
  };
};

type CharismaAttribute = Attribute & {
  skills: {
    intuition: Skill;
    speech: Skill;
    barter: Skill;
  };
};

type PerceptionAttribute = Attribute & {
  skills: {
    insight: Skill;
    detection: Skill;
    investigation: Skill;
  };
};

type Attributes = {
  strength: StrengthAttribute;
  dexterity: DexterityAttribute;
  intelligence: IntelligenceAttribute;
  charisma: CharismaAttribute;
  perception: PerceptionAttribute;
};

export type AttributeKey = keyof Attributes;

const DEFAULT_ATTRIBUTES: Attributes = {
  strength: {
    label: 'Strength',
    value: 1,
    skills: {
      power: { label: 'Power', value: 0 },
      fortitude: { label: 'Fortitude', value: 0 },
      athletics: { label: 'Athletics', value: 0 }
    }
  },
  dexterity: {
    label: 'Dexterity',
    value: 1,
    skills: {
      precision: { label: 'Precision', value: 0 },
      stealth: { label: 'Stealth', value: 0 },
      agility: { label: 'Agility', value: 0 }
    }
  },

  intelligence: {
    label: 'Intelligence',
    value: 1,
    skills: {
      comprehension: { label: 'Comprehension', value: 0 },
      medicine: { label: 'Medicine', value: 0 },
      innovation: { label: 'Innovation', value: 0 }
    }
  },
  charisma: {
    label: 'Charisma',
    value: 1,
    skills: {
      intuition: { label: 'Intuition', value: 0 },
      speech: { label: 'Speech', value: 0 },
      barter: { label: 'Barter', value: 0 }
    }
  },
  perception: {
    label: 'Perception',
    value: 1,
    skills: {
      insight: { label: 'Insight', value: 0 },
      detection: { label: 'Detection', value: 0 },
      investigation: { label: 'Investigation', value: 0 }
    }
  }
};

export type Character = {
  key: string;
  name: string;
  description: string;
  level: number;
  classKey?: string;
  classItemDescription?: string;
  race?: string;
  attributes: Attributes;
  hitPoints: number;
  classPoints: number;
  perkKeys: string[];
  itemQuantities: { key: string; quantity: number }[];
};

export const DEFAULT_CHARACTER: Character = {
  key: uuid(),
  name: '',
  description: '',
  level: 1,
  attributes: DEFAULT_ATTRIBUTES,
  hitPoints: 12,
  classPoints: 0,
  perkKeys: [],
  itemQuantities: [{ key: 'currency', quantity: 0 }]
};
