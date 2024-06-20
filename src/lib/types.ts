export enum ButtonImage {
  B1 = '/assets/b01.png',
  B3 = '/assets/b03.png',
  B4 = '/assets/b04.png',
  B5 = '/assets/b05.png',
  B6 = '/assets/b06.png',
  B7 = '/assets/b07.png',
  B8 = '/assets/b08.png',
  B9 = '/assets/b09.png',
  B10 = '/assets/b10.png',
  B13 = '/assets/b13.png',
  NONE = '',
}

export enum Outcome {
  IN_PROGRESS = 0,
  LOST = -1,
  WON = 1,
}

export interface IAppState {
  level: number
  gridRows: number
  gridColumns: number
  buttons: Array<ButtonImage>
  slots: Array<string>
  matrix: Array<string[]>
  moves: Array<string>
  outcome: Outcome
}

export interface IGameCtx {
  state: IAppState
  dispatch: (action: IAppAction) => void
}

export interface IAppAction {
  type: AppActionTypes
  payload?: any
}

export enum AppActionTypes {
  SHUFFLE = 'SHUFFLE',
  MOVE = 'MOVE',
  WIN = 'WIN',
  LOSE = 'LOSE',
}
