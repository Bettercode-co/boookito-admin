import { ReactElement } from "react";
export interface FooterSmallProps {
  absolute: boolean;
}

export interface AppProps {
  Component;
  pageProps;
}

export interface LayoutProps {
  children: ReactElement<any, any>;
  isHeaderStats?: boolean
}

export interface CardStatsProps {
  statSubtitle: string;
  statTitle: string;
  statArrow: string;
  statPercent: string;
  statPercentColor: string;
  statDescripiron: string;
  statIconName: string;
  statIconColor: string;
}
