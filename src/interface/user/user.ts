import { Role } from "./login";

export type Locale = "zh_CN" | "en_US";

export interface UserState {
  userName: string;

  /** menu list for init tagsView */
  // menuList: MenuChild[];
  role: Role;

  /** user's device */
  // device: Device;
  /** menu collapsed status */
  collapsed: boolean;
  showSocial: boolean;

  /** notification count */
  noticeCount: number;

  /** user's language */
  locale: Locale;

  webview?: WebViewObject;

  user?: User;
  visitor?: Visitor;
  dataInfoBit?: Array<DataBit>;
  verifyToken: string;
  authSendCode: boolean;
  isPageHome: boolean;
}

export interface WebViewObject {
  distinct_id?: string;

  public_game_token_key?: string;

  user_access_token?: string;
}

export type AuthWith = "credential" | "phone";
export interface AuthObject {
  authVerifyLogin?: boolean;
  tokenVerifyLogin?: string;
  authVerifyRegister?: boolean;
  tokenVerifyRegister?: string;
  authVerifyForgot?: boolean;
  tokenVerifyForgot?: string;
  methodForgot?: string;
  accessToken?: string;
  /** login status */
  logged: boolean;
  authWith?: AuthWith;
}

export interface TabObject {
  tabIndex: number;
}

export interface User {
  id?: number;
  userName?: string;
  email?: string;
  phone?: string;
  nickName?: string;
  avatarUrl?: string;
  userEarningConfig?: UserEarningConfig;
  userEarningResponse?: UserEarningResponse;
  userProfile?: UserProfile;
}

export interface UserProfile {
  avatarUrl?: string;
  name?: string;
  nickname?: string;
  userName?: string;
}
export interface UserEarningResponse {
  bitGem: 0;
  bitPlay: 0;
  bitStar: 0;
  luckyTicket: 0;
}
export interface UserEarningConfig {
  activeUserBitCard: InfoBitStar;
  currentSpeed: InfoBitGem;
  nextBitCardLevel: InfoBitStar;
  nextSpeed: InfoBitGem;
  totalSpeedPoint: 0;
}

export interface InfoBitStar {
  bitGemLimit?: 0;
  bitStarLimit?: 0;
  level?: 0;
}
export interface InfoBitGem {
  bitGemSpeed?: 0;
  bitStarSpeed?: 0;
  level?: 0;
}
export interface Visitor {
  id?: number;
  name?: string;
  email?: string;
  bitStarAmount?: string;
  bitStarLimit?: string;
  nickName?: string;
  userName?: string;
  avatarUrl?: string;
}
export interface DataBit {
  id: number;
  content: string;
  key: string;
  keyVisitor: string;
  icon: any;
  value: any;
}

export interface LuckyItem {
  bitStarReward: number;
  bitGemReward: number;
  description: string;
  id: number;
  name: string;
}

export interface TabObject {
  tabIndex: number;
}
