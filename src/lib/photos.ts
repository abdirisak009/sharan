import type { StaticImageData } from "next/image";
import riverAerial from "@/assets/photos/river-aerial.jpg";
import farmAfgoi from "@/assets/photos/farm-afgoi.jpg";
import floodJowharVillage from "@/assets/photos/flood-jowhar-village.jpg";
import floodFamilies from "@/assets/photos/flood-families.jpg";
import idpCamp from "@/assets/photos/idp-camp.jpg";
import idpWater from "@/assets/photos/idp-water.jpg";
import classroom from "@/assets/photos/classroom.jpg";
import clinic from "@/assets/photos/clinic.jpg";
import elderCanal from "@/assets/photos/elder-canal.jpg";
import riverWaterWomen from "@/assets/photos/river-water-women.jpg";

// Illustrative photos of the Shabelle basin from Wikimedia Commons. They are
// not SHARAN programme photos; replace them with SHARAN's own photos as they
// become available (keep the same keys so every page updates).
export type Photo = {
  src: StaticImageData;
  alt: string;
  place: string;
  credit: string;
  license: string;
  source: string;
};

export const photos = {
  riverAerial: {
    src: riverAerial,
    alt: "Aerial view of the Shabelle River winding through green farmland in Hirshabelle State",
    place: "Shabelle River, Hirshabelle State",
    credit: "ATMIS Somalia",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:ATMIS_Support_in_Beletweyne.jpg",
  },
  farmAfgoi: {
    src: farmAfgoi,
    alt: "Green riverside farms and a small boat on the Shabelle River at Afgooye",
    place: "Shabelle River at Afgooye, Lower Shabelle",
    credit: "Amal Aweis",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Afgoi_River,.jpg",
  },
  floodJowharVillage: {
    src: floodJowharVillage,
    alt: "Homes standing in brown flood water after the Shabelle burst its banks near Jowhar",
    place: "Barey village outside Jowhar, after the Shabelle burst its banks",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:2021_05_30_AMISOM_NFI_Donation.jpg",
  },
  floodFamilies: {
    src: floodFamilies,
    alt: "Families with donkey carts carrying their belongings away from flooded homes",
    place: "Families displaced by floods, Beledweyne",
    credit: "UNSOM",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:2020_05_29_Belet_Weyne_Floods-1.jpg",
  },
  idpCamp: {
    src: idpCamp,
    alt: "Rows of makeshift shelters in a camp for displaced families",
    place: "Camp for flood-displaced families, Hiraan",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:BELET_WEYNE_FLOOD_IDPs_(15104485283).jpg",
  },
  idpWater: {
    src: idpWater,
    alt: "Women and children collecting water in jerrycans at a stone water tank",
    place: "Collecting water in a displacement site, Hiraan",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:BELET_WEYNE_FLOOD_IDPs_(15538436328).jpg",
  },
  classroom: {
    src: classroom,
    alt: "A girl writing on the blackboard in a newly renovated classroom",
    place: "A renovated primary school classroom",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:2020_08_20_Classrooms_Handover-8_(50250381828).jpg",
  },
  clinic: {
    src: clinic,
    alt: "A mother sitting with her young child at a community clinic",
    place: "A mother and child at a community clinic, Beledweyne",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:2013_03_30_Belet_Weyne_Clinic_E.jpg_(8604600085).jpg",
  },
  elderCanal: {
    src: elderCanal,
    alt: "An elder washing at a tree-lined irrigation canal fed by the Shabelle",
    place: "An irrigation canal near the Shabelle",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:2013_09_10_Belet_Weyne_Snapshots_2_F.jpg_(9723672898).jpg",
  },
  riverWaterWomen: {
    src: riverWaterWomen,
    alt: "Women leading donkeys loaded with water containers across dry scrubland",
    place: "Carrying water from the Shabelle in the dry season, Hiraan",
    credit: "AMISOM Public Information",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:2013_09_10_Belet_Weyne_Snapshots_2_B.jpg_(9714860461).jpg",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
