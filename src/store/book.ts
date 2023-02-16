import { blob2file, file2blob } from '@/utils'
import localforage from 'localforage'
import { defineStore } from 'pinia'
import { reactive } from 'vue';

/**
 * 书籍在Pinia中存的state是File类型，
 * 但在本地indexedDB持久化中保存的是Blob类型，因为localforage不支持File类型
 */
export interface Book {
  bookName: string;
  file: File;
}
export interface BookInLocal {
  bookName: string;
  blob: Blob;
}
interface StateType {
  books: Book[]
}
export const useBookStore = defineStore('bookStore', {
  state: (): StateType => ({
    books: reactive([]),
  }),
  actions: {
    async addBook(bookName: string, book: File) {
      console.log('addBook', this.books);
      this.books.push({bookName, file: book})
      
      // 书籍本地持久化 TODO
      // const bookInBlob = await file2blob(book)
      // await localforage.setItem('web-reader-books', 
      //   this.books.map(book => ({
      //     bookName: book.bookName,
      //     blob: bookInBlob
      //   })
      // ))
    },
    // async getLocalBooks(){
    //   const booksInLocal = await localforage.getItem('web-reader-books') as BookInLocal[]
    //   this.books = booksInLocal?.map(book => ({
    //     bookName: book.bookName,
    //     file: blob2file(book.blob, book.bookName)
    //   }))
    // }
  }
})