const LanguageOptions = [
  { value: "English", label: "English" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Russian", label: "Russian" },
  { value: "French", label: "French" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Thai", label: "Thai" },
  { value: `Chinese (Traditional)`, label: "Chinese" },
];

const Platforms = [
  { value: 2, label: "All" },
  { value: 0, label: "Android" },
  { value: 1, label: "IOS" },
];

const MailType = {
  System: 0,
  Update: 1,
  Reward: 2,        
};


const TypeReward = [
  { value: 1, label: "PVP" },
  { value: 2, label: "Update Version" },
]

export { LanguageOptions, Platforms, MailType, TypeReward };
