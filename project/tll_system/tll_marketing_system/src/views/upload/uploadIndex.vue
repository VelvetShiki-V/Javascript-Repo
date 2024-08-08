<template>
    <input type="file" @change="submitUpload">
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {}
  },
  methods: {
    async submitUpload (e) {
      // 上传
      const files = e.target.files
      const formData = new FormData()
      formData.append('file', files[0])

      formData.forEach((value, key) => {
        console.log(key, value)
      })
      await axios({
        url: 'http://127.0.0.1:8081/banner',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        data: formData
      }).then(result => {
        console.log(result.data)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
