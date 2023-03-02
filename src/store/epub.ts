import { defineStore } from "pinia";
import { Book as EpubBook, Rendition, Location } from 'epubjs'

interface ReaderConfig {
  fontSize: number;
  fontFamily: string;
  fontWeight: boolean;
  lineHeight: number;
  backgroundColor: string;
}
interface EpubStateType {
  currentBook: EpubBook,
  rendition: Rendition
  location: Location,
  readerConfig: ReaderConfig,
}

export const useEpubStore = defineStore('epubStore', {
  state: (): EpubStateType => ({
    currentBook: undefined as unknown as EpubBook,
    rendition: undefined as unknown as Rendition,
    location: undefined as unknown as Location,
    readerConfig: {
      fontSize: 16,
      fontFamily: 'SimSun',
      fontWeight: false,
      lineHeight: 1.5,
      backgroundColor: '#fcfcfc',
    }
  }),
  persist: {
    key: 'epubStoreKey',
    paths: ['readerConfig']
  },
  actions: {
    setEpubBook(book: EpubBook): void {
      this.currentBook = book;
    },
    setRendition(rendition: Rendition): void {
      this.rendition = rendition;
    },
    setLocation(location: Location): void {
      this.location = location;
    }
  }
})