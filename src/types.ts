export type UserMetadataType = {
  id: string
  anonymous: boolean
  avatar: string
  name: string
  email: string | null
  imageUrl: string | null
  currentWorkspaceId: string | null
  workspaceIdToPosition: { [workspaceId: string]: XYType }
  lastPing: number
  createdAt: string
}

export type WorkspaceType = {
  id: string
  name: string
  width: number
  height: number
  tiles: string
  adminIds: string[]
  userIds: string[]
  anonymousUserIds: string[]
  userId: string
  createdAt: string
}

export type TileType = {
  id: string
  imageUrl: string
  minX: number
  maxX: number
  minY: number
  maxY: number
  name: string
  userId: string
  createdAt: string
}

export type TileInstanceType = {
  id: string
  tileId: string
  x: number
  y: number
  userId: string
  createdAt: string
}

export type BuilderTileType = {
  id: string
  tile: TileType
  fixed: boolean
  x: number
  y: number
}

export type ZoneType = {
  id: string
  x: number
  y: number
  width: number
  height: number
  userId: string
  createdAt: string
}

export type InvitationType = {
  id: string
  accepted: boolean
  email: string
  inviterId: string
  inviterName: string
  workspaceId: string
  workspaceName: string
  createdAt: string
}

export type XYType = {
  x: number
  y: number
}

export type PanZoomType = {
  scale: number,
  translation: XYType,
}

export type WorkspaceLoadersType = {
  avatar: boolean
}
