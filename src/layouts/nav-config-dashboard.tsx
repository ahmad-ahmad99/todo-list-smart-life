import type { NavSectionProps } from "../components/shared/nav-section";
import { CONFIG } from "../global-config";
import { paths } from "../routes/paths";


export const navData: NavSectionProps['data'] = [
  {
    items: [
      {
        title: 'Home',
        path: paths.dashboard.root,
        icon: <img src={`${CONFIG.assetsDir}/assets/icons/home/homeLink.svg`} />

      },

    ],
  },
];
