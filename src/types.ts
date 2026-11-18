export interface InviteConfig {
  groom: string;
  bride: string;
  titleLine: string;
  date: string;
  weekday: string;
  time: string;
  families: {
    groomSide: { label: string; lines: string[] };
    brideSide: { label: string; lines: string[] };
  };
  events: {
    name: string;
    date: string;
    time: string;
    venueName: string;
    address: string;
    mapsQuery: string;
  }[];
  quotes: string[];
  photos: string[];
  compliments: string[];
  contacts: { name: string; phone: string }[];
  thingsToNote: string[];
  instagram: string;
  whatsappRsvp: string;
  music: string;
}
