import { BOOKS_INFO_LOCALFORAGE_KEY } from '@/consts';
import { file2blob } from '@/utils'
import { ElMessage } from 'element-plus';
import localforage from 'localforage'
import { defineStore } from 'pinia'
import { reactive } from 'vue';

/**
 * IndexedDB本地持久化--localforage
 * - 书籍在Pinia中存的state是File类型，
 *   但在本地indexedDB持久化中保存的是Blob类型，因为localforage不支持File类型
 * - 存储数据结构
 *   1. key: 'web-reader-booksInfo', value: bookInfo[], bookInfo包含bookName，...其他待扩展
 *   2. key: bookName, value: book的Blob文件，在reader路由下根据bookName从indexedDB获取文件
 *      注：暂不考虑bookName重名的情况，上传的时候校验bookName
 */


export interface Book {
  bookName: string;
  // ...待拓展
}
interface BookStateType {
  books: Book[]
}
export const useBookStore = defineStore('bookStore', {
  state: (): BookStateType => ({
    books: [],
  }),
  actions: {
    async addBook(bookName: string, book: File) {
      if(this.books){
        if(this.books.some(b => b.bookName === bookName)) {
          ElMessage.error('已存在同名书籍！')
          return
        }
        this.books.push({bookName})
      }else{
        this.books = [{bookName}]
      }
      
      // 书籍Info本地持久化
      await localforage.setItem(BOOKS_INFO_LOCALFORAGE_KEY, JSON.stringify(this.books))
      // 书籍文件本地持久化
      const bookInBlob = await file2blob(book)
      await localforage.setItem(bookName, bookInBlob)
    },
    async deleteBook(bookName: string){
      const bookIndex = this.books.findIndex(book => book.bookName === bookName)
      if(bookIndex > -1){
        this.books = this.books.filter(book => book.bookName !== bookName)
        await localforage.removeItem(bookName)
      }
    },
    async getLocalBooks(){
      const stringifiedBookInfo = await localforage.getItem(BOOKS_INFO_LOCALFORAGE_KEY) as string
      this.books = JSON.parse(stringifiedBookInfo)
    }
  }
})