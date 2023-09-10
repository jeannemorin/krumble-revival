'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBeerBottle, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiMaterialsScience,
  GiWindmill,
  GiWoodFrame
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsBriefcase, BsCameraVideo, BsCarFront, BsPaintBucket, BsSnow } from 'react-icons/bs';
import { IoDiamond, IoGameControllerOutline } from 'react-icons/io5';
import { MdOutlineCamera, MdOutlineSportsMotorsports, MdOutlineSportsVolleyball, MdOutlineVilla, MdSportsGymnastics } from 'react-icons/md';
import { LiaChessSolid, LiaCocktailSolid, LiaCookieBiteSolid, LiaGuitarSolid, LiaHandHoldingHeartSolid, LiaHandshake, LiaRainbowSolid, LiaTableTennisSolid } from 'react-icons/lia'
import { PiPokerChip } from 'react-icons/pi'
import { FaArrowTrendUp, FaChessBoard } from 'react-icons/fa6'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import { CiMicrophoneOn } from 'react-icons/ci'
import { LuPartyPopper } from 'react-icons/lu'

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { BiWorld } from 'react-icons/bi';

export const categories = [
  
  
  {
    label: 'Sport',
    icon: MdOutlineSportsVolleyball,
    description: 'Cette association est regroupe les amateurs de sport !',
  },
  {
    label: 'Musique',
    icon: LiaGuitarSolid,
    description: 'Cette association groove !',
  },
  {
    label: 'Photographie',
    icon: MdOutlineCamera,
    description: 'Cette association réunit les photographes en herbe !',
  },
  {
    label: 'BDE',
    icon: LuPartyPopper,
    description: 'Cette association est un Bureau des élèves !',
  },
  
  {
    label: 'Audiovisuel',
    icon: BsCameraVideo,
    description: 'Cette association fait dans le ciné !',
  },
  {
    label: 'Food',
    icon: LiaCookieBiteSolid,
    description: 'Cette association réunit les photographes en herbe !',
  },
  {
    label: 'BDS',
    icon: LiaTableTennisSolid,
    description: 'Cette association est un Bureau des Sports !',
  },
  {
    label: 'Arts',
    icon: BsPaintBucket,
    description: 'Cette association regorge de créatif !',
  },
  {
    label: 'Bar',
    icon: GiBeerBottle,
    description: 'Cette association regorge de créatif !',
  },
  {
    label: 'Danse',
    icon: MdSportsGymnastics,
    description: 'Cette association met le feu à la piste !',
  },
  {
    label: 'Caritatif',
    icon: LiaHandHoldingHeartSolid,
    description: 'Cette association aide son prochain !',
  },
  {
    label: 'Engagée',
    icon: LiaHandshake,
    description: 'Cette association est engagé pour une cause sociale !',
  },
  {
    label: 'BDA',
    icon: GiWoodFrame,
    description: 'Cette association est un Bureau des Arts !',
  },
  {
    label: 'Conférences',
    icon: CiMicrophoneOn,
    description: 'Cette association donne des conférences !',
  },
  {
    label: 'Soirée',
    icon: LiaCocktailSolid,
    description: 'Cette association fait vibrer son campus !',
  },
  {
    label: 'Innovation',
    icon: HiOutlineRocketLaunch,
    description: 'Cette association invente le monde de demain !',
  },
  {
    label: 'LGBTQ+',
    icon: LiaRainbowSolid,
    description: 'Cette association réunit les photographes en herbe !',
  },
  {
    label: 'World',
    icon: BiWorld,
    description: 'Cette association est ouverte sur le monde !',
  },
  {
    label: 'Automobile',
    icon: BsCarFront,
    description: 'Cette association fait chauffer le moteur !',
  },
  {
    label: 'Racing',
    icon: MdOutlineSportsMotorsports,
    description: 'Cette association fait chauffer le moteur !',
  },
  {
    label: 'Echecs',
    icon: LiaChessSolid,
    description: 'Cette association se creuse les méninges !',
  },
  {
    label: 'Jeux',
    icon: FaChessBoard,
    description: 'Cette association joue sur tous les terrains !',
  },
  {
    label: 'Poker',
    icon: PiPokerChip,
    description: 'Cette association va vous bluffer !',
  },
  {
    label: 'Geek',
    icon: IoGameControllerOutline,
    description: 'Cette association est le répère des geeks !',
  },
  {
    label: 'Tech',
    icon: GiMaterialsScience,
    description: 'Cette association regarde vers le futur !',
  },
  {
    label: 'Finance',
    icon: FaArrowTrendUp,
    description: 'Cette association suit les marchés !',
  },

]



const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
  
    if (!isMainPage) {
      return null;
    }
  
    return (
      <Container>
        <div
          className="
            pt-4
            flex 
            flex-row 
            items-center 
            justify-between
            overflow-x-auto
          "
        >
          {categories.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
      </Container>
    );
  }
   
  export default Categories;