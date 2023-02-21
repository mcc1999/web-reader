import { BOOKS_INFO_LOCALFORAGE_KEY } from '@/consts';
import { File2ArrayBuffer } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus';
import localforage from 'localforage'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid';
import { Book as EpubBook, Rendition } from 'epubjs'

/**
 * IndexedDB本地持久化--localforage
 * - 图书在Pinia中存的state是File类型，
 *   但在本地indexedDB持久化中保存的是ArrayBuffer类型，因为localforage不支持File类型
 * - 存储数据结构
 *   1. key: 'web-reader-booksInfo', value: bookInfo[], bookInfo包含bookName，...其他待扩展
 *   2. key: bookName, value: book的ArrayBuffer文件，在reader路由下根据bookName从indexedDB获取文件
 *      注：暂不考虑bookName重名的情况，上传的时候校验bookName, confirm是否覆盖文件TODO
 */


export interface Book {
  uuid: string;
  bookName: string;
  // ...待拓展
}
interface BookStateType {
  uniqueBookNameFlag: boolean,
  books: Book[],
  currentBook: EpubBook,
  rendition: Rendition
}
interface EpubBookElements {
  book: EpubBook,
  rendition: Rendition
}
export const useBookStore = defineStore('bookStore', {
  state: (): BookStateType => ({
    uniqueBookNameFlag: false,
    books: [],
    currentBook: undefined as unknown as EpubBook,
    rendition: undefined as unknown as Rendition
    
  }),
  persist: {
    key: 'bookStoreKey',
    paths: ['uniqueBookNameFlag']
  },
  actions: {
    async addBook(bookName: string, book: File) {
      const setBookToLocal = async (uid: string) => {
        try {          
          // 图书Info本地持久化
          await localforage.setItem(BOOKS_INFO_LOCALFORAGE_KEY, JSON.stringify(this.books))
          // 图书文件本地持久化
          const bookInArrayBuffer = await File2ArrayBuffer(book)
          await localforage.setItem(uid, bookInArrayBuffer)
          ElMessage.success('添加图书成功！')
        } catch (err) {
          ElMessage.error('添加图书失败！')
          console.log('[error-添加图书失败]：', err)
        }
      }
      // 一、未开启uniqueBookName，允许存在同名图书
      if(this.uniqueBookNameFlag){
        // 1. 书架上已有图书
        if(this.books && this.books.length){
          const uuid = uuidV4()
          this.books.push({uuid, bookName})
          await setBookToLocal(uuid)
        // 2. 书架上未有图书
        }else{
          const uuid = uuidV4()
          this.books = [{uuid, bookName}]
          await setBookToLocal(uuid)
        }
        return
      }
      // 二、开启uniqueBookName，不允许存在同名图书
      // 1. 书架上已有图书
      if(this.books && this.books.length){
        const bookIndex = this.books.findIndex(b => b.bookName === bookName)
        // 1-1. 图书已存在
        if(bookIndex > -1) {
          await ElMessageBox.confirm(
            '已存在同名图书, 是否覆盖？',
            '确认'
          ).then(async () => {
            await setBookToLocal(this.books[bookIndex].uuid)
          }).catch(() => {})
          return
        }
        // 1-2. 图书不存在
        else{
          const uuid = uuidV4()
          this.books.push({uuid, bookName})
          await setBookToLocal(uuid)
        }
      // 2. 书架上未有图书
      }else{
        const uuid = uuidV4()
        this.books = [{uuid, bookName}]
        await setBookToLocal(uuid)
      }
    },
    async deleteBook(uuid: string){
      const bookIndex = this.books.findIndex(book => book.uuid === uuid)
      if(bookIndex > -1){
        const res = await ElMessageBox.confirm(
          '确定删除这本图书吗？',
          '确认'
        )
        if(res === 'confirm'){
          try {              
            this.books = this.books.filter(book => book.uuid !== uuid)
            await localforage.setItem(BOOKS_INFO_LOCALFORAGE_KEY, JSON.stringify(this.books))
            await localforage.removeItem(uuid)
            ElMessage.success('删除图书成功！')
          } catch (err) {
            ElMessage.error('删除图书失败！')
            console.log('[error-删除图书失败]：', err);           
          }
        }
      }
    },
    async getLocalBookList(){
      const stringifiedBookInfo = await localforage.getItem(BOOKS_INFO_LOCALFORAGE_KEY) as string
      this.books = JSON.parse(stringifiedBookInfo)
    },
    async getLocalBookArrayBuffer(uuid: string): Promise<ArrayBuffer>{
      // Test Loading Book From IndexedDB
      // return new Promise((resolve) => {
      //   setTimeout(async () =>{
      //     const res =  await localforage.getItem(uuid) as ArrayBuffer
      //     resolve(res)
      //   }, 2000)
      // })
      return await localforage.getItem(uuid) as ArrayBuffer
    },
    setEpubBookElements(elements: EpubBookElements): void {
      const {book, rendition} = elements
      this.currentBook = book;
      this.rendition = rendition;
    }
  }
})