
export interface District {
  name: string;
}

export interface Province {
  name: string;
  districts: District[];
}

export const nepalProvinces: Province[] = [
  {
    name: "Koshi Province",
    districts: [
      { name: "Bhojpur" },
      { name: "Dhankuta" },
      { name: "Ilam" },
      { name: "Jhapa" },
      { name: "Khotang" },
      { name: "Morang" },
      { name: "Okhaldhunga" },
      { name: "Panchthar" },
      { name: "Sankhuwasabha" },
      { name: "Solukhumbu" },
      { name: "Sunsari" },
      { name: "Taplejung" },
      { name: "Terhathum" },
      { name: "Udayapur" }
    ]
  },
  {
    name: "Madhesh Province",
    districts: [
      { name: "Bara" },
      { name: "Dhanusa" },
      { name: "Mahottari" },
      { name: "Parasi" },
      { name: "Parsa" },
      { name: "Rautahat" },
      { name: "Saptari" },
      { name: "Siraha" }
    ]
  },
  {
    name: "Bagmati Province",
    districts: [
      { name: "Bhaktapur" },
      { name: "Chitwan" },
      { name: "Dhading" },
      { name: "Dolakha" },
      { name: "Kathmandu" },
      { name: "Kavrepalanchok" },
      { name: "Lalitpur" },
      { name: "Makwanpur" },
      { name: "Nuwakot" },
      { name: "Ramechhap" },
      { name: "Rasuwa" },
      { name: "Sindhuli" },
      { name: "Sindhupalchok" }
    ]
  },
  {
    name: "Gandaki Province",
    districts: [
      { name: "Baglung" },
      { name: "Gorkha" },
      { name: "Kaski" },
      { name: "Lamjung" },
      { name: "Manang" },
      { name: "Mustang" },
      { name: "Myagdi" },
      { name: "Nawalpur" },
      { name: "Parbat" },
      { name: "Syangja" },
      { name: "Tanahun" }
    ]
  },
  {
    name: "Lumbini Province",
    districts: [
      { name: "Arghakhanchi" },
      { name: "Banke" },
      { name: "Bardiya" },
      { name: "Dang" },
      { name: "Eastern Rukum" },
      { name: "Gulmi" },
      { name: "Kapilvastu" },
      { name: "Palpa" },
      { name: "Parasi" },
      { name: "Pyuthan" },
      { name: "Rolpa" },
      { name: "Rupandehi" }
    ]
  },
  {
    name: "Karnali Province",
    districts: [
      { name: "Dailekh" },
      { name: "Dolpa" },
      { name: "Humla" },
      { name: "Jajarkot" },
      { name: "Jumla" },
      { name: "Kalikot" },
      { name: "Mugu" },
      { name: "Salyan" },
      { name: "Surkhet" },
      { name: "Western Rukum" }
    ]
  },
  {
    name: "Sudurpashchim Province",
    districts: [
      { name: "Achham" },
      { name: "Bajhang" },
      { name: "Bajura" },
      { name: "Baitadi" },
      { name: "Dadeldhura" },
      { name: "Darchula" },
      { name: "Doti" },
      { name: "Kailali" },
      { name: "Kanchanpur" }
    ]
  }
];
