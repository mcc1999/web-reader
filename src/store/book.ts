import { BOOKS_INFO_LOCALFORAGE_KEY } from '@/consts';
import { file2blob } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus';
import localforage from 'localforage'
import { defineStore } from 'pinia'

/**
 * IndexedDB本地持久化--localforage
 * - 图书在Pinia中存的state是File类型，
 *   但在本地indexedDB持久化中保存的是Blob类型，因为localforage不支持File类型
 * - 存储数据结构
 *   1. key: 'web-reader-booksInfo', value: bookInfo[], bookInfo包含bookName，...其他待扩展
 *   2. key: bookName, value: book的Blob文件，在reader路由下根据bookName从indexedDB获取文件
 *      注：暂不考虑bookName重名的情况，上传的时候校验bookName, confirm是否覆盖文件TODO
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
      const setBookToLocal = async () => {
        // 图书Info本地持久化
        await localforage.setItem(BOOKS_INFO_LOCALFORAGE_KEY, JSON.stringify(this.books))
        // 图书文件本地持久化
        const bookInBlob = await file2blob(book)
        await localforage.setItem(bookName, bookInBlob)
      }
      // 1. 书架上已有图书
      if(this.books && this.books.length){
        const bookIndex = this.books.findIndex(b => b.bookName === bookName)
        // 1-1. 图书已存在
        if(bookIndex > -1) {
          await ElMessageBox.confirm(
            '已存在同名图书, 是否覆盖？',
            '确认'
          ).then(async () => {
            await setBookToLocal()
          }).catch(() => {})
          return
        }
        // 1-2. 图书不存在
        else{
          this.books.push({bookName})
          await setBookToLocal()
        }
      // 2. 书架上未有图书
      }else{
        this.books = [{bookName}]
        await setBookToLocal()
      }
    },
    async deleteBook(bookName: string){
      const bookIndex = this.books.findIndex(book => book.bookName === bookName)
      if(bookIndex > -1){
        const res = await ElMessageBox.confirm(
          '确定删除这本图书吗？',
          '确认'
        )
        if(res === 'confirm'){
          try {              
            this.books = this.books.filter(book => book.bookName !== bookName)
            await localforage.setItem(BOOKS_INFO_LOCALFORAGE_KEY, JSON.stringify(this.books))
            await localforage.removeItem(bookName)
            ElMessage.success('删除图书成功！')
          } catch (err) {
            ElMessage.error('删除图书失败！')
            console.log('[error-删除图书失败]：', err);           
          }
        }
      }
    },
    async getLocalBooks(){
      const stringifiedBookInfo = await localforage.getItem(BOOKS_INFO_LOCALFORAGE_KEY) as string
      this.books = JSON.parse(stringifiedBookInfo)
    }
  }
})