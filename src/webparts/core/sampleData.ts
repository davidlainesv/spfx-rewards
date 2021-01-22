import { IRewardCatalogListItem } from "./model";
const achieverBadge: string = require('../../../assets/achiever-badge.png');
const awesomeBadge: string = require('../../../assets/awesome-badge.png');
const coachBadge: string = require('../../../assets/coach-badge.png');
const courageBadge: string = require('../../../assets/courage-badge.png');
const creativeBadge: string = require('../../../assets/creative-badge.png');
const inclusiveBadge: string = require('../../../assets/inclusive-badge.png');
const kindHearBadge: string = require('../../../assets/kind-heart-badge.png');
const leadershipBadge: string = require('../../../assets/leadership-badge.png');

export const rewardsCatalog: IRewardCatalogListItem[] = [
  {
    Id: 1,
    ImageUrl: achieverBadge,
    Title: "Achiever",
    TextColor: "#D36E70",
    BackgroundColor: "#E3F4FC"
  },
  {
    Id: 2,
    ImageUrl: awesomeBadge,
    Title: "Awesome",
    TextColor: "#8283B2",
    BackgroundColor: "#D1EFF2"
  },
  {
    Id: 3,
    ImageUrl: coachBadge,
    Title: "Coach",
    TextColor: "#6AA55A",
    BackgroundColor: "#DBF1D6"
  },
  {
    Id: 4,
    ImageUrl: courageBadge,
    Title: "Courage",
    TextColor: "#DC5041",
    BackgroundColor: "#FCF6C8"
  },
  {
    Id: 5,
    ImageUrl: creativeBadge,
    Title: "Creative",
    TextColor: "#CF9D50",
    BackgroundColor: "#FCF6C8"
  },
  {
    Id: 6,
    ImageUrl: inclusiveBadge,
    Title: "Inclusive",
    TextColor: "#3C77BB",
    BackgroundColor: "#E2F4FC"
  },
  {
    Id: 7,
    ImageUrl: kindHearBadge,
    Title: "Kind Heart",
    TextColor: "#D36D6E",
    BackgroundColor: "#F4DEDE"
  },
  {
    Id: 8,
    ImageUrl: leadershipBadge,
    Title: "Leadership",
    TextColor: "#419098",
    BackgroundColor: "#D2EAEC"
  }
];