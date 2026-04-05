export interface Track {
  id: string;
  title: string;
  artist: string;
  /** MP3ファイルのパス (public/music/ 配下) */
  src: string;
  /** 任意: カバー画像パス */
  cover?: string;
  /** 任意: 再生時間の表示用テキスト (例: "3:24") */
  duration?: string;
}

/**
 * 楽曲リスト
 * MP3ファイルを public/music/ に配置し、ここに追加してください。
 *
 * 例:
 * {
 *   id: "track-1",
 *   title: "Midnight Drive",
 *   artist: "Driven",
 *   src: "/music/midnight-drive.mp3",
 *   duration: "3:24",
 * }
 */
export const tracks: Track[] = [
  {
    id: "before-the-last-streetlight",
    title: "Before the Last Streetlight",
    artist: "Driven",
    src: "/music/Before_the_Last_Streetlight.mp3",
  },
];
