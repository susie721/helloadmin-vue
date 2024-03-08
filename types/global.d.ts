import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

declare type Indexable<T = any> = {
  [key: string]: T;
};

export interface Response {
  message: string
  timestamp: Date
  code: number
}

interface Meta {
  // 名称
  title?: string;
  // 菜单图标
  icon?: string;
  //隐藏
  hidden?: number;
  // 是否缓存
  keepAlive?: boolean;
}

declare global {
  type Recordable<T = any> = Record<string, T>;
  type AppRouteModule = {
    meta?: Meta;
    path: string;
    redirect?: string;
    name?: string
    children?: AppRouteModule[];
    component?: Component;
  } & Omit<RouteRecordRaw, 'meta' | 'children'>

  interface MenuDataItem extends Meta {
    id: number;
    pid?: number;
    createTime?: string;
    type?: string;
    sort?: string;
    name?: string;
    path?: string;
    key?: string;
    redirect?: string;
    component: string;
    hidden?: number;
    meta?: Meta;
    children?: MenuDataItem[];
  }
}
