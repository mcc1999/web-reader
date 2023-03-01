import { defineStore } from "pinia";
import { Book as EpubBook, Rendition, Location } from 'epubjs'

interface EpubStateType {
  currentBook: EpubBook,
  rendition: Rendition
  location: Location,
}

export const useEpubStore = defineStore('epubStore', {
  state: (): EpubStateType => ({
    currentBook: undefined as unknown as EpubBook,
    rendition: undefined as unknown as Rendition,
    location: undefined as unknown as Location,
  }),
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