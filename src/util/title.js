export default {
  mounted() {
    let { title } = this.$options
    if (title) {
      title = typeof title === 'function' ? title.call(this) : title
      document.title = `${title} - B-text 大学生のためのフリマアプリ`
    }
  }
}