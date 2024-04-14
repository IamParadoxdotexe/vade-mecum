import { AttributeKey } from './Character';
import { CharacterComputations } from './WorldKit';

export type Perk = {
  key: string;
  name: string;
  description: string;
  requirement?: {
    attributeKey: AttributeKey;
    skillKey: string;
    skillRequirement: number;
  };
  computed?: CharacterComputations;
};

export const PERKS: Perk[] = [
  {
    key: 'bloody_knuckles',
    name: 'Bloody Knuckles',
    description:
      'You double your Power bonus on skill checks to make a melee attack without a weapon.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'power',
      skillRequirement: 1
    }
  },
  {
    key: 'dead_lift',
    name: 'Dead Lift',
    description: 'You double your Power bonus on skill checks to lift or move a heavy object.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'power',
      skillRequirement: 2
    }
  },
  {
    key: 'battering_ram',
    name: 'Battering Ram',
    description:
      'You double your Power bonus on skill checks to force your way through an obstacle.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'power',
      skillRequirement: 3
    }
  },
  {
    key: 'human_shield',
    name: 'Human Shield',
    description: 'You act as light cover in combat for all characters within 10ft behind you.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'fortitude',
      skillRequirement: 1
    }
  },
  {
    key: 'pack_mule',
    name: 'Pack Mule',
    description:
      'Your carrying capacity is increased by a number of slots equal to your Strength + Fortitude.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'fortitude',
      skillRequirement: 2
    },
    computed: {
      carryingCapacity: '[base] + [attribute.strength] + [skill.fortitude]'
    }
  },
  {
    key: 'night_owl',
    name: 'Night Owl',
    description:
      'During a Rest, you can complete an additional Rest Activity with -1 disadvantage.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'fortitude',
      skillRequirement: 3
    }
  },
  {
    key: 'trainer',
    name: 'Trainer',
    description: 'You give allies +1 advantage on Athletics checks.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'athletics',
      skillRequirement: 1
    }
  },
  {
    key: 'free_solo',
    name: 'Free Solo',
    description: 'You double your Athletics bonus on skill checks to climb without equipment.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'athletics',
      skillRequirement: 2
    }
  },
  {
    key: 'big_brother',
    name: 'Big Brother',
    description:
      'If an ally within 10ft is hit with an attack, you can leap in to switch places, taking all damage.',
    requirement: {
      attributeKey: 'strength',
      skillKey: 'athletics',
      skillRequirement: 3
    }
  },
  {
    key: 'locksmith',
    name: 'Locksmith',
    description: 'You double your Precision bonus on skill checks to pick a lock.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'precision',
      skillRequirement: 1
    }
  },
  {
    key: 'steady_aim',
    name: 'Steady Aim',
    description:
      'You double your Precision bonus on skill checks to make a ranged attack from behind cover.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'precision',
      skillRequirement: 2
    }
  },
  {
    key: 'snipers_nest',
    name: "Sniper's Nest",
    description:
      'You double your Precision bonus on skill checks to make a ranged attack from an elevated position.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'precision',
      skillRequirement: 3
    }
  },
  {
    key: 'black_mass',
    name: 'Black Mass',
    description: 'You double your Stealth bonus on skill checks when cloaked by natural darkness.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'stealth',
      skillRequirement: 1
    }
  },
  {
    key: 'lone_wolf',
    name: 'Lone Wolf',
    description: 'You double your Stealth bonus on skill checks while on your own.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'stealth',
      skillRequirement: 2
    }
  },
  {
    key: 'assassin',
    name: 'Assassin',
    description:
      'When an enemy is surprised, you can make a weapon attack with advantage equivalent to your Stealth.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'stealth',
      skillRequirement: 3
    }
  },
  {
    key: 'escapist',
    name: 'Escapist',
    description: 'You double your Agility bonus on skill checks to escape someone or a situation.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'agility',
      skillRequirement: 1
    }
  },
  {
    key: 'untouchable',
    name: 'Untouchable',
    description: 'Opportunity attacks on you have disadvantage equivalent to your Agility.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'agility',
      skillRequirement: 2
    }
  },
  {
    key: 'fleet_foot',
    name: 'Fleet Foot',
    description: 'You are not impeded by Rough Terrain.',
    requirement: {
      attributeKey: 'dexterity',
      skillKey: 'agility',
      skillRequirement: 3
    }
  },
  {
    key: 'book_worm',
    name: 'Book Worm',
    description:
      'You double your Comprehension bonus on skill checks to comprehend written information.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'comprehension',
      skillRequirement: 1
    }
  },
  {
    key: 'linguist',
    name: 'Linguist',
    description:
      'You double your Comprehension bonus on skill checks to comprehend a foreign language.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'comprehension',
      skillRequirement: 2
    }
  },
  {
    key: 'strategist',
    name: 'Strategist',
    description:
      'When you plan a surprise attack, you add +3 advantage to the Stealth roll to surprise the enemy.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'comprehension',
      skillRequirement: 3
    }
  },
  {
    key: 'spiritual_healer',
    name: 'Spiritual Healer',
    description: 'You can stabilize allies from up to 15 ft away.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'medicine',
      skillRequirement: 1
    }
  },
  {
    key: 'field_medic',
    name: 'Field Medic',
    description:
      'On a stalemate Medicine check to stabilize an ally, you decrease the injury level by one.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'medicine',
      skillRequirement: 2
    }
  },
  {
    key: 'witch_doctor',
    name: 'Witch Doctor',
    description:
      'Even when incapacitated with a deadly injury, you can roll to stabilize yourself.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'medicine',
      skillRequirement: 3
    }
  },
  {
    key: 'junk_collector',
    name: 'Junk Collector',
    description: 'You double your Innovation bonus on skill checks to craft an item using junk.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'innovation',
      skillRequirement: 1
    }
  },
  {
    key: 'inventor',
    name: 'Inventor',
    description: 'You double your Innovation bonus on skill checks to build something unique.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'innovation',
      skillRequirement: 2
    }
  },
  {
    key: 'repairman',
    name: 'Repairman',
    description:
      'On a successful Innovation check to repair an item, you can also repair a second item.',
    requirement: {
      attributeKey: 'intelligence',
      skillKey: 'innovation',
      skillRequirement: 3
    }
  },
  {
    key: 'polygraph',
    name: 'Polygraph',
    description: 'You double your Intuition bonus on skill checks to determine if an NPC is lying.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'intuition',
      skillRequirement: 1
    }
  },
  {
    key: 'empath',
    name: 'Empath',
    description:
      "You double your Intuition bonus on skill checks to determine an NPC's true emotional state.",
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'intuition',
      skillRequirement: 2
    }
  },
  {
    key: 'counselor',
    name: 'Counselor',
    description:
      'After a successful Intuition check against an NPC, you get +3 advantage on your next Influence check using that information.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'intuition',
      skillRequirement: 3
    }
  },
  {
    key: 'relatable',
    name: 'Relatable',
    description:
      "You double your Influence bonus on skill checks against NPC's from the same race or class.",
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'influence',
      skillRequirement: 1
    }
  },
  {
    key: 'identity_theft',
    name: 'Identity Theft',
    description:
      'You double your Influence bonus on skill checks while impersonating someone else.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'influence',
      skillRequirement: 2
    }
  },
  {
    key: 'folk_hero',
    name: 'Folk Hero',
    description: 'You double the advantage given to Influence checks by Renown.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'influence',
      skillRequirement: 3
    }
  },
  {
    key: 'gold_rush',
    name: 'Gold Rush',
    description:
      'After passing an Investigation check to loot after combat, you can roll a Luck check. On a success, you find double the amount of currency units.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'luck',
      skillRequirement: 1
    }
  },
  {
    key: 'serendipity',
    name: 'Serendipity',
    description: 'Once per Rest, you can replace a failed skill check with a new Luck check.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'luck',
      skillRequirement: 2
    }
  },
  {
    key: 'close_call',
    name: 'Close Call',
    description:
      'Once per Rest, you can roll a Luck check after being incapacitated. On a success, you are reduced to 1 HP instead.',
    requirement: {
      attributeKey: 'charisma',
      skillKey: 'luck',
      skillRequirement: 3
    }
  },
  {
    key: 'architect',
    name: 'Architect',
    description: 'You double your Insight bonus on skill checks against man-made structures.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'insight',
      skillRequirement: 1
    }
  },
  {
    key: 'ecologist',
    name: 'Ecologist',
    description:
      'You double your Insight bonus on skill checks against natural phenomena, such as animals, plants, weather, and terrain.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'insight',
      skillRequirement: 2
    }
  },
  {
    key: 'inspector',
    name: 'Inspector',
    description:
      '	After a successful Insight check, you get +3 advantage on your next Investigation/Detection check using that information.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'insight',
      skillRequirement: 3
    }
  },
  {
    key: 'combat_ready',
    name: 'Combat Ready',
    description: 'You add 2D6 to your initiative roll.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'detection',
      skillRequirement: 1
    },
    computed: {
      initiative: '[base] + 2'
    }
  },
  {
    key: 'sixth_sense',
    name: 'Sixth Sense',
    description: "You can't be surprised during combat.",
    requirement: {
      attributeKey: 'perception',
      skillKey: 'detection',
      skillRequirement: 2
    }
  },
  {
    key: 'one_eye_open',
    name: 'One Eye Open',
    description: 'You can keep watch for enemies during a Rest without expending a Rest Activity.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'detection',
      skillRequirement: 3
    }
  },
  {
    key: 'loot_goblin',
    name: 'Loot Goblin',
    description: 'You double your Investigation bonus on skill checks to loot after combat.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'investigation',
      skillRequirement: 1
    }
  },
  {
    key: 'emergency_exit',
    name: 'Emergency Exit',
    description:
      'You double your Investigation bonus on skill checks to find an exit or escape route.',
    requirement: {
      attributeKey: 'perception',
      skillKey: 'investigation',
      skillRequirement: 2
    }
  },
  {
    key: 'detective',
    name: 'Detective',
    description:
      "You double your Investigation bonus on skill checks to search for clues in pursuit of your personal or party's goal.",
    requirement: {
      attributeKey: 'perception',
      skillKey: 'investigation',
      skillRequirement: 3
    }
  }
];
