import type { NavSectionProps } from "../components/shared/nav-section";
import { SvgColor } from "../components/shared/svg-color";
import { CONFIG } from "../global-config";
import { paths } from "../routes/paths";


const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  home: icon('home'),
}
export const navData: NavSectionProps['data'] = [
  {
    items: [
      {
        title: 'sidebar.home',
        path: paths.dashboard.root,
        icon: ICONS.home

      },

    ],
  },
];
